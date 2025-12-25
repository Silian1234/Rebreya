"use client"

import { useRef } from "react"
import { Bold, Italic, Link2, Table2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type MarkdownEditorProps = {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  textareaClassName?: string
}

type Selection = {
  start: number
  end: number
}

export function MarkdownEditor({
  value,
  onValueChange,
  placeholder,
  disabled,
  required,
  className,
  textareaClassName,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const applyChange = (next: string, nextSelection?: Selection) => {
    onValueChange(next)
    if (!nextSelection) return
    requestAnimationFrame(() => {
      const textarea = textareaRef.current
      if (!textarea) return
      textarea.focus()
      textarea.setSelectionRange(nextSelection.start, nextSelection.end)
    })
  }

  const wrap = (prefix: string, suffix = prefix, fallback = "") => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const selected = value.slice(start, end) || fallback
    const next = `${value.slice(0, start)}${prefix}${selected}${suffix}${value.slice(end)}`

    const selectionStart = start + prefix.length
    const selectionEnd = selectionStart + selected.length
    applyChange(next, { start: selectionStart, end: selectionEnd })
  }

  const insert = (text: string, caretOffset = text.length) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const next = `${value.slice(0, start)}${text}${value.slice(end)}`
    const caret = start + caretOffset
    applyChange(next, { start: caret, end: caret })
  }

  const insertLink = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const selected = value.slice(start, end) || "текст"
    const snippet = `[${selected}](url)`
    const next = `${value.slice(0, start)}${snippet}${value.slice(end)}`

    const urlStart = start + selected.length + 3
    const urlEnd = urlStart + 3
    applyChange(next, { start: urlStart, end: urlEnd })
  }

  const insertTable = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0

    const prefix = start === 0 || value[start - 1] === "\n" ? "" : "\n"
    const table =
      `${prefix}| Колонка 1 | Колонка 2 |\n` +
      `| --- | --- |\n` +
      `|  |  |\n`

    const next = `${value.slice(0, start)}${table}${value.slice(end)}`
    const caret = start + prefix.length + "| ".length
    applyChange(next, { start: caret, end: caret })
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => wrap("**")} disabled={disabled} aria-label="Жирный">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => wrap("*")} disabled={disabled} aria-label="Курсив">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={insertLink} disabled={disabled} aria-label="Ссылка">
          <Link2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={insertTable} disabled={disabled} aria-label="Таблица">
          <Table2 className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={(e) => onValueChange(e.target.value)}
        className={textareaClassName}
      />
      <p className="mt-1 text-xs text-gray-500">Markdown поддерживается. Таблица вставляется в позицию курсора.</p>
    </div>
  )
}
