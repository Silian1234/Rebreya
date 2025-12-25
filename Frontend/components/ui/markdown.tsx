import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

type MarkdownProps = {
  content?: string | null
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  if (!content) return null

  return (
    <div className={cn("space-y-3 text-sm text-gray-200 leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => (
            <a
              {...props}
              className="text-amber-200 underline underline-offset-4 hover:text-amber-100"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          ),
          p: ({ children, ...props }) => (
            <p {...props} className="whitespace-pre-wrap">
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul {...props} className="list-disc pl-5 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol {...props} className="list-decimal pl-5 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li {...props} className="marker:text-gray-500">
              {children}
            </li>
          ),
          h1: ({ children, ...props }) => (
            <h1 {...props} className="text-2xl font-semibold text-gray-100">
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 {...props} className="text-xl font-semibold text-gray-100">
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 {...props} className="text-lg font-semibold text-gray-100">
              {children}
            </h3>
          ),
          pre: ({ children, ...props }) => (
            <pre {...props} className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = typeof className === "string" && className.includes("language-")
            return (
              <code
                {...props}
                className={cn(
                  isBlock ? "text-xs text-gray-100" : "rounded bg-white/10 px-1 py-0.5 text-[0.9em] text-gray-100",
                  className,
                )}
              >
                {children}
              </code>
            )
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props} className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th {...props} className="border border-white/10 bg-white/5 px-3 py-2 text-left text-gray-100">
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td {...props} className="border border-white/10 px-3 py-2 align-top text-gray-200">
              {children}
            </td>
          ),
          img: ({ ...props }) => (
            <img {...props} className="max-w-full rounded-lg border border-white/10" alt={props.alt ?? ""} />
          ),
          hr: (props) => <hr {...props} className="border-white/10" />,
          blockquote: ({ children, ...props }) => (
            <blockquote {...props} className="border-l-2 border-amber-500/40 pl-4 text-gray-200">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
