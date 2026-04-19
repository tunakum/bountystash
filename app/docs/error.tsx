"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-start gap-4 py-12">
      <div className="flex items-center gap-3 text-destructive">
        <AlertTriangle className="w-6 h-6" />
        <h1 className="text-2xl font-semibold text-foreground">Bir şeyler ters gitti</h1>
      </div>
      <p className="text-muted-foreground max-w-prose">
        Sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar deneyin veya dokümantasyon ana sayfasına dönün.
      </p>
      {error.digest && (
        <code className="text-xs text-muted-foreground font-mono">Hata kimliği: {error.digest}</code>
      )}
      <div className="flex items-center gap-3 mt-2">
        <Button onClick={() => reset()}>
          <RotateCw className="w-4 h-4 mr-2" />
          Yeniden dene
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs">Dokümantasyona dön</Link>
        </Button>
      </div>
    </div>
  )
}
