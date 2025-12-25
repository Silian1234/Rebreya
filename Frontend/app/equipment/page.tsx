"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

interface Equipment {
  id: number
  name: string
  description: string
  details: string
  weight: string
  price: string
  size: string
  hitPoints: string
  urbanizationLevel: number
  predominantMaterial: string
  tags: string[]
}

function AddEquipmentForm({ onAdd }: { onAdd: (equipment: Omit<Equipment, "id">) => void }) {
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, "id">>({
    name: "",
    description: "",
    details: "",
    weight: "",
    price: "",
    size: "",
    hitPoints: "",
    urbanizationLevel: 1,
    predominantMaterial: "",
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newEquipment)
    setNewEquipment({
      name: "",
      description: "",
      details: "",
      weight: "",
      price: "",
      size: "",
      hitPoints: "",
      urbanizationLevel: 1,
      predominantMaterial: "",
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название"
        value={newEquipment.name}
        onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={newEquipment.description}
        onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={newEquipment.details}
        onValueChange={(details) => setNewEquipment({ ...newEquipment, details })}
        placeholder="Детальное описание (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Вес" value={newEquipment.weight} onChange={(e) => setNewEquipment({ ...newEquipment, weight: e.target.value })} />
        <Input placeholder="Цена" value={newEquipment.price} onChange={(e) => setNewEquipment({ ...newEquipment, price: e.target.value })} />
        <Input placeholder="Размер" value={newEquipment.size} onChange={(e) => setNewEquipment({ ...newEquipment, size: e.target.value })} />
        <Input placeholder="Очки прочности" value={newEquipment.hitPoints} onChange={(e) => setNewEquipment({ ...newEquipment, hitPoints: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label htmlFor="urbanizationLevel" className="text-sm font-medium">
          Уровень урбанизации (1-6)
        </label>
        <Input
          id="urbanizationLevel"
          type="number"
          placeholder="1-6"
          value={newEquipment.urbanizationLevel}
          onChange={(e) => setNewEquipment({ ...newEquipment, urbanizationLevel: Number.parseInt(e.target.value) })}
          min={1}
          max={6}
        />
      </div>
      <Input
        placeholder="Теги (через запятую)"
        value={newEquipment.tags.join(", ")}
        onChange={(e) => setNewEquipment({ ...newEquipment, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <Input
        placeholder="Преобладающий материал"
        value={newEquipment.predominantMaterial}
        onChange={(e) => setNewEquipment({ ...newEquipment, predominantMaterial: e.target.value })}
      />
      <Button type="submit" className="w-full">
        Добавить снаряжение
      </Button>
    </form>
  )
}

function EditEquipmentForm({ item, onEdit }: { item: Equipment; onEdit: (equipment: Equipment) => void }) {
  const [editedEquipment, setEditedEquipment] = useState<Equipment>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedEquipment)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Название"
        value={editedEquipment.name}
        onChange={(e) => setEditedEquipment({ ...editedEquipment, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        placeholder="Краткое описание"
        value={editedEquipment.description}
        onChange={(e) => setEditedEquipment({ ...editedEquipment, description: e.target.value })}
        required
        className="w-full"
      />
      <MarkdownEditor
        value={editedEquipment.details}
        onValueChange={(details) => setEditedEquipment({ ...editedEquipment, details })}
        placeholder="Детальное описание (Markdown)"
        textareaClassName="w-full min-h-[160px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Вес" value={editedEquipment.weight} onChange={(e) => setEditedEquipment({ ...editedEquipment, weight: e.target.value })} />
        <Input placeholder="Цена" value={editedEquipment.price} onChange={(e) => setEditedEquipment({ ...editedEquipment, price: e.target.value })} />
        <Input placeholder="Размер" value={editedEquipment.size} onChange={(e) => setEditedEquipment({ ...editedEquipment, size: e.target.value })} />
        <Input
          placeholder="Очки прочности"
          value={editedEquipment.hitPoints}
          onChange={(e) => setEditedEquipment({ ...editedEquipment, hitPoints: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="urbanizationLevel" className="text-sm font-medium">
          Уровень урбанизации (1-6)
        </label>
        <Input
          id="urbanizationLevel"
          type="number"
          placeholder="1-6"
          value={editedEquipment.urbanizationLevel}
          onChange={(e) => setEditedEquipment({ ...editedEquipment, urbanizationLevel: Number.parseInt(e.target.value) })}
          min={1}
          max={6}
        />
      </div>
      <Input
        placeholder="Теги (через запятую)"
        value={editedEquipment.tags.join(", ")}
        onChange={(e) => setEditedEquipment({ ...editedEquipment, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
        className="w-full"
      />
      <Input
        placeholder="Преобладающий материал"
        value={editedEquipment.predominantMaterial}
        onChange={(e) => setEditedEquipment({ ...editedEquipment, predominantMaterial: e.target.value })}
      />
      <Button type="submit" className="w-full">
        Сохранить изменения
      </Button>
    </form>
  )
}

export default function Equipment() {
  const { items: equipment, addItem, updateItem, deleteItem } = useCrud<Equipment>("equipment")
  const canManage = useCanManage()

  const handleAddEquipment = async (newEquipment: Omit<Equipment, "id">) => {
    if (canManage) {
      await addItem({ ...newEquipment, tags: newEquipment.tags || [] })
    }
  }

  const handleEditEquipment = async (editedEquipment: Equipment) => {
    if (canManage) {
      await updateItem(editedEquipment)
    }
  }

  const handleDeleteEquipment = async (id: number) => {
    if (canManage) {
      await deleteItem(id)
    }
  }

  return (
    <ItemList
      items={equipment}
      title="Снаряжение"
      onAdd={handleAddEquipment}
      onEdit={handleEditEquipment}
      onDelete={handleDeleteEquipment}
      AddItemForm={AddEquipmentForm}
      EditItemForm={EditEquipmentForm}
      canManage={canManage}
    />
  )
}
