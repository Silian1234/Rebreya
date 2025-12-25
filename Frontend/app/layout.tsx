import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rebreya: Shadow of Progress",
  description: "Rebreya: Shadow of Progress",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
