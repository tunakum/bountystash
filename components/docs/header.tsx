"use client"

import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-30 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 lg:px-6 pl-14 lg:pl-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Dokümantasyon
          </Link>
          <span className="mx-2 hidden sm:inline">/</span>
          <span className="text-foreground hidden sm:inline">Giriş</span>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden sm:flex" asChild>
            <Link href="https://github.com" target="_blank">
              <Github className="w-4 h-4 sm:mr-2" />
              <span className="hidden md:inline">GitHub</span>
            </Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <span className="hidden sm:inline">Katkıda Bulun</span>
            <span className="sm:hidden">Katkı</span>
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>
    </header>
  )
}
