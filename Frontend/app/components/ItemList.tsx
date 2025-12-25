"use client"

import { useMemo, useState } from "react"
import type { ComponentType } from "react"
import { Pencil, Search, SlidersHorizontal, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Markdown } from "@/components/ui/markdown"
import { ScrollArea } from "@/components/ui/scroll-area"

type BaseItem = {
  id: number
  name: string
  description: string
  details: string
  tags: string[]
  classFeatures?: { [key: string]: string }
  subclasses?: Subclass[]
  [key: string]: any
}

type ItemListProps<T extends BaseItem> = {
  items: T[]
  title: string
  onAdd: (item: Omit<T, "id">) => void
  onEdit: (item: T) => void
  onDelete: (id: number) => void
  AddItemForm: ComponentType<{ onAdd: (item: Omit<T, "id">) => void }>
  EditItemForm: ComponentType<{ item: T; onEdit: (item: T) => void }>
  canManage?: boolean
}

interface Subclass {
  id: number
  name: string
  description: string
  features: { [key: string]: string }
}

function SubclassList({ subclasses }: { subclasses: Subclass[] }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Подклассы (подробнее в описании)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subclasses.map((subclass) => (
          <Card key={subclass.id} className="h-full bg-gray-900/90 text-gray-100 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-base">{subclass.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-300">{subclass.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-gray-100 border-gray-300 hover:bg-gray-700">
                    Подробнее
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md w-full bg-gray-900 text-gray-100">
                  <DialogHeader>
                    <DialogTitle>{subclass.name}</DialogTitle>
                    <DialogDescription asChild>
                      <ScrollArea className="h-[60vh] pr-4">
                        <div className="space-y-2">
                          <p>{subclass.description}</p>
                          <h4 className="text-md font-semibold mt-2">Особенности по уровням:</h4>
                          {Object.entries(subclass.features).map(([level, feature]) => (
                            <p key={level} className="text-sm">
                              <strong>Уровень {level}:</strong> {feature}
                            </p>
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ItemList<T extends BaseItem>({
  items,
  title,
  onAdd,
  onEdit,
  onDelete,
  AddItemForm,
  EditItemForm,
  canManage = false,
}: ItemListProps<T>) {
  const list = useMemo(() => (Array.isArray(items) ? items : []), [items])
  const [searchTerm, setSearchTerm] = useState("")
  const [excludeName, setExcludeName] = useState(false)
  const [excludeDescription, setExcludeDescription] = useState(false)
  const [excludeDetails, setExcludeDetails] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [tagQuery, setTagQuery] = useState("")
  const [tagModeByTag, setTagModeByTag] = useState<Record<string, "include" | "exclude">>({})

  const sortedItems = useMemo(() => {
    const getTime = (item: unknown) => {
      if (!item || typeof item !== "object") return 0
      const anyItem = item as Record<string, unknown>
      const raw = anyItem.updated_at ?? anyItem.created_at ?? anyItem.updatedAt ?? anyItem.createdAt ?? 0
      const parsed = new Date(typeof raw === "string" ? raw : 0).getTime()
      return Number.isNaN(parsed) ? 0 : parsed
    }

    return [...list].sort((a, b) => getTime(b) - getTime(a))
  }, [list])

  const includeTags = useMemo(
    () => Object.keys(tagModeByTag).filter((tag) => tagModeByTag[tag] === "include"),
    [tagModeByTag],
  )

  const excludeTags = useMemo(
    () => Object.keys(tagModeByTag).filter((tag) => tagModeByTag[tag] === "exclude"),
    [tagModeByTag],
  )

  const activeTagFiltersCount = includeTags.length + excludeTags.length

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const item of sortedItems) {
      for (const tag of item.tags || []) {
        const normalized = String(tag || "").trim()
        if (normalized) tagSet.add(normalized)
      }
    }
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ru"))
  }, [sortedItems])

  const visibleTags = useMemo(() => {
    const query = tagQuery.trim().toLowerCase()
    if (!query) return allTags
    return allTags.filter((tag) => tag.toLowerCase().includes(query))
  }, [allTags, tagQuery])

  const cycleTagMode = (tag: string) => {
    setTagModeByTag((prev) => {
      const current = prev[tag]
      const next = current === "include" ? "exclude" : current === "exclude" ? undefined : "include"
      if (!next) {
        const { [tag]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [tag]: next }
    })
  }

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const matchesText = (text: unknown) => {
      if (!query) return true
      return String(text || "").toLowerCase().includes(query)
    }

    const normalizedInclude = includeTags.map((t) => t.toLowerCase())
    const normalizedExclude = excludeTags.map((t) => t.toLowerCase())

    return sortedItems.filter((item) => {
      const tags = (item.tags || []).map((tag) => String(tag || "").trim()).filter(Boolean)
      const lowerTags = tags.map((tag) => tag.toLowerCase())

      const includeOk = normalizedInclude.length === 0 || normalizedInclude.every((tag) => lowerTags.includes(tag))
      const excludeOk = normalizedExclude.length === 0 || !normalizedExclude.some((tag) => lowerTags.includes(tag))

      const searchOk =
        !query ||
        ((!excludeName && matchesText(item.name)) ||
          (!excludeDescription && matchesText(item.description)) ||
          (!excludeDetails && matchesText(item.details)) ||
          matchesText(tags.join(" ")))

      return includeOk && excludeOk && searchOk
    })
  }, [excludeDescription, excludeDetails, excludeName, excludeTags, includeTags, searchTerm, sortedItems])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80">Каталог</p>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          <div className="w-full md:w-96">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск по названию, описанию, деталям и тегам..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900/70 text-gray-100 placeholder-gray-500 pl-10 border-gray-800"
                />
              </div>
              <Button
                type="button"
                variant="nav"
                size="sm"
                onClick={() => setFiltersOpen((prev) => !prev)}
                className="whitespace-nowrap"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Фильтры{activeTagFiltersCount ? ` (${activeTagFiltersCount})` : ""}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Свежие записи отображаются первыми.</p>
          </div>
        </div>

        {filtersOpen && (
          <Card className="bg-gray-900/60 border border-amber-500/20 text-gray-100">
            <CardHeader className="py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">Фильтры по тегам</CardTitle>
                  <CardDescription className="text-gray-300">
                    Клик по тегу: включить → исключить → убрать фильтр.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {activeTagFiltersCount > 0 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => setTagModeByTag({})}>
                      Сбросить
                    </Button>
                  )}
                  <Button type="button" variant="outline" size="icon" onClick={() => setFiltersOpen(false)} aria-label="Закрыть фильтры">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Поиск тега..."
                value={tagQuery}
                onChange={(e) => setTagQuery(e.target.value)}
                className="w-full bg-gray-900/70 text-gray-100 placeholder-gray-500 border-gray-800"
              />
              <div className="flex flex-wrap gap-2">
                {visibleTags.length === 0 ? (
                  <p className="text-sm text-gray-400">Нет тегов для фильтрации.</p>
                ) : (
                  visibleTags.map((tag) => {
                    const mode = tagModeByTag[tag]
                    const base =
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-gray-950"
                    const styles =
                      mode === "include"
                        ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-100 hover:bg-emerald-500/20"
                        : mode === "exclude"
                          ? "bg-red-500/15 border-red-400/40 text-red-100 hover:bg-red-500/20 line-through"
                          : "bg-gray-950/30 border-gray-700 text-gray-200 hover:bg-gray-900/60"

                    return (
                      <button key={tag} type="button" className={`${base} ${styles}`} onClick={() => cycleTagMode(tag)}>
                        {tag}
                      </button>
                    )
                  })
                )}
              </div>
              {(includeTags.length > 0 || excludeTags.length > 0) && (
                <div className="text-xs text-gray-400 space-y-1">
                  {includeTags.length > 0 && <p>Включены: {includeTags.join(", ")}</p>}
                  {excludeTags.length > 0 && <p>Исключены: {excludeTags.join(", ")}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <Checkbox
              checked={excludeName}
              onCheckedChange={(checked) => setExcludeName(checked as boolean)}
              className="mr-2"
            />
            <span className="text-sm text-gray-300">Не искать в названии</span>
          </label>
          <label className="flex items-center">
            <Checkbox
              checked={excludeDescription}
              onCheckedChange={(checked) => setExcludeDescription(checked as boolean)}
              className="mr-2"
            />
            <span className="text-sm text-gray-300">Не искать в описании</span>
          </label>
          <label className="flex items-center">
            <Checkbox
              checked={excludeDetails}
              onCheckedChange={(checked) => setExcludeDetails(checked as boolean)}
              className="mr-2"
            />
            <span className="text-sm text-gray-300">Не искать в деталях</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col h-full bg-gray-900/80 text-gray-100 border border-amber-500/20 shadow-lg shadow-amber-500/10"
            >
              <CardHeader>
                <CardTitle className="text-xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm text-gray-300">{item.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(item.tags || []).map((tag, index) => (
                    <span key={index} className="bg-amber-500/20 text-amber-100 px-2 py-1 rounded-full text-sm border border-amber-400/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-gray-100 border-gray-300 hover:bg-gray-700">
                      Подробнее
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl w-full bg-gray-900 text-gray-100">
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
                      <DialogDescription asChild>
                        <ScrollArea className="h-[70vh] pr-4">
                          <div className="space-y-4">
                            <p className="text-sm">{item.description}</p>
                            <Markdown content={item.details} />
                            {Object.entries(item).map(([key, value]) => {
                              if (
                                ["id", "name", "description", "details", "classFeatures", "subclasses", "tags", "created_at", "updated_at", "createdAt", "updatedAt"].includes(
                                  key,
                                )
                              )
                                return null
                              if (value) {
                                return (
                                  <p key={key} className="text-sm">
                                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                  </p>
                                )
                              }
                              return null
                            })}
                            {item.classFeatures && (
                              <div>
                                <h4 className="text-lg font-semibold">Особенности класса:</h4>
                                {Object.entries(item.classFeatures).map(([level, feature]) => (
                                  <p key={level} className="text-sm">
                                    <strong>Уровень {level}:</strong> {feature}
                                  </p>
                                ))}
                              </div>
                            )}
                            {item.subclasses && <SubclassList subclasses={item.subclasses} />}
                          </div>
                        </ScrollArea>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {canManage && (
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingItem(item)}
                          className="text-gray-100 border-gray-300 hover:bg-gray-700"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 text-gray-100">
                        <DialogHeader>
                          <DialogTitle>Редактировать {item.name}</DialogTitle>
                        </DialogHeader>
                        {editingItem && (
                          <EditItemForm
                            item={editingItem}
                            onEdit={(editedItem) => {
                              onEdit(editedItem)
                              setEditingItem(null)
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="text-gray-100 border-gray-300 hover:bg-gray-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        {canManage && (
          <div className="mt-12 p-6 border border-amber-500/30 rounded-2xl shadow-xl shadow-amber-500/10 bg-gray-900/80 text-gray-100">
            <h2 className="text-2xl font-bold mb-6">Добавить новую запись</h2>
            <AddItemForm onAdd={onAdd} />
          </div>
        )}
      </div>
    </div>
  )
}
