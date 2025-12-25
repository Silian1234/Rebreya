import { useCallback, useEffect, useState } from "react"

import { apiRequest } from "@/lib/api"

export function useCrud<T extends { id: number }>(endpoint: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiRequest<unknown>(`/${endpoint}/`)
      const normalized = Array.isArray(data)
        ? (data as T[])
        : Array.isArray((data as { results?: T[] }).results)
          ? ((data as { results: T[] }).results)
          : []
      setItems(normalized)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    void fetchItems()
  }, [fetchItems])

  const addItem = useCallback(
    async (payload: Omit<T, "id">) => {
      const created = await apiRequest<T>(`/${endpoint}/`, {
        method: "POST",
        body: JSON.stringify(payload),
      })
      setItems((prev) => [...prev, created])
      return created
    },
    [endpoint],
  )

  const updateItem = useCallback(
    async (payload: T) => {
      const updated = await apiRequest<T>(`/${endpoint}/${payload.id}/`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      return updated
    },
    [endpoint],
  )

  const deleteItem = useCallback(
    async (id: number) => {
      await apiRequest<void>(`/${endpoint}/${id}/`, { method: "DELETE" })
      setItems((prev) => prev.filter((item) => item.id !== id))
    },
    [endpoint],
  )

  return { items, loading, error, fetchItems, addItem, updateItem, deleteItem }
}
