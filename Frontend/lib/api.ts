const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "") : "http://localhost:8000/api") ||
  "http://localhost:8000/api"

type Tokens = { access: string; refresh?: string }

const getStoredTokens = (): Tokens | null => {
  if (typeof window === "undefined") return null
  const access = window.localStorage.getItem("access_token")
  const refresh = window.localStorage.getItem("refresh_token")
  if (!access) return null
  return { access, refresh: refresh || undefined }
}

const persistTokens = (tokens: Tokens) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem("access_token", tokens.access)
  if (tokens.refresh) {
    window.localStorage.setItem("refresh_token", tokens.refresh)
  }
  window.dispatchEvent(new Event("tokens-changed"))
}

export const clearTokens = () => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem("access_token")
  window.localStorage.removeItem("refresh_token")
  window.dispatchEvent(new Event("tokens-changed"))
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const tokens = getStoredTokens()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}),
    ...(init?.headers || {}),
  }

  const response = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    let message = response.statusText
    try {
      const payload = await response.json()
      message = payload.detail || payload.message || JSON.stringify(payload)
    } catch {
      message = await response.text()
    }
    throw new Error(message || "Request failed")
  }

  if (response.status === 204) {
    // @ts-expect-error allow empty
    return null
  }

  const contentType = response.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return (await response.json()) as T
  }

  // @ts-expect-error allow empty
  return null
}

export async function login(username: string, password: string) {
  const tokens = await apiRequest<Tokens>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
  persistTokens(tokens)
  return tokens
}

export async function register(username: string, email: string, password: string) {
  const tokens = await apiRequest<Tokens>("/auth/register/", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  })
  persistTokens(tokens)
  return tokens
}

export async function fetchMe() {
  return apiRequest<{ id: number; username: string; email: string }>("/auth/me/")
}
