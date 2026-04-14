"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, Search, Shield, Bug, Globe, Menu, X, Brain, Server, Database, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  title: string
  href?: string
  icon?: React.ReactNode
  items?: { title: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    title: "Web Zafiyetleri",
    icon: <Globe className="w-4 h-4" />,
    items: [
      { title: "XSS (Cross-Site Scripting)", href: "/docs/web/xss" },
      { title: "SQL Injection", href: "/docs/web/sql-injection" },
      { title: "CSRF", href: "/docs/web/csrf" },
      { title: "SSRF", href: "/docs/web/ssrf" },
      { title: "XXE Injection", href: "/docs/web/xxe" },
      { title: "Insecure Deserialization", href: "/docs/web/deserialization" },
      { title: "File Upload", href: "/docs/web/file-upload" },
    ],
  },
  {
    title: "API Zafiyetleri",
    icon: <Server className="w-4 h-4" />,
    items: [
      { title: "BOLA / IDOR", href: "/docs/api/bola-idor" },
      { title: "Broken Authentication", href: "/docs/api/broken-auth" },
      { title: "BOPLA", href: "/docs/api/bopla" },
      { title: "Mass Assignment", href: "/docs/api/mass-assignment" },
      { title: "Rate Limiting", href: "/docs/api/rate-limiting" },
      { title: "GraphQL Security", href: "/docs/api/graphql" },
      { title: "REST API Security", href: "/docs/api/rest" },
    ],
  },
  {
    title: "AI / LLM Zafiyetleri",
    icon: <Brain className="w-4 h-4" />,
    items: [
      { title: "OWASP LLM Top 10", href: "/docs/ai/owasp-llm-top-10" },
      { title: "Prompt Injection", href: "/docs/ai/prompt-injection" },
      { title: "Jailbreaking", href: "/docs/ai/jailbreaking" },
      { title: "Data Poisoning", href: "/docs/ai/data-poisoning" },
      { title: "Model Theft", href: "/docs/ai/model-theft" },
      { title: "Insecure Output", href: "/docs/ai/insecure-output" },
    ],
  },
  {
    title: "Injection Zafiyetleri",
    icon: <Database className="w-4 h-4" />,
    items: [
      { title: "Command Injection", href: "/docs/injection/command" },
      { title: "LDAP Injection", href: "/docs/injection/ldap" },
      { title: "NoSQL Injection", href: "/docs/injection/nosql" },
      { title: "Template Injection (SSTI)", href: "/docs/injection/ssti" },
      { title: "Header Injection", href: "/docs/injection/header" },
    ],
  },
  {
    title: "Authentication",
    icon: <Lock className="w-4 h-4" />,
    items: [
      { title: "OAuth Vulnerabilities", href: "/docs/auth/oauth" },
      { title: "JWT Attacks", href: "/docs/auth/jwt" },
      { title: "Session Management", href: "/docs/auth/session" },
      { title: "Password Reset Flaws", href: "/docs/auth/password-reset" },
      { title: "2FA Bypass", href: "/docs/auth/2fa-bypass" },
    ],
  },
  
]

function NavSection({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const isActive = item.items?.some((subItem) => pathname === subItem.href)

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
          "hover:bg-secondary/50 group",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span className="mr-2 text-muted-foreground group-hover:text-primary transition-colors">
          {item.icon}
        </span>
        <span className="flex-1 text-left">{item.title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && item.items && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-3 border-l border-border/50 mt-1 space-y-0.5">
              {item.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={onNavigate}
                  className={cn(
                    "block px-3 py-1.5 text-sm rounded-md transition-all duration-200",
                    pathname === subItem.href
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-foreground">SecDocs.tr</span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <button className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
          <Search className="w-4 h-4 mr-2" />
          <span>Ara...</span>
          <kbd className="ml-auto text-xs bg-background/50 px-1.5 py-0.5 rounded border border-border/50 font-mono hidden sm:block">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {navigation.map((item) => (
          <NavSection key={item.title} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
          <Bug className="w-3 h-3" />
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-50 lg:hidden p-2.5 rounded-lg bg-card border border-border/50 text-foreground"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/50 bg-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-border/50 bg-sidebar lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
