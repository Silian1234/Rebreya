"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { clearTokens } from "@/lib/api"

const NAV_LINKS = [
  { href: "/news", label: "Новости" },
  { href: "/races", label: "Расы" },
  { href: "/classes", label: "Классы" },
  { href: "/countries", label: "Страны" },
  { href: "/gods", label: "Боги" },
  { href: "/traits", label: "Черты" },
  { href: "/items", label: "Предметы" },
  { href: "/equipment", label: "Снаряжение" },
  { href: "/articles", label: "Статьи" },
]

const Header = () => {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const checkAuth = () => setIsAuthed(typeof window !== "undefined" && !!window.localStorage.getItem("access_token"))
    checkAuth()
    window.addEventListener("storage", checkAuth)
    window.addEventListener("tokens-changed", checkAuth)
    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("tokens-changed", checkAuth)
    }
  }, [])

  return (
    <header className="bg-gray-800 text-gray-100 p-4 shadow-lg shadow-amber-500/10">
      <div className="mx-auto w-full px-2 md:px-6 grid grid-cols-1 gap-4 md:grid-cols-[auto,1fr,auto] md:items-center">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold whitespace-nowrap">
            Rebreya: Shadow of Progress
          </Link>
          <div className="flex space-x-2 md:hidden">
            {!isAuthed ? (
              <>
                <Button
                  onClick={() => router.push("/login")}
                  variant="nav"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Войти
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  variant="nav"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Регистрация
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  clearTokens()
                  setIsAuthed(false)
                  router.push("/")
                }}
                variant="nav"
                size="sm"
                className="whitespace-nowrap"
              >
                Выйти
              </Button>
            )}
          </div>
        </div>
        <nav className="w-full md:justify-self-stretch">
          <ul
            className="grid gap-2"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <Button variant="nav" size="sm" className="w-full justify-center">
                    {link.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex space-x-2 justify-end">
          {!isAuthed ? (
            <>
              <Button
                onClick={() => router.push("/login")}
                variant="nav"
                size="sm"
                className="whitespace-nowrap"
              >
                Войти
              </Button>
              <Button
                onClick={() => router.push("/register")}
                variant="nav"
                size="sm"
                className="whitespace-nowrap"
              >
                Регистрация
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                clearTokens()
                setIsAuthed(false)
                router.push("/")
              }}
              variant="nav"
              size="sm"
              className="whitespace-nowrap"
            >
              Выйти
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
