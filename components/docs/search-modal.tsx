"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, Hash, ArrowRight, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  title: string
  href: string
  category: string
  description?: string
}

const searchData: SearchResult[] = [
  // Web Zafiyetleri
  { title: "XSS (Cross-Site Scripting)", href: "/docs/web/xss", category: "Web Zafiyetleri", description: "Reflected, Stored ve DOM XSS türleri" },
  { title: "SQL Injection", href: "/docs/web/sql-injection", category: "Web Zafiyetleri", description: "Union, Blind ve Error-based SQLi teknikleri" },
  { title: "CSRF", href: "/docs/web/csrf", category: "Web Zafiyetleri", description: "Cross-Site Request Forgery saldırıları" },
  { title: "SSRF", href: "/docs/web/ssrf", category: "Web Zafiyetleri", description: "Server-Side Request Forgery açıkları" },
  { title: "XXE Injection", href: "/docs/web/xxe", category: "Web Zafiyetleri", description: "XML External Entity zafiyetleri" },
  { title: "Insecure Deserialization", href: "/docs/web/deserialization", category: "Web Zafiyetleri", description: "Güvensiz deserialization zafiyetleri" },
  { title: "File Upload", href: "/docs/web/file-upload", category: "Web Zafiyetleri", description: "Dosya yükleme zafiyetleri" },
  // API Zafiyetleri
  { title: "BOLA / IDOR", href: "/docs/api/bola-idor", category: "API Zafiyetleri", description: "Yetkilendirme atlatma açıkları" },
  { title: "Broken Authentication", href: "/docs/api/broken-auth", category: "API Zafiyetleri", description: "Kırık kimlik doğrulama" },
  { title: "GraphQL Security", href: "/docs/api/graphql", category: "API Zafiyetleri", description: "GraphQL güvenlik açıkları" },
  { title: "Mass Assignment", href: "/docs/api/mass-assignment", category: "API Zafiyetleri", description: "Toplu atama zafiyetleri" },
  { title: "BOPLA", href: "/docs/api/bopla", category: "API Zafiyetleri", description: "Broken Object Property Level Authorization" },
  { title: "REST API Security", href: "/docs/api/rest", category: "API Zafiyetleri", description: "REST API güvenlik açıkları" },
  { title: "Rate Limiting", href: "/docs/api/rate-limiting", category: "API Zafiyetleri", description: "Hız sınırlama zafiyetleri" },
  // AI/LLM Zafiyetleri  
  { title: "OWASP LLM Top 10", href: "/docs/ai/owasp-llm-top-10", category: "AI / LLM Zafiyetleri", description: "LLM güvenlik riskleri özeti" },
  { title: "Prompt Injection", href: "/docs/ai/prompt-injection", category: "AI / LLM Zafiyetleri", description: "Doğrudan ve dolaylı prompt enjeksiyonu" },
  { title: "Jailbreaking", href: "/docs/ai/jailbreaking", category: "AI / LLM Zafiyetleri", description: "LLM kısıtlamalarını aşma teknikleri" },
  { title: "Data Poisoning", href: "/docs/ai/data-poisoning", category: "AI / LLM Zafiyetleri", description: "Veri zehirleme saldırıları" },
  { title: "Model Theft", href: "/docs/ai/model-theft", category: "AI / LLM Zafiyetleri", description: "Model hırsızlığı saldırıları" },
  { title: "Insecure Output", href: "/docs/ai/insecure-output", category: "AI / LLM Zafiyetleri", description: "Güvensiz çıktı işleme" },
  // Injection Zafiyetleri
  { title: "Command Injection", href: "/docs/injection/command", category: "Injection Zafiyetleri", description: "Komut enjeksiyonu açıkları" },
  { title: "SSTI", href: "/docs/injection/ssti", category: "Injection Zafiyetleri", description: "Server-Side Template Injection" },
  { title: "NoSQL Injection", href: "/docs/injection/nosql", category: "Injection Zafiyetleri", description: "NoSQL veritabanı enjeksiyonu" },
  { title: "LDAP Injection", href: "/docs/injection/ldap", category: "Injection Zafiyetleri", description: "LDAP enjeksiyon saldırıları" },
  { title: "Header Injection", href: "/docs/injection/header", category: "Injection Zafiyetleri", description: "HTTP header enjeksiyonu" },
  // Authentication
  { title: "JWT Attacks", href: "/docs/auth/jwt", category: "Authentication", description: "JWT token saldırıları" },
  { title: "OAuth Vulnerabilities", href: "/docs/auth/oauth", category: "Authentication", description: "OAuth protokol açıkları" },
  { title: "2FA Bypass", href: "/docs/auth/2fa-bypass", category: "Authentication", description: "İki faktörlü doğrulama atlatma" },
  { title: "Session Management", href: "/docs/auth/session", category: "Authentication", description: "Oturum yönetimi zafiyetleri" },
  { title: "Password Reset Flaws", href: "/docs/auth/password-reset", category: "Authentication", description: "Şifre sıfırlama açıkları" },
]

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredResults = query
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : searchData.slice(0, 5)

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
      // Open modal with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }

      // Close modal with Escape
      if (e.key === "Escape") {
        setIsOpen(false)
      }

      // Navigate results
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => 
            prev < filteredResults.length - 1 ? prev + 1 : prev
          )
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        }
        if (e.key === "Enter" && filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex].href)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex, handleSelect])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <>
      {/* Search trigger - to be used in sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden"
        aria-label="Search"
      />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
            >
              <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
                {/* Search Input */}
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

                {/* Results */}
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

                {/* Footer */}
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
    </>
  )
}
