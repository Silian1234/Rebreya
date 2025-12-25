"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { register } from "@/lib/api"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await register(username, email, password)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать аккаунт")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-200">
            Имя пользователя
          </label>
          <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Пароль
          </label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Создаём..." : "Зарегистрироваться"}
        </Button>
      </form>
    </div>
  )
}
