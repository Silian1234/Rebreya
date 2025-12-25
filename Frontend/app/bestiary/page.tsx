"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { useCrud } from "@/hooks/use-crud"

interface Beast {
  id: number
  name: string
  description: string
  details: string
  tags: string[]
  type?: string
  size?: string
  alignment?: string
  armorClass?: string
  hitPoints?: string
  speed?: string
  challengeRating?: string
  source?: string
}

function AddBeastForm({ onAdd }: { onAdd: (beast: Omit<Beast, "id">) => void }) {
  const [newBeast, setNewBeast] = useState<Omit<Beast, "id">>({
    name: "",
    description: "",
    details: "",
    tags: [],
    type: "",
    size: "",
    alignment: "",
    armorClass: "",
    hitPoints: "",
    speed: "",
    challengeRating: "",
    source: "",
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newBeast)
    setNewBeast({
      name: "",
      description: "",
      details: "",
      tags: [],
      type: "",
      size: "",
      alignment: "",
      armorClass: "",
      hitPoints: "",
      speed: "",
      challengeRating: "",
      source: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название" value={newBeast.name} onChange={(e) => setNewBeast({ ...newBeast, name: e.target.value })} required />
      <Input
        placeholder="Краткое описание"
        value={newBeast.description}
        onChange={(e) => setNewBeast({ ...newBeast, description: e.target.value })}
        required
      />
      <MarkdownEditor
        value={newBeast.details}
        onValueChange={(details) => setNewBeast({ ...newBeast, details })}
        placeholder="Подробности, способности, поведение (Markdown)"
        textareaClassName="w-full min-h-[200px]"
        required
      />
      <Input
        placeholder="Теги (через запятую)"
        value={newBeast.tags.join(", ")}
        onChange={(e) => setNewBeast({ ...newBeast, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Тип" value={newBeast.type} onChange={(e) => setNewBeast({ ...newBeast, type: e.target.value })} />
        <Input placeholder="Размер" value={newBeast.size} onChange={(e) => setNewBeast({ ...newBeast, size: e.target.value })} />
        <Input placeholder="Мировоззрение" value={newBeast.alignment} onChange={(e) => setNewBeast({ ...newBeast, alignment: e.target.value })} />
        <Input placeholder="Класс брони" value={newBeast.armorClass} onChange={(e) => setNewBeast({ ...newBeast, armorClass: e.target.value })} />
        <Input placeholder="Хиты" value={newBeast.hitPoints} onChange={(e) => setNewBeast({ ...newBeast, hitPoints: e.target.value })} />
        <Input placeholder="Скорость" value={newBeast.speed} onChange={(e) => setNewBeast({ ...newBeast, speed: e.target.value })} />
        <Input
          placeholder="Уровень опасности"
          value={newBeast.challengeRating}
          onChange={(e) => setNewBeast({ ...newBeast, challengeRating: e.target.value })}
        />
        <Input placeholder="Источник" value={newBeast.source} onChange={(e) => setNewBeast({ ...newBeast, source: e.target.value })} />
      </div>
      <Button type="submit" className="w-full">
        Добавить существо
      </Button>
    </form>
  )
}

function EditBeastForm({ item, onEdit }: { item: Beast; onEdit: (beast: Beast) => void }) {
  const [editedBeast, setEditedBeast] = useState<Beast>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedBeast)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название" value={editedBeast.name} onChange={(e) => setEditedBeast({ ...editedBeast, name: e.target.value })} required />
      <Input
        placeholder="Краткое описание"
        value={editedBeast.description}
        onChange={(e) => setEditedBeast({ ...editedBeast, description: e.target.value })}
        required
      />
      <MarkdownEditor
        value={editedBeast.details}
        onValueChange={(details) => setEditedBeast({ ...editedBeast, details })}
        placeholder="Подробности, способности, поведение (Markdown)"
        textareaClassName="w-full min-h-[200px]"
        required
      />
      <Input
        placeholder="Теги (через запятую)"
        value={editedBeast.tags.join(", ")}
        onChange={(e) => setEditedBeast({ ...editedBeast, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Тип" value={editedBeast.type} onChange={(e) => setEditedBeast({ ...editedBeast, type: e.target.value })} />
        <Input placeholder="Размер" value={editedBeast.size} onChange={(e) => setEditedBeast({ ...editedBeast, size: e.target.value })} />
        <Input
          placeholder="Мировоззрение"
          value={editedBeast.alignment}
          onChange={(e) => setEditedBeast({ ...editedBeast, alignment: e.target.value })}
        />
        <Input
          placeholder="Класс брони"
          value={editedBeast.armorClass}
          onChange={(e) => setEditedBeast({ ...editedBeast, armorClass: e.target.value })}
        />
        <Input placeholder="Хиты" value={editedBeast.hitPoints} onChange={(e) => setEditedBeast({ ...editedBeast, hitPoints: e.target.value })} />
        <Input placeholder="Скорость" value={editedBeast.speed} onChange={(e) => setEditedBeast({ ...editedBeast, speed: e.target.value })} />
        <Input
          placeholder="Уровень опасности"
          value={editedBeast.challengeRating}
          onChange={(e) => setEditedBeast({ ...editedBeast, challengeRating: e.target.value })}
        />
        <Input placeholder="Источник" value={editedBeast.source} onChange={(e) => setEditedBeast({ ...editedBeast, source: e.target.value })} />
      </div>
      <Button type="submit" className="w-full">
        Обновить существо
      </Button>
    </form>
  )
}

export default function Bestiary() {
  const { items: beasts, addItem, updateItem, deleteItem } = useCrud<Beast>("bestiary")

  const handleAddBeast = async (newBeast: Omit<Beast, "id">) => {
    await addItem({ ...newBeast, tags: newBeast.tags || [] })
  }

  const handleEditBeast = async (beast: Beast) => {
    await updateItem(beast)
  }

  const handleDeleteBeast = async (id: number) => {
    await deleteItem(id)
  }

  return (
    <ItemList
      items={beasts}
      title="Бестиарий"
      onAdd={handleAddBeast}
      onEdit={handleEditBeast}
      onDelete={handleDeleteBeast}
      AddItemForm={AddBeastForm}
      EditItemForm={EditBeastForm}
    />
  )
}
