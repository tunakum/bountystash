"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchData } from "@/lib/navigation"

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredResults = useMemo(() => {
    if (!query) return searchData.slice(0, 5)
    const q = query.toLowerCase()
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    )
  }, [query])

  const resultsRef = useRef(filteredResults)
  resultsRef.current = filteredResults
  const selectedIndexRef = useRef(selectedIndex)
  selectedIndexRef.current = selectedIndex
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  const handleSelect = useCallback((href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery("")
  }, [router])

  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true)
    window.addEventListener("open-search", handleOpenSearch)
    return () => window.removeEventListener("open-search", handleOpenSearch)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
        return
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        return
      }
      if (!isOpenRef.current) return

      const results = resultsRef.current
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === "Enter") {
        const target = results[selectedIndexRef.current]
        if (target) handleSelect(target.href)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleSelect])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
              <div className="flex items-center gap-3 border-b border-border/50 px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Zafiyet veya payload ara..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                <kbd className="hidden sm:flex items-center gap-1 rounded border border-border/50 bg-secondary/50 px-2 py-1 text-xs text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filteredResults.length > 0 ? (
                  <div className="space-y-1">
                    {filteredResults.map((result, index) => (
                      <button
                        key={result.href}
                        onClick={() => handleSelect(result.href)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          selectedIndex === index
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{result.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {result.category}
                            {result.description && ` • ${result.description}`}
                          </div>
                        </div>
                        {selectedIndex === index && (
                          <ArrowRight className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>Sonuç bulunamadı</p>
                    <p className="text-sm mt-1">Farklı anahtar kelimeler deneyin</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border/50 px-4 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-border/50 bg-secondary/50 px-1.5 py-0.5">↑↓</kbd>
                  <span>gezin</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-border/50 bg-secondary/50 px-1.5 py-0.5">↵</kbd>
                  <span>seç</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
