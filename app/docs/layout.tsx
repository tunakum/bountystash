import { Sidebar } from "@/components/docs/sidebar"
import { Header } from "@/components/docs/header"
import { SearchModal } from "@/components/docs/search-modal"

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
      </main>
    </div>
  )
}
