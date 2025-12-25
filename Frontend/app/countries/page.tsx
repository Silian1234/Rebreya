"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

interface Country {
  id: number
  name: string
  description: string
  details: string
  capital?: string
  government?: string
  population?: string
  majorCities?: string
  climate?: string
  source?: string
  tags: string[]
}

function AddCountryForm({ onAdd }: { onAdd: (country: Omit<Country, "id">) => void }) {
  const [newCountry, setNewCountry] = useState<Omit<Country, "id">>({
    name: "",
    description: "",
    details: "",
    capital: "",
    government: "",
    population: "",
    majorCities: "",
    climate: "",
    source: "",
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newCountry)
    setNewCountry({
      name: "",
      description: "",
      details: "",
      capital: "",
      government: "",
      population: "",
      majorCities: "",
      climate: "",
      source: "",
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название страны"
        value={newCountry.name}
        onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={newCountry.description}
        onChange={(e) => setNewCountry({ ...newCountry, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={newCountry.details}
        onValueChange={(details) => setNewCountry({ ...newCountry, details })}
        placeholder="Детальное описание (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Столица" value={newCountry.capital} onChange={(e) => setNewCountry({ ...newCountry, capital: e.target.value })} />
        <Input
          placeholder="Форма правления"
          value={newCountry.government}
          onChange={(e) => setNewCountry({ ...newCountry, government: e.target.value })}
        />
        <Input placeholder="Население" value={newCountry.population} onChange={(e) => setNewCountry({ ...newCountry, population: e.target.value })} />
        <Input
          placeholder="Крупные города"
          value={newCountry.majorCities}
          onChange={(e) => setNewCountry({ ...newCountry, majorCities: e.target.value })}
        />
        <Input placeholder="Климат" value={newCountry.climate} onChange={(e) => setNewCountry({ ...newCountry, climate: e.target.value })} />
        <Input placeholder="Источник" value={newCountry.source} onChange={(e) => setNewCountry({ ...newCountry, source: e.target.value })} />
        <Input
          placeholder="Теги (через запятую)"
          value={newCountry.tags.join(", ")}
          onChange={(e) => setNewCountry({ ...newCountry, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Добавить страну
      </Button>
    </form>
  )
}

function EditCountryForm({ item, onEdit }: { item: Country; onEdit: (country: Country) => void }) {
  const [editedCountry, setEditedCountry] = useState<Country>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedCountry)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название страны"
        value={editedCountry.name}
        onChange={(e) => setEditedCountry({ ...editedCountry, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={editedCountry.description}
        onChange={(e) => setEditedCountry({ ...editedCountry, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={editedCountry.details}
        onValueChange={(details) => setEditedCountry({ ...editedCountry, details })}
        placeholder="Детальное описание (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Столица" value={editedCountry.capital} onChange={(e) => setEditedCountry({ ...editedCountry, capital: e.target.value })} />
        <Input
          placeholder="Форма правления"
          value={editedCountry.government}
          onChange={(e) => setEditedCountry({ ...editedCountry, government: e.target.value })}
        />
        <Input placeholder="Население" value={editedCountry.population} onChange={(e) => setEditedCountry({ ...editedCountry, population: e.target.value })} />
        <Input
          placeholder="Крупные города"
          value={editedCountry.majorCities}
          onChange={(e) => setEditedCountry({ ...editedCountry, majorCities: e.target.value })}
        />
        <Input placeholder="Климат" value={editedCountry.climate} onChange={(e) => setEditedCountry({ ...editedCountry, climate: e.target.value })} />
        <Input placeholder="Источник" value={editedCountry.source} onChange={(e) => setEditedCountry({ ...editedCountry, source: e.target.value })} />
        <Input
          placeholder="Теги (через запятую)"
          value={editedCountry.tags.join(", ")}
          onChange={(e) => setEditedCountry({ ...editedCountry, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Сохранить изменения
      </Button>
    </form>
  )
}

export default function Countries() {
  const { items: countries, addItem, updateItem, deleteItem } = useCrud<Country>("countries")
  const canManage = useCanManage()

  const handleAddCountry = async (newCountry: Omit<Country, "id">) => {
    if (canManage) {
      await addItem({ ...newCountry, tags: newCountry.tags || [] })
    }
  }

  const handleEditCountry = async (editedCountry: Country) => {
    if (canManage) {
      await updateItem(editedCountry)
    }
  }

  const handleDeleteCountry = async (id: number) => {
    if (canManage) {
      await deleteItem(id)
    }
  }

  return (
    <ItemList
      items={countries}
      title="Страны"
      onAdd={handleAddCountry}
      onEdit={handleEditCountry}
      onDelete={handleDeleteCountry}
      AddItemForm={AddCountryForm}
      EditItemForm={EditCountryForm}
      canManage={canManage}
    />
  )
}
