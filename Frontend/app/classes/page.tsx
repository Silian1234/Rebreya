"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import ItemList from "../components/ItemList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarkdownEditor } from "@/components/ui/markdown-editor"
import { useCrud } from "@/hooks/use-crud"
import { useCanManage } from "@/lib/roles"

interface Subclass {
  id: number
  name: string
  description: string
  features: { [key: string]: string }
}

interface Class {
  id: number
  name: string
  description: string
  details: string
  hitDice?: string
  primaryAbility?: string
  savingThrows?: string
  armorProficiencies?: string
  weaponProficiencies?: string
  toolProficiencies?: string
  skillProficiencies?: string
  startingEquipment?: string
  spellcastingAbility?: string
  classFeatures?: { [key: string]: string }
  source?: string
  subclasses?: Subclass[]
  tags: string[]
}

function AddClassForm({ onAdd }: { onAdd: (classItem: Omit<Class, "id">) => void }) {
  const [newClass, setNewClass] = useState<Omit<Class, "id">>({
    name: "",
    description: "",
    details: "",
    hitDice: "",
    primaryAbility: "",
    savingThrows: "",
    armorProficiencies: "",
    weaponProficiencies: "",
    toolProficiencies: "",
    skillProficiencies: "",
    startingEquipment: "",
    spellcastingAbility: "",
    classFeatures: {},
    source: "",
    subclasses: [],
    tags: [],
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(newClass)
    setNewClass({
      name: "",
      description: "",
      details: "",
      hitDice: "",
      primaryAbility: "",
      savingThrows: "",
      armorProficiencies: "",
      weaponProficiencies: "",
      toolProficiencies: "",
      skillProficiencies: "",
      startingEquipment: "",
      spellcastingAbility: "",
      classFeatures: {},
      source: "",
      subclasses: [],
      tags: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название класса" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} required />
      <Input
        placeholder="Краткое описание"
        value={newClass.description}
        onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
        required
      />
      <MarkdownEditor
        value={newClass.details}
        onValueChange={(details) => setNewClass({ ...newClass, details })}
        placeholder="Детальное описание, особенности, сюжетные заметки (Markdown)"
        textareaClassName="w-full min-h-[180px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Кость хитов" value={newClass.hitDice} onChange={(e) => setNewClass({ ...newClass, hitDice: e.target.value })} />
        <Input
          placeholder="Ключевая характеристика"
          value={newClass.primaryAbility}
          onChange={(e) => setNewClass({ ...newClass, primaryAbility: e.target.value })}
        />
        <Input placeholder="Спасброски" value={newClass.savingThrows} onChange={(e) => setNewClass({ ...newClass, savingThrows: e.target.value })} />
        <Input
          placeholder="Владение бронёй"
          value={newClass.armorProficiencies}
          onChange={(e) => setNewClass({ ...newClass, armorProficiencies: e.target.value })}
        />
        <Input
          placeholder="Владение оружием"
          value={newClass.weaponProficiencies}
          onChange={(e) => setNewClass({ ...newClass, weaponProficiencies: e.target.value })}
        />
        <Input
          placeholder="Владение инструментами"
          value={newClass.toolProficiencies}
          onChange={(e) => setNewClass({ ...newClass, toolProficiencies: e.target.value })}
        />
        <Input
          placeholder="Навыки"
          value={newClass.skillProficiencies}
          onChange={(e) => setNewClass({ ...newClass, skillProficiencies: e.target.value })}
        />
        <Input
          placeholder="Стартовое снаряжение"
          value={newClass.startingEquipment}
          onChange={(e) => setNewClass({ ...newClass, startingEquipment: e.target.value })}
        />
        <Input
          placeholder="Способность к заклинаниям"
          value={newClass.spellcastingAbility}
          onChange={(e) => setNewClass({ ...newClass, spellcastingAbility: e.target.value })}
        />
        <Input placeholder="Источник" value={newClass.source} onChange={(e) => setNewClass({ ...newClass, source: e.target.value })} />
        <Input
          placeholder="Теги (через запятую)"
          value={newClass.tags.join(", ")}
          onChange={(e) => setNewClass({ ...newClass, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Добавить класс
      </Button>
    </form>
  )
}

function EditClassForm({ item, onEdit }: { item: Class; onEdit: (classItem: Class) => void }) {
  const [editedClass, setEditedClass] = useState<Class>(item)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onEdit(editedClass)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название класса" value={editedClass.name} onChange={(e) => setEditedClass({ ...editedClass, name: e.target.value })} required />
      <Input
        placeholder="Краткое описание"
        value={editedClass.description}
        onChange={(e) => setEditedClass({ ...editedClass, description: e.target.value })}
        required
      />
      <MarkdownEditor
        value={editedClass.details}
        onValueChange={(details) => setEditedClass({ ...editedClass, details })}
        placeholder="Детальное описание, особенности, сюжетные заметки (Markdown)"
        textareaClassName="w-full min-h-[180px]"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Кость хитов" value={editedClass.hitDice} onChange={(e) => setEditedClass({ ...editedClass, hitDice: e.target.value })} />
        <Input
          placeholder="Ключевая характеристика"
          value={editedClass.primaryAbility}
          onChange={(e) => setEditedClass({ ...editedClass, primaryAbility: e.target.value })}
        />
        <Input placeholder="Спасброски" value={editedClass.savingThrows} onChange={(e) => setEditedClass({ ...editedClass, savingThrows: e.target.value })} />
        <Input
          placeholder="Владение бронёй"
          value={editedClass.armorProficiencies}
          onChange={(e) => setEditedClass({ ...editedClass, armorProficiencies: e.target.value })}
        />
        <Input
          placeholder="Владение оружием"
          value={editedClass.weaponProficiencies}
          onChange={(e) => setEditedClass({ ...editedClass, weaponProficiencies: e.target.value })}
        />
        <Input
          placeholder="Владение инструментами"
          value={editedClass.toolProficiencies}
          onChange={(e) => setEditedClass({ ...editedClass, toolProficiencies: e.target.value })}
        />
        <Input
          placeholder="Навыки"
          value={editedClass.skillProficiencies}
          onChange={(e) => setEditedClass({ ...editedClass, skillProficiencies: e.target.value })}
        />
        <Input
          placeholder="Стартовое снаряжение"
          value={editedClass.startingEquipment}
          onChange={(e) => setEditedClass({ ...editedClass, startingEquipment: e.target.value })}
        />
        <Input
          placeholder="Способность к заклинаниям"
          value={editedClass.spellcastingAbility}
          onChange={(e) => setEditedClass({ ...editedClass, spellcastingAbility: e.target.value })}
        />
        <Input placeholder="Источник" value={editedClass.source} onChange={(e) => setEditedClass({ ...editedClass, source: e.target.value })} />
        <Input
          placeholder="Теги (через запятую)"
          value={editedClass.tags.join(", ")}
          onChange={(e) => setEditedClass({ ...editedClass, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Сохранить класс
      </Button>
    </form>
  )
}

export default function Classes() {
  const { items: classes, addItem, updateItem, deleteItem } = useCrud<Class>("classes")
  const canManage = useCanManage()

  const handleAddClass = async (newClass: Omit<Class, "id">) => {
    if (!canManage) return
    await addItem({ ...newClass, tags: newClass.tags || [] })
  }

  const handleEditClass = async (editedClass: Class) => {
    if (!canManage) return
    await updateItem(editedClass)
  }

  const handleDeleteClass = async (id: number) => {
    if (!canManage) return
    await deleteItem(id)
  }

  return (
    <ItemList
      items={classes}
      title="Классы"
      onAdd={handleAddClass}
      onEdit={handleEditClass}
      onDelete={handleDeleteClass}
      AddItemForm={AddClassForm}
      EditItemForm={EditClassForm}
      canManage={canManage}
    />
  )
}
