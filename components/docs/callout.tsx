"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Lightbulb, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger"
  title?: string
  children: React.ReactNode
}

const calloutStyles = {
  info: {
    icon: Info,
    className: "border-primary/30 bg-primary/5",
    iconClassName: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/30 bg-yellow-500/5",
    iconClassName: "text-yellow-500",
  },
  tip: {
    icon: Lightbulb,
    className: "border-green-500/30 bg-green-500/5",
    iconClassName: "text-green-500",
  },
  danger: {
    icon: AlertCircle,
    className: "border-destructive/30 bg-destructive/5",
    iconClassName: "text-destructive",
  },
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = calloutStyles[type]
  const Icon = style.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-lg border p-4 my-4",
        style.className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", style.iconClassName)} />
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-foreground mb-1">{title}</div>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
