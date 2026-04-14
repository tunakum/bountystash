"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Globe, Server, Brain, Database, Lock, Wrench } from "lucide-react"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "zafiyetler", title: "Zafiyet Kategorileri", level: 2 },
  { id: "web", title: "Web Zafiyetleri", level: 3 },
  { id: "api", title: "API Zafiyetleri", level: 3 },
  { id: "ai", title: "AI/LLM Zafiyetleri", level: 3 },
  { id: "injection", title: "Injection Zafiyetleri", level: 3 },
  { id: "auth", title: "Authentication", level: 3 },
]

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

const categories = [
  {
    id: "web",
    icon: Globe,
    title: "Web Zafiyetleri",
    description: "XSS, SQL Injection, CSRF, SSRF ve daha fazlasi.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    items: [
      { title: "XSS (Cross-Site Scripting)", href: "/docs/web/xss" },
      { title: "SQL Injection", href: "/docs/web/sql-injection" },
      { title: "CSRF", href: "/docs/web/csrf" },
      { title: "SSRF", href: "/docs/web/ssrf" },
      { title: "XXE Injection", href: "/docs/web/xxe" },
    ],
  },
  {
    id: "api",
    icon: Server,
    title: "API Zafiyetleri",
    description: "OWASP API Top 10 ve modern API guvenlik aciklari.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    items: [
      { title: "BOLA / IDOR", href: "/docs/api/bola-idor" },
      { title: "Broken Authentication", href: "/docs/api/broken-auth" },
      { title: "Mass Assignment", href: "/docs/api/mass-assignment" },
      { title: "GraphQL Security", href: "/docs/api/graphql" },
      { title: "Rate Limiting", href: "/docs/api/rate-limiting" },
    ],
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI / LLM Zafiyetleri",
    description: "OWASP LLM Top 10, prompt injection ve AI guvenlik riskleri.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    items: [
      { title: "OWASP LLM Top 10", href: "/docs/ai/owasp-llm-top-10" },
      { title: "Prompt Injection", href: "/docs/ai/prompt-injection" },
      { title: "Jailbreaking", href: "/docs/ai/jailbreaking" },
      { title: "Data Poisoning", href: "/docs/ai/data-poisoning" },
      { title: "Insecure Output", href: "/docs/ai/insecure-output" },
    ],
  },
  {
    id: "injection",
    icon: Database,
    title: "Injection Zafiyetleri",
    description: "Command, LDAP, NoSQL ve template injection saldiriari.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    items: [
      { title: "Command Injection", href: "/docs/injection/command" },
      { title: "NoSQL Injection", href: "/docs/injection/nosql" },
      { title: "SSTI (Template Injection)", href: "/docs/injection/ssti" },
      { title: "LDAP Injection", href: "/docs/injection/ldap" },
      { title: "Header Injection", href: "/docs/injection/header" },
    ],
  },
  {
    id: "auth",
    icon: Lock,
    title: "Authentication",
    description: "OAuth, JWT, session ve kimlik dogrulama zafiyetleri.",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    items: [
      { title: "OAuth Vulnerabilities", href: "/docs/auth/oauth" },
      { title: "JWT Attacks", href: "/docs/auth/jwt" },
      { title: "Session Management", href: "/docs/auth/session" },
      { title: "Password Reset Flaws", href: "/docs/auth/password-reset" },
      { title: "2FA Bypass", href: "/docs/auth/2fa-bypass" },
    ],
  },
]

export default function DocsPage() {
  return (
    <>
      <TableOfContents items={tocItems} />
      
      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="prose prose-invert max-w-none"
      >
        {/* Hero */}
        <motion.div variants={fadeIn} className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Guvenlik Zafiyetleri Dokumantasyonu
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Web, API ve AI sistemlerindeki guvenlik zafiyetleri hakkinda kapsamli Turkce dokumantasyon. 
            Her kategori detayli aciklamalar, ornekler ve bypass teknikleri icerir.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.section variants={fadeIn} id="zafiyetler">
          <h2 className="text-2xl font-semibold text-foreground mb-6 scroll-mt-20">
            Zafiyet Kategorileri
          </h2>
          
          <div className="not-prose space-y-8">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="scroll-mt-20"
              >
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  {/* Category Header */}
                  <div className="p-5 border-b border-border/50">
                    <div className="flex items-start gap-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${category.bgColor} ${category.color}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Items */}
                  <div className="divide-y divide-border/50">
                    {category.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors group"
                      >
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tools Section */}
        <motion.section variants={fadeIn} className="mt-12">
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Araclar
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Guvenlik testleri icin kullanilan araclar ve kullanim kilavuzlari.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { title: "Burp Suite", href: "/docs/araclar/burp-suite" },
                    { title: "Nuclei", href: "/docs/araclar/nuclei" },
                    { title: "FFUF", href: "/docs/araclar/ffuf" },
                    { title: "SQLMap", href: "/docs/araclar/sqlmap" },
                  ].map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="px-3 py-1.5 rounded-lg bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.article>
    </>
  )
}
