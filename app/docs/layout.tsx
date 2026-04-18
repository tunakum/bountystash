import Link from "next/link"
import { Github } from "lucide-react"
import { Sidebar } from "@/components/docs/sidebar"
import { Header } from "@/components/docs/header"
import { SearchModal } from "@/components/docs/search-modal"
import { LogoMark } from "@/components/icons/logo-mark"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <SearchModal />
      <main className="lg:pl-64 pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 xl:mr-64">
          {children}
        </div>
        <footer className="border-t border-border/50 py-8 px-6 xl:mr-64">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <LogoMark className="w-4 h-4 text-primary" />
              <span>BountyStash</span>
            </div>
            <Link
              href="https://github.com/tunakum/BountyStash"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
            <div>Güvenlik Zafiyetleri Dokümantasyonu</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
