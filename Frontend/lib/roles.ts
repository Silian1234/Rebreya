"use client"

import { useEffect, useState } from "react"

const DEFAULT_ALLOWED = ["admin", "staff", "superuser"]

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payload = token.split(".")[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export const getStoredRoles = (): string[] => {
  if (typeof window === "undefined") return []
  const token = window.localStorage.getItem("access_token")
  if (!token) return []
  const payload = decodeJwtPayload(token)
  if (!payload) return []
  const roles = (payload.roles ?? payload.role ?? payload.groups) as unknown
  if (Array.isArray(roles)) return roles.filter((r): r is string => typeof r === "string")
  if (typeof roles === "string") return [roles]
  return []
}

export const useRoles = () => {
  const [roles, setRoles] = useState<string[]>([])
  const [flags, setFlags] = useState<{ isStaff: boolean; isSuperuser: boolean }>({ isStaff: false, isSuperuser: false })

  useEffect(() => {
    const update = () => {
      const token = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null
      const payload = token ? decodeJwtPayload(token) : null
      setRoles(getStoredRoles())
      setFlags({
        isStaff: Boolean((payload as { is_staff?: boolean } | null)?.is_staff),
        isSuperuser: Boolean((payload as { is_superuser?: boolean } | null)?.is_superuser),
      })
    }
    update()
    window.addEventListener("storage", update)
    return () => window.removeEventListener("storage", update)
  }, [])

  return { roles, flags }
}

export const useCanManage = (allowedRoles: string[] = DEFAULT_ALLOWED) => {
  const { roles, flags } = useRoles()
  return (
    roles.some((role) => allowedRoles.includes(role.toLowerCase())) ||
    flags.isStaff ||
    flags.isSuperuser ||
    roles.includes("admin")
  )
}
