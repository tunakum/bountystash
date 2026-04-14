"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Payload {
  code: string
  note?: string
}

interface PayloadListProps {
  title: string
  payloads: Payload[]
  initialShow?: number
  className?: string
}

// Safely escape HTML to prevent XSS when displaying payloads
function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export function PayloadList({ title, payloads, initialShow = 5, className }: PayloadListProps) {
  const [showAll, setShowAll] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  const displayedPayloads = showAll ? payloads : payloads.slice(0, initialShow)
  const hasMore = payloads.length > initialShow

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className={cn("my-6", className)}>
      <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
        {title}
        <span className="text-xs text-muted-foreground font-normal">
          ({payloads.length} payload)
        </span>
      </h4>
      
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {displayedPayloads.map((payload, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <div className="relative rounded-lg bg-card border border-border/50 overflow-hidden">
                <div className="flex items-start">
                  <pre className="flex-1 block p-3 text-sm font-mono text-foreground/90 overflow-x-auto whitespace-pre m-0 bg-transparent">
                    <code>{payload.code}</code>
                  </pre>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      copyToClipboard(payload.code, index)
                    }}
                    className="p-2 m-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary/50"
                    aria-label="Payload kopyala"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {payload.note && (
                  <div className="px-3 pb-2 text-xs text-muted-foreground border-t border-border/30 pt-2 mt-1 bg-secondary/20">
                    <span className="text-primary/80 font-medium">Dipnot:</span> {payload.note}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          {showAll ? (
            <span>Daha az göster</span>
          ) : (
            <span>
              Tümünü göster <span className="text-muted-foreground">({payloads.length - initialShow} daha)</span>
            </span>
          )}
        </motion.button>
      )}
    </div>
  )
}

// Compact version for inline payloads
export function PayloadInline({ code, note }: { code: string; note?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="inline-flex items-center gap-1 group">
      <code className="px-1.5 py-0.5 rounded bg-card border border-border/50 text-sm font-mono text-foreground/90">
        {code}
      </code>
      <button
        onClick={copyToClipboard}
        className="p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary/50"
        aria-label="Copy"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-400" />
        ) : (
          <Copy className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
      {note && (
        <span className="text-xs text-muted-foreground ml-1">({note})</span>
      )}
    </span>
  )
}
