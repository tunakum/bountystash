"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Shield, Bug, Target, Wrench, Globe, Code, Zap, BookOpen } from "lucide-react"
import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "giris", title: "Giriş", level: 2 },
  { id: "neden-bug-bounty", title: "Neden Bug Bounty?", level: 2 },
  { id: "hizli-baslangic", title: "Hızlı Başlangıç", level: 2 },
  { id: "onerilen-yol-haritasi", title: "Önerilen Yol Haritası", level: 2 },
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

const features = [
  {
    icon: Globe,
    title: "Web Güvenliği",
    description: "XSS, SQL Injection, CSRF ve daha fazlası hakkında detaylı rehberler.",
    href: "/docs/web/xss",
  },
  {
    icon: Code,
    title: "API Güvenliği",
    description: "BOLA, IDOR, Authentication bypass ve GraphQL güvenliği.",
    href: "/docs/api/bola-idor",
  },
  {
    icon: Wrench,
    title: "Araçlar",
    description: "Burp Suite, Nuclei, FFUF gibi popüler araçların kullanımı.",
    href: "/docs/araclar/burp-suite",
  },
  {
    icon: Target,
    title: "Metodoloji",
    description: "Keşiften rapora, adım adım bug hunting metodolojisi.",
    href: "/docs/metodoloji/kesif",
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
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Dokümantasyon</span>
          </div>
          <h1 id="giris" className="text-4xl font-bold text-foreground mb-4 text-balance">
            Bug Bounty Rehberi
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Türkçe olarak hazırlanmış kapsamlı bug bounty dokümantasyonu. Güvenlik 
            açıklarını bulmayı, analiz etmeyi ve raporlamayı öğrenin.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeIn} className="grid gap-4 md:grid-cols-2 not-prose mb-12">
          {features.map((feature, i) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative p-5 rounded-xl border border-border/50 bg-card hover:bg-secondary/30 transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    {feature.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Why Bug Bounty */}
        <motion.section variants={fadeIn}>
          <h2 id="neden-bug-bounty" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Neden Bug Bounty?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bug bounty programları, şirketlerin güvenlik araştırmacılarını ödüllendirerek 
            sistemlerindeki güvenlik açıklarını keşfetmelerini sağlar. Bu, hem şirketler 
            hem de güvenlik araştırmacıları için kazan-kazan bir durumdur.
          </p>
          
          <div className="grid gap-3 md:grid-cols-3 not-prose mb-6">
            {[
              { icon: "💰", title: "Finansal Kazanç", desc: "Kritik açıklar için yüksek ödüller" },
              { icon: "📚", title: "Sürekli Öğrenme", desc: "Her hedef yeni bir öğrenme fırsatı" },
              { icon: "🌍", title: "Global Topluluk", desc: "Dünya çapında araştırmacılarla bağlantı" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium text-foreground mb-1">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Start */}
        <motion.section variants={fadeIn}>
          <h2 id="hizli-baslangic" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Hızlı Başlangıç
          </h2>
          
          <Callout type="tip" title="Başlamadan Önce">
            Bug bounty&apos;e başlamadan önce temel web teknolojilerini (HTTP, HTML, JavaScript) 
            ve ağ protokollerini anlamanız önerilir.
          </Callout>

          <p className="text-muted-foreground leading-relaxed mb-4">
            İlk adım olarak, bir bug bounty platformuna kaydolun ve başlangıç seviyesi 
            programları keşfedin. İşte temel araçları kurarak başlayabilirsiniz:
          </p>

          <CodeBlock
            language="bash"
            filename="Terminal"
            code={`# Subfinder kurulumu - subdomain keşfi için
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# HTTPX kurulumu - HTTP probing için
go install github.com/projectdiscovery/httpx/cmd/httpx@latest

# Nuclei kurulumu - vulnerability scanning için
go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest`}
          />

          <Callout type="warning" title="Yasal Uyarı">
            Sadece izin verilen hedefleri test edin. İzinsiz güvenlik testi yapmak 
            yasadışıdır ve ciddi yasal sonuçlara yol açabilir.
          </Callout>
        </motion.section>

        {/* Roadmap */}
        <motion.section variants={fadeIn}>
          <h2 id="onerilen-yol-haritasi" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Önerilen Yol Haritası
          </h2>
          
          <div className="not-prose space-y-4 mb-8">
            {[
              {
                step: "01",
                title: "Temel Bilgileri Öğrenin",
                desc: "Web teknolojileri, HTTP protokolü ve temel güvenlik kavramları",
                status: "başlangıç",
              },
              {
                step: "02",
                title: "Araçları Tanıyın",
                desc: "Burp Suite, browser DevTools ve temel recon araçları",
                status: "temel",
              },
              {
                step: "03",
                title: "Açık Türlerini Anlayın",
                desc: "XSS, SQLi, CSRF, IDOR gibi yaygın açık türleri",
                status: "orta",
              },
              {
                step: "04",
                title: "Pratik Yapın",
                desc: "Lab ortamları ve VDP programları ile deneyim kazanın",
                status: "pratik",
              },
              {
                step: "05",
                title: "Gerçek Hedeflere Geçin",
                desc: "Bug bounty programlarında aktif olarak hunting yapın",
                status: "ileri",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card hover:bg-secondary/20 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold group-hover:bg-primary/20 transition-colors">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Zap className="w-6 h-6 text-primary" />
            <div>
              <div className="font-medium text-foreground">Hazır mısınız?</div>
              <div className="text-sm text-muted-foreground">
                <Link href="/docs/giris/bug-bounty-nedir" className="text-primary hover:underline">
                  Bug Bounty Nedir?
                </Link>
                {" "}bölümü ile başlayın.
              </div>
            </div>
          </div>
        </motion.section>
      </motion.article>
    </>
  )
}
