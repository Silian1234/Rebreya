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
  age?: string
  weight?: string
  languages?: string
  racialTrait?: string
  primaryAbility?: string
  secondaryPrimaryAbility?: string
  minorAbilities?: string
  negativeAbility?: string
  secondaryNegativeAbility?: string
  raceGroup?: string
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
    age: "",
    weight: "",
    languages: "",
    racialTrait: "",
    primaryAbility: "",
    secondaryPrimaryAbility: "",
    minorAbilities: "",
    negativeAbility: "",
    secondaryNegativeAbility: "",
    raceGroup: "",
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
      age: "",
      weight: "",
      languages: "",
      racialTrait: "",
      primaryAbility: "",
      secondaryPrimaryAbility: "",
      minorAbilities: "",
      negativeAbility: "",
      secondaryNegativeAbility: "",
      raceGroup: "",
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
          placeholder="Возраст"
          value={newRace.age}
          onChange={(e) => setNewRace({ ...newRace, age: e.target.value })}
        />
        <Input
          placeholder="Вес"
          value={newRace.weight}
          onChange={(e) => setNewRace({ ...newRace, weight: e.target.value })}
        />
        <Input
          placeholder="Языки"
          value={newRace.languages}
          onChange={(e) => setNewRace({ ...newRace, languages: e.target.value })}
        />
        <Input
          placeholder="Расовая черта"
          value={newRace.racialTrait}
          onChange={(e) => setNewRace({ ...newRace, racialTrait: e.target.value })}
        />
        <Input
          placeholder="Основное умение"
          value={newRace.primaryAbility}
          onChange={(e) => setNewRace({ ...newRace, primaryAbility: e.target.value })}
        />
        <Input
          placeholder="Второе основное умение (опционально)"
          value={newRace.secondaryPrimaryAbility}
          onChange={(e) => setNewRace({ ...newRace, secondaryPrimaryAbility: e.target.value })}
        />
        <Input
          placeholder="Малые умения"
          value={newRace.minorAbilities}
          onChange={(e) => setNewRace({ ...newRace, minorAbilities: e.target.value })}
        />
        <Input
          placeholder="Отрицательное умение"
          value={newRace.negativeAbility}
          onChange={(e) => setNewRace({ ...newRace, negativeAbility: e.target.value })}
        />
        <Input
          placeholder="Второе отрицательное умение (опционально)"
          value={newRace.secondaryNegativeAbility}
          onChange={(e) => setNewRace({ ...newRace, secondaryNegativeAbility: e.target.value })}
        />
        <Input
          placeholder="Группа расы"
          value={newRace.raceGroup}
          onChange={(e) => setNewRace({ ...newRace, raceGroup: e.target.value })}
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
          placeholder="Возраст"
          value={editedRace.age}
          onChange={(e) => setEditedRace({ ...editedRace, age: e.target.value })}
        />
        <Input
          placeholder="Вес"
          value={editedRace.weight}
          onChange={(e) => setEditedRace({ ...editedRace, weight: e.target.value })}
        />
        <Input
          placeholder="Языки"
          value={editedRace.languages}
          onChange={(e) => setEditedRace({ ...editedRace, languages: e.target.value })}
        />
        <Input
          placeholder="Расовая черта"
          value={editedRace.racialTrait}
          onChange={(e) => setEditedRace({ ...editedRace, racialTrait: e.target.value })}
        />
        <Input
          placeholder="Основное умение"
          value={editedRace.primaryAbility}
          onChange={(e) => setEditedRace({ ...editedRace, primaryAbility: e.target.value })}
        />
        <Input
          placeholder="Второе основное умение (опционально)"
          value={editedRace.secondaryPrimaryAbility}
          onChange={(e) => setEditedRace({ ...editedRace, secondaryPrimaryAbility: e.target.value })}
        />
        <Input
          placeholder="Малые умения"
          value={editedRace.minorAbilities}
          onChange={(e) => setEditedRace({ ...editedRace, minorAbilities: e.target.value })}
        />
        <Input
          placeholder="Отрицательное умение"
          value={editedRace.negativeAbility}
          onChange={(e) => setEditedRace({ ...editedRace, negativeAbility: e.target.value })}
        />
        <Input
          placeholder="Второе отрицательное умение (опционально)"
          value={editedRace.secondaryNegativeAbility}
          onChange={(e) => setEditedRace({ ...editedRace, secondaryNegativeAbility: e.target.value })}
        />
        <Input
          placeholder="Группа расы"
          value={editedRace.raceGroup}
          onChange={(e) => setEditedRace({ ...editedRace, raceGroup: e.target.value })}
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
