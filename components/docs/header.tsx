"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { breadcrumbMap } from "@/lib/navigation"

export function Header() {
  const pathname = usePathname()
  const breadcrumb = breadcrumbMap[pathname]
  const isDocsRoot = pathname === "/docs"
  const isUnknownDocs = !breadcrumb && !isDocsRoot && pathname.startsWith("/docs")

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-30 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 lg:px-6 pl-14 lg:pl-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Dokümantasyon
          </Link>
          {breadcrumb && (
            <>
              <span className="mx-2 hidden sm:inline">/</span>
              <span className="text-foreground hidden sm:inline">
                {breadcrumb[0]} / {breadcrumb[1]}
              </span>
            </>
          )}
          {isUnknownDocs && (
            <>
              <span className="mx-2 hidden sm:inline">/</span>
              <span className="text-foreground hidden sm:inline">Sayfa</span>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/tunakum/BountyStash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-2 px-3"
          >
            <Github className="w-4 h-4" />
            <span className="hidden md:inline">GitHub</span>
          </Link>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="https://github.com/tunakum/BountyStash" target="_blank" rel="noopener noreferrer">
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
