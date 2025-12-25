"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

type ItemType =
  | "Магический предмет (основной слот)"
  | "Магический предмет (второстепенный слот)"
  | "Артефакт"
  | "Свиток"
  | "Клика/палаш"
  | "Оружие/доспех"
  | "Инструменты"
  | "Реликвия/кипира"
  | "Прочее"

interface Item {
  id: number
  name: string
  description: string
  details: string
  tier: "Major" | "Minor"
  rarity?: string
  classRequirement?: string
  itemType: ItemType
  source?: string
  price?: string
  weight?: string
  attunement: boolean
  consumable: boolean
  requirements: string
  urbanizationLevel: number
  tags: string[]
}

function AddItemForm({ onAdd }: { onAdd: (item: Omit<Item, "id">) => void }) {
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({
    name: "",
    description: "",
    details: "",
    tier: "Minor",
    rarity: "",
    classRequirement: "",
    itemType: "Оружие/доспех",
    source: "",
    price: "",
    weight: "",
    attunement: false,
    consumable: false,
    requirements: "",
    urbanizationLevel: 1,
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newItem)
    setNewItem({
      name: "",
      description: "",
      details: "",
      tier: "Minor",
      rarity: "",
      classRequirement: "",
      itemType: "Оружие/доспех",
      source: "",
      price: "",
      weight: "",
      attunement: false,
      consumable: false,
      requirements: "",
      urbanizationLevel: 1,
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название предмета" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
      <Input
        placeholder="Краткое описание"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        required
      />
      <MarkdownEditor
        value={newItem.details}
        onValueChange={(details) => setNewItem({ ...newItem, details })}
        placeholder="Полное описание, свойства, ограничения (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <Input
        placeholder="Теги (через запятую)"
        value={newItem.tags.join(", ")}
        onChange={(e) => setNewItem({ ...newItem, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Ранг (Tier)
        </label>
        <Select value={newItem.tier} onValueChange={(value) => setNewItem({ ...newItem, tier: value as "Major" | "Minor" })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Major">Major</SelectItem>
            <SelectItem value="Minor">Minor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Редкость" value={newItem.rarity} onChange={(e) => setNewItem({ ...newItem, rarity: e.target.value })} />
      <Input
        placeholder="Требование к классу"
        value={newItem.classRequirement}
        onChange={(e) => setNewItem({ ...newItem, classRequirement: e.target.value })}
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Тип предмета
        </label>
        <Select value={newItem.itemType} onValueChange={(value) => setNewItem({ ...newItem, itemType: value as Item["itemType"] })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Магический предмет (основной слот)">Магический предмет (основной слот)</SelectItem>
            <SelectItem value="Магический предмет (второстепенный слот)">Магический предмет (второстепенный слот)</SelectItem>
            <SelectItem value="Артефакт">Артефакт</SelectItem>
            <SelectItem value="Свиток">Свиток</SelectItem>
            <SelectItem value="Клика/палаш">Клика/палаш</SelectItem>
            <SelectItem value="Оружие/доспех">Оружие/доспех</SelectItem>
            <SelectItem value="Инструменты">Инструменты</SelectItem>
            <SelectItem value="Реликвия/кипира">Реликвия/кипира</SelectItem>
            <SelectItem value="Прочее">Прочее</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Источник" value={newItem.source} onChange={(e) => setNewItem({ ...newItem, source: e.target.value })} />
      <Input placeholder="Цена" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
      <Input placeholder="Вес" value={newItem.weight} onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })} />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Требует настройку?
        </label>
        <Select value={newItem.attunement ? "true" : "false"} onValueChange={(value) => setNewItem({ ...newItem, attunement: value === "true" })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Да</SelectItem>
            <SelectItem value="false">Нет</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Расходуемый?
        </label>
        <Select value={newItem.consumable ? "true" : "false"} onValueChange={(value) => setNewItem({ ...newItem, consumable: value === "true" })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Да</SelectItem>
            <SelectItem value="false">Нет</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Прочие требования" value={newItem.requirements} onChange={(e) => setNewItem({ ...newItem, requirements: e.target.value })} />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Уровень урбанизации (1-6)
        </label>
        <Input
          type="number"
          placeholder="1-6"
          value={newItem.urbanizationLevel}
          onChange={(e) => setNewItem({ ...newItem, urbanizationLevel: Number.parseInt(e.target.value) })}
          min={1}
          max={6}
        />
      </div>
      <Button type="submit" className="w-full">
        Добавить предмет
      </Button>
    </form>
  )
}

function EditItemForm({ item, onEdit }: { item: Item; onEdit: (item: Item) => void }) {
  const [editedItem, setEditedItem] = useState<Item>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedItem)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название предмета" value={editedItem.name} onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} required />
      <Input
        placeholder="Краткое описание"
        value={editedItem.description}
        onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
        required
      />
      <MarkdownEditor
        value={editedItem.details}
        onValueChange={(details) => setEditedItem({ ...editedItem, details })}
        placeholder="Полное описание, свойства, ограничения (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <Input
        placeholder="Теги (через запятую)"
        value={editedItem.tags.join(", ")}
        onChange={(e) => setEditedItem({ ...editedItem, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Ранг (Tier)
        </label>
        <Select
          value={editedItem.tier}
          onValueChange={(value) => setEditedItem({ ...editedItem, tier: value as "Major" | "Minor" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Major">Major</SelectItem>
            <SelectItem value="Minor">Minor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Редкость" value={editedItem.rarity} onChange={(e) => setEditedItem({ ...editedItem, rarity: e.target.value })} />
      <Input
        placeholder="Требование к классу"
        value={editedItem.classRequirement}
        onChange={(e) => setEditedItem({ ...editedItem, classRequirement: e.target.value })}
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Тип предмета
        </label>
        <Select
          value={editedItem.itemType}
          onValueChange={(value) => setEditedItem({ ...editedItem, itemType: value as Item["itemType"] })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Магический предмет (основной слот)">Магический предмет (основной слот)</SelectItem>
            <SelectItem value="Магический предмет (второстепенный слот)">Магический предмет (второстепенный слот)</SelectItem>
            <SelectItem value="Артефакт">Артефакт</SelectItem>
            <SelectItem value="Свиток">Свиток</SelectItem>
            <SelectItem value="Клика/палаш">Клика/палаш</SelectItem>
            <SelectItem value="Оружие/доспех">Оружие/доспех</SelectItem>
            <SelectItem value="Инструменты">Инструменты</SelectItem>
            <SelectItem value="Реликвия/кипира">Реликвия/кипира</SelectItem>
            <SelectItem value="Прочее">Прочее</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Источник" value={editedItem.source} onChange={(e) => setEditedItem({ ...editedItem, source: e.target.value })} />
      <Input placeholder="Цена" value={editedItem.price} onChange={(e) => setEditedItem({ ...editedItem, price: e.target.value })} />
      <Input placeholder="Вес" value={editedItem.weight} onChange={(e) => setEditedItem({ ...editedItem, weight: e.target.value })} />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Требует настройку?
        </label>
        <Select
          value={editedItem.attunement ? "true" : "false"}
          onValueChange={(value) => setEditedItem({ ...editedItem, attunement: value === "true" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Да</SelectItem>
            <SelectItem value="false">Нет</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Расходуемый?
        </label>
        <Select
          value={editedItem.consumable ? "true" : "false"}
          onValueChange={(value) => setEditedItem({ ...editedItem, consumable: value === "true" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Да</SelectItem>
            <SelectItem value="false">Нет</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Прочие требования" value={editedItem.requirements} onChange={(e) => setEditedItem({ ...editedItem, requirements: e.target.value })} />
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Уровень урбанизации (1-6)
        </label>
        <Input
          type="number"
          placeholder="1-6"
          value={editedItem.urbanizationLevel}
          onChange={(e) => setEditedItem({ ...editedItem, urbanizationLevel: Number.parseInt(e.target.value) })}
          min={1}
          max={6}
        />
      </div>
      <Button type="submit" className="w-full">
        Сохранить предмет
      </Button>
    </form>
  )
}

export default function Items() {
  const { items, addItem, updateItem, deleteItem } = useCrud<Item>("items")
  const canManage = useCanManage()

  const handleAddItem = async (newItem: Omit<Item, "id">) => {
    if (!canManage) return
    await addItem({ ...newItem, tags: newItem.tags || [] })
  }

  const handleEditItem = async (editedItem: Item) => {
    if (!canManage) return
    await updateItem(editedItem)
  }

  const handleDeleteItem = async (id: number) => {
    if (!canManage) return
    await deleteItem(id)
  }

  return (
    <ItemList
      items={items}
      title="Предметы"
      onAdd={handleAddItem}
      onEdit={handleEditItem}
      onDelete={handleDeleteItem}
      AddItemForm={AddItemForm}
      EditItemForm={EditItemForm}
      canManage={canManage}
    />
  )
}
