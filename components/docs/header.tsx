"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const pathTitles: Record<string, [string, string]> = {
  "/docs/web/xss": ["Web Zafiyetleri", "XSS"],
  "/docs/web/sql-injection": ["Web Zafiyetleri", "SQL Injection"],
  "/docs/web/csrf": ["Web Zafiyetleri", "CSRF"],
  "/docs/web/ssrf": ["Web Zafiyetleri", "SSRF"],
  "/docs/web/xxe": ["Web Zafiyetleri", "XXE Injection"],
  "/docs/web/deserialization": ["Web Zafiyetleri", "Insecure Deserialization"],
  "/docs/web/file-upload": ["Web Zafiyetleri", "File Upload"],
  "/docs/api/bola-idor": ["API Zafiyetleri", "BOLA / IDOR"],
  "/docs/api/broken-auth": ["API Zafiyetleri", "Broken Authentication"],
  "/docs/api/bopla": ["API Zafiyetleri", "BOPLA"],
  "/docs/api/mass-assignment": ["API Zafiyetleri", "Mass Assignment"],
  "/docs/api/rate-limiting": ["API Zafiyetleri", "Rate Limiting"],
  "/docs/api/graphql": ["API Zafiyetleri", "GraphQL Security"],
  "/docs/api/rest": ["API Zafiyetleri", "REST API Security"],
  "/docs/ai/owasp-llm-top-10": ["AI / LLM Zafiyetleri", "OWASP LLM Top 10"],
  "/docs/ai/prompt-injection": ["AI / LLM Zafiyetleri", "Prompt Injection"],
  "/docs/ai/jailbreaking": ["AI / LLM Zafiyetleri", "Jailbreaking"],
  "/docs/ai/data-poisoning": ["AI / LLM Zafiyetleri", "Data Poisoning"],
  "/docs/ai/model-theft": ["AI / LLM Zafiyetleri", "Model Theft"],
  "/docs/ai/insecure-output": ["AI / LLM Zafiyetleri", "Insecure Output"],
  "/docs/injection/command": ["Injection Zafiyetleri", "Command Injection"],
  "/docs/injection/ldap": ["Injection Zafiyetleri", "LDAP Injection"],
  "/docs/injection/nosql": ["Injection Zafiyetleri", "NoSQL Injection"],
  "/docs/injection/ssti": ["Injection Zafiyetleri", "SSTI"],
  "/docs/injection/header": ["Injection Zafiyetleri", "Header Injection"],
  "/docs/auth/oauth": ["Authentication", "OAuth Vulnerabilities"],
  "/docs/auth/jwt": ["Authentication", "JWT Attacks"],
  "/docs/auth/session": ["Authentication", "Session Management"],
  "/docs/auth/password-reset": ["Authentication", "Password Reset Flaws"],
  "/docs/auth/2fa-bypass": ["Authentication", "2FA Bypass"],
}

export function Header() {
  const pathname = usePathname()
  const breadcrumb = pathTitles[pathname]

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-30 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 lg:px-6 pl-14 lg:pl-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Dokümantasyon
          </Link>
          {breadcrumb ? (
            <>
              <span className="mx-2 hidden sm:inline">/</span>
              <span className="text-foreground hidden sm:inline">
                {breadcrumb[0]} / {breadcrumb[1]}
              </span>
            </>
          ) : pathname === "/docs" ? null : (
            <>
              <span className="mx-2 hidden sm:inline">/</span>
              <span className="text-foreground hidden sm:inline">Giriş</span>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden sm:flex" asChild>
            <Link href="https://github.com/tunakum/BountyStash" target="_blank">
              <Github className="w-4 h-4 sm:mr-2" />
              <span className="hidden md:inline">GitHub</span>
            </Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="https://github.com/tunakum/BountyStash" target="_blank">
              <span className="hidden sm:inline">Katkıda Bulun</span>
              <span className="sm:hidden">Katkı</span>
              <ExternalLink className="w-3 h-3 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
