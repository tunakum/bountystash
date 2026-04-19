"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const intersectingRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    intersectingRef.current.clear()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersectingRef.current.add(entry.target.id)
          else intersectingRef.current.delete(entry.target.id)
        })
        let topId = ""
        let topY = Infinity
        intersectingRef.current.forEach((id) => {
          const el = document.getElementById(id)
          if (!el) return
          const y = el.getBoundingClientRect().top
          if (y < topY) {
            topY = y
            topId = id
          }
        })
        if (topId) setActiveId(topId)
      },
      { rootMargin: "-80px 0% -80% 0%" }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="hidden xl:block fixed right-0 top-14 w-64 max-h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Bu Sayfada
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block text-sm py-1 transition-all duration-200 border-l-2 pl-3",
              item.level === 2 ? "ml-0" : "ml-3",
              activeId === item.id
                ? "text-primary border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent hover:border-border"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
