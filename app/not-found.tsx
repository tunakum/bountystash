"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, ArrowLeft, Search, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative z-10 text-center px-6 max-w-xl"
      >
        {/* Logo */}
        <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 mb-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">BountyStash</span>
          </Link>
        </motion.div>

        {/* 404 */}
        <motion.div variants={fadeIn} className="mb-6">
          <div className="text-8xl font-bold text-foreground/10 select-none mb-2">404</div>
        </motion.div>

        {/* Glitch text */}
        <motion.div variants={fadeIn} className="mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
            <Bug className="w-4 h-4" />
            <span>Sayfa Bulunamadı</span>
          </div>
        </motion.div>

        <motion.h1 variants={fadeIn} className="text-3xl font-bold text-foreground mb-3">
          Bu endpoint&apos;e ulaşılamıyor
        </motion.h1>

        <motion.p variants={fadeIn} className="text-muted-foreground mb-8 leading-relaxed">
          Aradığın sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </motion.p>

        {/* Terminal-style hint */}
        <motion.div variants={fadeIn} className="mb-8">
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden text-left max-w-sm mx-auto">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-secondary/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-1">terminal</span>
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="text-muted-foreground">
                <span className="text-green-400">$</span> curl -I /this-page
              </div>
              <div className="text-destructive/80 mt-1">HTTP/1.1 404 Not Found</div>
              <div className="text-muted-foreground/50 mt-1">
                <span className="text-green-400">$</span> <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={fadeIn} className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">
              <Search className="w-4 h-4 mr-2" />
              Dokümantasyon
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
