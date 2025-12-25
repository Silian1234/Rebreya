"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

interface Race {
  id: number
  name: string
  description: string
  details: string
  creatureType?: string
  size?: string
  speed?: string
  startingTraits?: string
  source?: string
  abilityScoreIncrease?: string
  tags: string[]
}

function AddRaceForm({ onAdd }: { onAdd: (race: Omit<Race, "id">) => void }) {
  const [newRace, setNewRace] = useState<Omit<Race, "id">>({
    name: "",
    description: "",
    details: "",
    creatureType: "",
    size: "",
    speed: "",
    startingTraits: "",
    source: "",
    abilityScoreIncrease: "",
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newRace)
    setNewRace({
      name: "",
      description: "",
      details: "",
      creatureType: "",
      size: "",
      speed: "",
      startingTraits: "",
      source: "",
      abilityScoreIncrease: "",
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название расы" value={newRace.name} onChange={(e) => setNewRace({ ...newRace, name: e.target.value })} required className="w-full" />
      <Input
        placeholder="Краткое описание"
        value={newRace.description}
        onChange={(e) => setNewRace({ ...newRace, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={newRace.details}
        onValueChange={(details) => setNewRace({ ...newRace, details })}
        placeholder="Детальное описание (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Тип существа"
          value={newRace.creatureType}
          onChange={(e) => setNewRace({ ...newRace, creatureType: e.target.value })}
        />
        <Input placeholder="Размер" value={newRace.size} onChange={(e) => setNewRace({ ...newRace, size: e.target.value })} />
        <Input
          placeholder="Скорость"
          value={newRace.speed}
          onChange={(e) => setNewRace({ ...newRace, speed: e.target.value })}
        />
        <Input
          placeholder="Стартовые черты"
          value={newRace.startingTraits}
          onChange={(e) => setNewRace({ ...newRace, startingTraits: e.target.value })}
        />
        <Input placeholder="Источник" value={newRace.source} onChange={(e) => setNewRace({ ...newRace, source: e.target.value })} />
        <Input
          placeholder="Рост характеристик"
          value={newRace.abilityScoreIncrease}
          onChange={(e) => setNewRace({ ...newRace, abilityScoreIncrease: e.target.value })}
        />
        <Input
          placeholder="Теги (через запятую)"
          value={newRace.tags.join(", ")}
          onChange={(e) => setNewRace({ ...newRace, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Добавить расу
      </Button>
    </form>
  )
}

function EditRaceForm({ item, onEdit }: { item: Race; onEdit: (race: Race) => void }) {
  const [editedRace, setEditedRace] = useState<Race>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedRace)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название расы"
        value={editedRace.name}
        onChange={(e) => setEditedRace({ ...editedRace, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={editedRace.description}
        onChange={(e) => setEditedRace({ ...editedRace, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={editedRace.details}
        onValueChange={(details) => setEditedRace({ ...editedRace, details })}
        placeholder="Детальное описание (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Тип существа"
          value={editedRace.creatureType}
          onChange={(e) => setEditedRace({ ...editedRace, creatureType: e.target.value })}
        />
        <Input placeholder="Размер" value={editedRace.size} onChange={(e) => setEditedRace({ ...editedRace, size: e.target.value })} />
        <Input
          placeholder="Скорость"
          value={editedRace.speed}
          onChange={(e) => setEditedRace({ ...editedRace, speed: e.target.value })}
        />
        <Input
          placeholder="Стартовые черты"
          value={editedRace.startingTraits}
          onChange={(e) => setEditedRace({ ...editedRace, startingTraits: e.target.value })}
        />
        <Input placeholder="Источник" value={editedRace.source} onChange={(e) => setEditedRace({ ...editedRace, source: e.target.value })} />
        <Input
          placeholder="Рост характеристик"
          value={editedRace.abilityScoreIncrease}
          onChange={(e) => setEditedRace({ ...editedRace, abilityScoreIncrease: e.target.value })}
        />
        <Input
          placeholder="Теги (через запятую)"
          value={editedRace.tags.join(", ")}
          onChange={(e) => setEditedRace({ ...editedRace, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Сохранить изменения
      </Button>
    </form>
  )
}

export default function Races() {
  const { items: races, addItem, updateItem, deleteItem } = useCrud<Race>("races")
  const canManage = useCanManage()

  const handleAddRace = async (newRace: Omit<Race, "id">) => {
    if (canManage) {
      await addItem({ ...newRace, tags: newRace.tags || [] })
    }
  }

  const handleEditRace = async (editedRace: Race) => {
    if (canManage) {
      await updateItem(editedRace)
    }
  }

  const handleDeleteRace = async (id: number) => {
    if (canManage) {
      await deleteItem(id)
    }
  }

  return (
    <ItemList
      items={races}
      title="Расы"
      onAdd={handleAddRace}
      onEdit={handleEditRace}
      onDelete={handleDeleteRace}
      AddItemForm={AddRaceForm}
      EditItemForm={EditRaceForm}
      canManage={canManage}
    />
  )
}
