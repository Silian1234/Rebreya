"use client"

import { FormEvent, useState } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

interface God {
  id: number
  name: string
  description: string
  details: string
  alignment?: string
  domains?: string
  symbol?: string
  worshippers?: string
  source?: string
  churches?: string
  tags: string[]
}

function AddGodForm({ onAdd }: { onAdd: (god: Omit<God, "id">) => void }) {
  const [newGod, setNewGod] = useState<Omit<God, "id">>({
    name: "",
    description: "",
    details: "",
    alignment: "",
    domains: "",
    symbol: "",
    worshippers: "",
    source: "",
    churches: "",
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newGod)
    setNewGod({
      name: "",
      description: "",
      details: "",
      alignment: "",
      domains: "",
      symbol: "",
      worshippers: "",
      source: "",
      churches: "",
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Имя божества" value={newGod.name} onChange={(e) => setNewGod({ ...newGod, name: e.target.value })} required className="w-full" />
      <Input
        placeholder="Краткое описание"
        value={newGod.description}
        onChange={(e) => setNewGod({ ...newGod, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={newGod.details}
        onValueChange={(details) => setNewGod({ ...newGod, details })}
        placeholder="Основные мифы, сферы влияния, образ и цели (Markdown)"
        textareaClassName="w-full min-h-[180px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Мировоззрение" value={newGod.alignment} onChange={(e) => setNewGod({ ...newGod, alignment: e.target.value })} />
        <Input placeholder="Домены" value={newGod.domains} onChange={(e) => setNewGod({ ...newGod, domains: e.target.value })} />
        <Input placeholder="Символ" value={newGod.symbol} onChange={(e) => setNewGod({ ...newGod, symbol: e.target.value })} />
        <Input
          placeholder="Почитатели"
          value={newGod.worshippers}
          onChange={(e) => setNewGod({ ...newGod, worshippers: e.target.value })}
        />
        <Input placeholder="Источник" value={newGod.source} onChange={(e) => setNewGod({ ...newGod, source: e.target.value })} />
        <Input placeholder="Храмы / церкви" value={newGod.churches} onChange={(e) => setNewGod({ ...newGod, churches: e.target.value })} />
        <Input
          placeholder="Теги (через запятую)"
          value={newGod.tags.join(", ")}
          onChange={(e) => setNewGod({ ...newGod, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Добавить божество
      </Button>
    </form>
  )
}

function EditGodForm({ item, onEdit }: { item: God; onEdit: (god: God) => void }) {
  const [editedGod, setEditedGod] = useState<God>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedGod)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Имя божества" value={editedGod.name} onChange={(e) => setEditedGod({ ...editedGod, name: e.target.value })} required className="w-full" />
      <Input
        placeholder="Краткое описание"
        value={editedGod.description}
        onChange={(e) => setEditedGod({ ...editedGod, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={editedGod.details}
        onValueChange={(details) => setEditedGod({ ...editedGod, details })}
        placeholder="Основные мифы, сферы влияния, образ и цели (Markdown)"
        textareaClassName="w-full min-h-[180px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Мировоззрение" value={editedGod.alignment} onChange={(e) => setEditedGod({ ...editedGod, alignment: e.target.value })} />
        <Input placeholder="Домены" value={editedGod.domains} onChange={(e) => setEditedGod({ ...editedGod, domains: e.target.value })} />
        <Input placeholder="Символ" value={editedGod.symbol} onChange={(e) => setEditedGod({ ...editedGod, symbol: e.target.value })} />
        <Input
          placeholder="Почитатели"
          value={editedGod.worshippers}
          onChange={(e) => setEditedGod({ ...editedGod, worshippers: e.target.value })}
        />
        <Input placeholder="Источник" value={editedGod.source} onChange={(e) => setEditedGod({ ...editedGod, source: e.target.value })} />
        <Input placeholder="Храмы / церкви" value={editedGod.churches} onChange={(e) => setEditedGod({ ...editedGod, churches: e.target.value })} />
        <Input
          placeholder="Теги (через запятую)"
          value={editedGod.tags.join(", ")}
          onChange={(e) => setEditedGod({ ...editedGod, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Сохранить божество
      </Button>
    </form>
  )
}

export default function Gods() {
  const { items: gods, addItem, updateItem, deleteItem } = useCrud<God>("gods")
  const canManage = useCanManage()

  const handleAddGod = async (newGod: Omit<God, "id">) => {
    if (!canManage) return
    await addItem({ ...newGod, tags: newGod.tags || [] })
  }

  const handleEditGod = async (editedGod: God) => {
    if (!canManage) return
    await updateItem(editedGod)
  }

  const handleDeleteGod = async (id: number) => {
    if (!canManage) return
    await deleteItem(id)
  }

  return (
    <ItemList
      items={gods}
      title="Боги"
      onAdd={handleAddGod}
      onEdit={handleEditGod}
      onDelete={handleDeleteGod}
      AddItemForm={AddGodForm}
      EditItemForm={EditGodForm}
      canManage={canManage}
    />
  )
}
