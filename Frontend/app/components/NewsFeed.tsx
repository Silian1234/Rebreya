"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Newspaper, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { apiRequest } from "@/lib/api"

interface Article {
  id: number
  name: string
  description: string
  details: string
  tags: string[]
  created_at?: string
  updated_at?: string
  section?: number
}

const normalizeArticles = (payload: unknown): Article[] => {
  if (Array.isArray(payload)) return payload as Article[]
  if (payload && typeof payload === "object" && Array.isArray((payload as { results?: Article[] }).results)) {
    return ((payload as { results: Article[] }).results).map((article) => ({ ...article, tags: article.tags || [] }))
  }
  return []
}

const toSnippet = (text: string, limit = 180) => {
  const clean = (text || "").replace(/\s+/g, " ").trim()
  return clean.length > limit ? `${clean.slice(0, limit)}…` : clean
}

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const payload = await apiRequest<unknown>("/articles/")
        setArticles(normalizeArticles(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось загрузить дайджест новостей")
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase()
    const byDate = [...articles].sort(
      (a, b) =>
        new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime(),
    )

    if (!query) return byDate

    return byDate.filter((article) => {
      const haystack = [
        article.name,
        article.description,
        article.details,
        ...(article.tags || []),
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [articles, search])

  const featured = filteredArticles[0]
  const digest = filteredArticles.slice(1, 5)
  const feed = filteredArticles.slice(1)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <section className="container mx-auto px-4 py-10 space-y-8">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-indigo-500/10 p-8 shadow-xl shadow-amber-500/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-amber-300">
                <Sparkles className="h-5 w-5" />
                <span className="uppercase text-xs tracking-[0.2em]">Дайджест мира Rebreya</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">Свежие новости и находки экспедиции</h1>
              <p className="text-gray-200 text-lg">
                Короткий срез того, что происходит в мире Rebreya: обновления по статьям, заметки из экспедиции,
                подсказки для мастеров и игроков.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                <span className="flex items-center gap-2 rounded-full bg-gray-900/60 px-3 py-1">
                  <Newspaper className="h-4 w-4 text-amber-300" /> Лента статей
                </span>
                <span className="flex items-center gap-2 rounded-full bg-gray-900/60 px-3 py-1">
                  <ArrowRight className="h-4 w-4 text-amber-300" /> Обновления по датам
                </span>
              </div>
            </div>
            <div className="w-full md:w-80">
              <label className="text-sm text-gray-300 block mb-2">Поиск по новостям и тегам</label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Например: механика, бог, экспедиция..."
                className="bg-gray-900/70 border-gray-700 text-gray-100"
              />
              <p className="mt-2 text-xs text-gray-400">Мы показываем самое свежее сверху.</p>
            </div>
          </div>
        </div>

        {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-2xl bg-gray-800/60 p-6 h-48 border border-gray-700/60" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card className="border-amber-500/20 bg-gray-900 text-gray-100">
            <CardHeader>
              <CardTitle>Новостей не найдено</CardTitle>
              <CardDescription className="text-gray-300">
                Попробуйте изменить запрос или сбросить фильтр поиска.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
              {featured && (
                <Card className="relative overflow-hidden border-amber-500/30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
                  <CardHeader className="relative space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 text-sm">
                      <Sparkles className="h-4 w-4" />
                      <span>Главное за сегодня</span>
                    </div>
                    <CardTitle className="text-2xl">{featured.name}</CardTitle>
                    <CardDescription className="text-gray-200 text-base">{featured.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-3">
                    <p className="text-gray-200">{toSnippet(featured.details, 260)}</p>
                    <div className="flex flex-wrap gap-2">
                      {(featured.tags || []).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-amber-500/20 text-amber-100 border-amber-400/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="relative flex items-center justify-end text-sm text-gray-300">
                    <Button asChild variant="secondary" className="bg-amber-500 text-gray-900 hover:bg-amber-400">
                      <Link href="/articles">Читать подробнее</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Быстрый дайджест</p>
                  <Badge className="bg-gray-800 text-gray-100 border-gray-700">+{digest.length}</Badge>
                </div>
                <div className="space-y-3">
                  {digest.map((item) => (
                    <Card key={item.id} className="bg-gray-900/80 border-gray-800 text-gray-100">
                      <CardHeader className="space-y-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="text-gray-300 text-sm">
                          {toSnippet(item.description, 120)}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-end text-xs text-gray-400">
                        <Link href="/articles" className="flex items-center gap-1 text-amber-200 hover:text-amber-100">
                          Подробнее <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Лента новостей</p>
                  <h2 className="text-2xl font-semibold">Все последние материалы</h2>
                </div>
                <Button variant="outline" asChild className="border-amber-500/40 text-amber-200 hover:bg-amber-500/10">
                  <Link href="/articles">Открыть раздел статей</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {feed.map((article) => (
                  <Card key={article.id} className="bg-gray-900 border-gray-800 text-gray-100">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-xl">{article.name}</CardTitle>
                      <CardDescription className="text-gray-300">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-200">{toSnippet(article.details, 140)}</p>
                      <div className="flex flex-wrap gap-2">
                        {(article.tags || []).slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" className="border-amber-400/40 text-amber-100">
                            {tag}
                          </Badge>
                        ))}
                        {(article.tags || []).length > 4 && (
                          <Badge variant="secondary" className="bg-gray-800 text-gray-200">
                            +{(article.tags || []).length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-end text-xs text-gray-400">
                      <Link href="/articles" className="flex items-center gap-1 text-amber-200 hover:text-amber-100">
                        Читать <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default NewsFeed
