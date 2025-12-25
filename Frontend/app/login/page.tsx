"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/lib/api"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(username, password)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось войти")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-200">
            Имя пользователя
          </label>
          <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Пароль
          </label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Входим..." : "Войти"}
        </Button>
      </form>
    </div>
  )
}
