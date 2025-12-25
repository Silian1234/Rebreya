"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function AddTab() {
  const [newTab, setNewTab] = useState({ name: "", description: "", endpoint: "" })
  const router = useRouter()

  const handleAddTab = () => {
    console.log("Новая вкладка:", newTab)
    router.push("/")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Добавить новую вкладку</h1>
      <Input
        type="text"
        placeholder="Название вкладки"
        value={newTab.name}
        onChange={(e) => setNewTab({ ...newTab, name: e.target.value })}
        className="mb-2"
      />
      <Textarea
        placeholder="Описание вкладки"
        value={newTab.description}
        onChange={(e) => setNewTab({ ...newTab, description: e.target.value })}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Endpoint API"
        value={newTab.endpoint}
        onChange={(e) => setNewTab({ ...newTab, endpoint: e.target.value })}
        className="mb-2"
      />
      <Button onClick={handleAddTab}>Добавить вкладку</Button>
    </div>
  )
}
