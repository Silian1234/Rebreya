"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Markdown } from "@/components/ui/markdown"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { apiRequest } from "@/lib/api"
import { useCanManage } from "@/lib/roles"

interface Article {
  id: number
  name: string
  description: string
  details: string
  tags: string[]
}

interface Subsection {
  id: number
  name: string
  articles: Article[]
}

function AddSubsectionForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(name)
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название подборки"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Добавить подборку
      </Button>
    </form>
  )
}

function AddArticleForm({ onAdd }: { onAdd: (article: Omit<Article, "id">) => void }) {
  const [newArticle, setNewArticle] = useState<Omit<Article, "id">>({
    name: "",
    description: "",
    details: "",
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newArticle)
    setNewArticle({
      name: "",
      description: "",
      details: "",
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Заголовок статьи"
        value={newArticle.name}
        onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={newArticle.description}
        onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={newArticle.details}
        onValueChange={(details) => setNewArticle({ ...newArticle, details })}
        placeholder="Основной текст статьи (Markdown)"
        textareaClassName="w-full min-h-[260px]"
        required
      />
      <Input
        placeholder="Теги (через запятую)"
        value={newArticle.tags.join(", ")}
        onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Добавить статью
      </Button>
    </form>
  )
}

export default function Articles() {
  const [subsections, setSubsections] = useState<Subsection[]>([])
  const [error, setError] = useState<string | null>(null)
  const canManage = useCanManage()

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await apiRequest<unknown>("/subsections/")
        const normalized = Array.isArray(data)
          ? (data as Subsection[])
          : Array.isArray((data as { results?: Subsection[] }).results)
            ? ((data as { results: Subsection[] }).results)
            : []
        setSubsections(normalized.map((s) => ({ ...s, articles: s.articles || [] })))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось загрузить статьи")
      }
    }

    void fetchSections()
  }, [])

  const handleAddSubsection = async (name: string) => {
    if (!canManage) return
    try {
      const created = await apiRequest<Subsection>("/subsections/", {
        method: "POST",
        body: JSON.stringify({ name }),
      })
      setSubsections([...subsections, { ...created, articles: created.articles || [] }])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать подборку")
    }
  }

  const handleAddArticle = async (subsectionId: number, newArticle: Omit<Article, "id">) => {
    if (!canManage) return
    try {
      const created = await apiRequest<Article>(`/subsections/${subsectionId}/articles/`, {
        method: "POST",
        body: JSON.stringify({ ...newArticle }),
      })
      setSubsections(
        subsections.map((subsection) =>
          subsection.id === subsectionId ? { ...subsection, articles: [...subsection.articles, created] } : subsection,
        ),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось добавить статью")
    }
  }

  const safeSubsections = useMemo(
    () => (Array.isArray(subsections) ? subsections : []).map((s) => ({ ...s, articles: s.articles || [] })),
    [subsections],
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Статьи</h1>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeSubsections.map((subsection) => (
          <Card key={subsection.id} className="bg-gray-900 text-gray-100">
            <CardHeader>
              <CardTitle>{subsection.name}</CardTitle>
              <CardDescription>{subsection.articles.length} записей</CardDescription>
            </CardHeader>
            <CardContent>
              {canManage && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Добавить статью</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-gray-100">
                    <DialogHeader>
                      <DialogTitle>Новая статья в {subsection.name}</DialogTitle>
                    </DialogHeader>
                    <AddArticleForm onAdd={(article) => void handleAddArticle(subsection.id, article)} />
                  </DialogContent>
                </Dialog>
              )}
              <ul className="mt-4 space-y-2">
                {subsection.articles.map((article) => (
                  <li key={article.id}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="text-left">
                          {article.name}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 text-gray-100">
                        <DialogHeader>
                          <DialogTitle>{article.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p>{article.description}</p>
                          <Markdown content={article.details} />
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, index) => (
                              <span key={index} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        {canManage && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Добавить подборку</Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-gray-100">
              <DialogHeader>
                <DialogTitle>Новая подборка статей</DialogTitle>
              </DialogHeader>
              <AddSubsectionForm onAdd={(name) => void handleAddSubsection(name)} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
