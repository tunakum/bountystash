"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = "bash", filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (insecure context / denied) — silently noop
    }
  }

  const lines = code.split("\n")

  return (
    <div className="group relative rounded-lg border border-border/50 bg-card overflow-hidden my-4">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-secondary/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-mono">{filename || language}</span>
          </div>
          <motion.button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kopyala</span>
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono">
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none text-muted-foreground/50 w-8 mr-4 text-right">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
