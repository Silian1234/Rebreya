"use client"

import { FormEvent, useState } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

type TraitType = "ancestry" | "class" | "background" | "regional" | "feat" | "other"

interface Trait {
  id: number
  name: string
  description: string
  details: string
  prerequisites?: string
  benefits?: string
  source?: string
  traitType: TraitType
  alternativeAbilityScore?: string
  tags: string[]
}

function AddTraitForm({ onAdd }: { onAdd: (trait: Omit<Trait, "id">) => void }) {
  const [newTrait, setNewTrait] = useState<Omit<Trait, "id">>({
    name: "",
    description: "",
    details: "",
    prerequisites: "",
    benefits: "",
    source: "",
    traitType: "background",
    alternativeAbilityScore: "",
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newTrait)
    setNewTrait({
      name: "",
      description: "",
      details: "",
      prerequisites: "",
      benefits: "",
      source: "",
      traitType: "background",
      alternativeAbilityScore: "",
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название черты"
        value={newTrait.name}
        onChange={(e) => setNewTrait({ ...newTrait, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={newTrait.description}
        onChange={(e) => setNewTrait({ ...newTrait, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={newTrait.details}
        onValueChange={(details) => setNewTrait({ ...newTrait, details })}
        placeholder="Полное описание/правила (Markdown)"
        textareaClassName="w-full min-h-[140px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Требования"
          value={newTrait.prerequisites}
          onChange={(e) => setNewTrait({ ...newTrait, prerequisites: e.target.value })}
        />
        <Input
          placeholder="Преимущества"
          value={newTrait.benefits}
          onChange={(e) => setNewTrait({ ...newTrait, benefits: e.target.value })}
        />
        <Input placeholder="Источник" value={newTrait.source} onChange={(e) => setNewTrait({ ...newTrait, source: e.target.value })} />
      </div>
      <Input
        placeholder="Теги (через запятую)"
        value={newTrait.tags?.join(", ") || ""}
        onChange={(e) => setNewTrait({ ...newTrait, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">
          Тип черты
        </label>
        <Select value={newTrait.traitType} onValueChange={(value) => setNewTrait({ ...newTrait, traitType: value as Trait["traitType"] })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Тип черты" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ancestry">Родословная</SelectItem>
            <SelectItem value="class">Класс</SelectItem>
            <SelectItem value="background">Предыстория</SelectItem>
            <SelectItem value="regional">Региональная</SelectItem>
            <SelectItem value="feat">Фит</SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {newTrait.traitType === "background" && (
        <Input
          placeholder="Альтернативный бонус к характеристике (если есть)"
          value={newTrait.alternativeAbilityScore}
          onChange={(e) => setNewTrait({ ...newTrait, alternativeAbilityScore: e.target.value })}
        />
      )}
      <Button type="submit" className="w-full">
        Добавить черту
      </Button>
    </form>
  )
}

function EditTraitForm({ item, onEdit }: { item: Trait; onEdit: (trait: Trait) => void }) {
  const [editedTrait, setEditedTrait] = useState<Trait>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedTrait)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название черты"
        value={editedTrait.name}
        onChange={(e) => setEditedTrait({ ...editedTrait, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={editedTrait.description}
        onChange={(e) => setEditedTrait({ ...editedTrait, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={editedTrait.details}
        onValueChange={(details) => setEditedTrait({ ...editedTrait, details })}
        placeholder="Полное описание/правила (Markdown)"
        textareaClassName="w-full min-h-[140px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Требования"
          value={editedTrait.prerequisites}
          onChange={(e) => setEditedTrait({ ...editedTrait, prerequisites: e.target.value })}
        />
        <Input
          placeholder="Преимущества"
          value={editedTrait.benefits}
          onChange={(e) => setEditedTrait({ ...editedTrait, benefits: e.target.value })}
        />
        <Input placeholder="Источник" value={editedTrait.source} onChange={(e) => setEditedTrait({ ...editedTrait, source: e.target.value })} />
      </div>
      <Input
        placeholder="Теги (через запятую)"
        value={editedTrait.tags?.join(", ") || ""}
        onChange={(e) => setEditedTrait({ ...editedTrait, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">
          Тип черты
        </label>
        <Select value={editedTrait.traitType} onValueChange={(value) => setEditedTrait({ ...editedTrait, traitType: value as Trait["traitType"] })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Тип черты" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ancestry">Родословная</SelectItem>
            <SelectItem value="class">Класс</SelectItem>
            <SelectItem value="background">Предыстория</SelectItem>
            <SelectItem value="regional">Региональная</SelectItem>
            <SelectItem value="feat">Фит</SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {editedTrait.traitType === "background" && (
        <Input
          placeholder="Альтернативный бонус к характеристике (если есть)"
          value={editedTrait.alternativeAbilityScore}
          onChange={(e) => setEditedTrait({ ...editedTrait, alternativeAbilityScore: e.target.value })}
        />
      )}
      <Button type="submit" className="w-full">
        Сохранить черту
      </Button>
    </form>
  )
}

export default function Traits() {
  const { items: traits, addItem, updateItem, deleteItem } = useCrud<Trait>("traits")
  const canManage = useCanManage()

  const handleAddTrait = async (newTrait: Omit<Trait, "id">) => {
    if (!canManage) return
    await addItem({ ...newTrait, tags: newTrait.tags || [] })
  }

  const handleEditTrait = async (trait: Trait) => {
    if (!canManage) return
    await updateItem(trait)
  }

  const handleDeleteTrait = async (id: number) => {
    if (!canManage) return
    await deleteItem(id)
  }

  return (
    <ItemList
      items={traits}
      title="Черты"
      onAdd={handleAddTrait}
      onEdit={handleEditTrait}
      onDelete={handleDeleteTrait}
      AddItemForm={AddTraitForm}
      EditItemForm={EditTraitForm}
      canManage={canManage}
    />
  )
}
