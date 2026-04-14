"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Wrench, Download, Settings, Zap } from "lucide-react"
import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "burp-nedir", title: "Burp Suite Nedir?", level: 2 },
  { id: "kurulum", title: "Kurulum", level: 2 },
  { id: "temel-ozellikler", title: "Temel Özellikler", level: 2 },
  { id: "proxy-ayarlari", title: "Proxy Ayarları", level: 2 },
  { id: "ipuclari", title: "İpuçları", level: 2 },
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
    name: "Proxy",
    description: "HTTP/HTTPS trafiğini yakalama ve değiştirme",
    icon: "🔄",
  },
  {
    name: "Repeater",
    description: "İstekleri manuel olarak düzenleme ve tekrar gönderme",
    icon: "🔁",
  },
  {
    name: "Intruder",
    description: "Otomatik saldırı ve fuzzing aracı",
    icon: "⚡",
  },
  {
    name: "Scanner",
    description: "Otomatik güvenlik açığı tarama (Pro)",
    icon: "🔍",
  },
  {
    name: "Decoder",
    description: "Encoding/decoding işlemleri",
    icon: "🔐",
  },
  {
    name: "Comparer",
    description: "İki yanıtı karşılaştırma",
    icon: "⚖️",
  },
]

export default function BurpSuitePage() {
  return (
    <>
      <TableOfContents items={tocItems} />
      
      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="prose prose-invert max-w-none"
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="mb-8">
          <Link 
            href="/docs" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dokümantasyon
          </Link>
          
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <Wrench className="w-4 h-4" />
            <span>Araçlar</span>
          </div>
          
          <h1 id="burp-nedir" className="text-4xl font-bold text-foreground mb-4 scroll-mt-20">
            Burp Suite
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Burp Suite, web uygulama güvenlik testleri için en popüler araçtır. 
            HTTP trafiğini yakalama, analiz etme ve değiştirme imkanı sunar.
          </p>
        </motion.div>

        {/* Intro */}
        <motion.section variants={fadeIn}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            PortSwigger tarafından geliştirilen Burp Suite, web güvenlik araştırmacılarının 
            vazgeçilmez aracıdır. Community (ücretsiz) ve Professional (ücretli) olmak 
            üzere iki versiyonu bulunur.
          </p>

          <Callout type="info" title="Versiyon Seçimi">
            Başlangıç için Community Edition yeterlidir. Scanner ve gelişmiş 
            Intruder özellikleri için Professional Edition gereklidir.
          </Callout>
        </motion.section>

        {/* Installation */}
        <motion.section variants={fadeIn}>
          <h2 id="kurulum" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Kurulum
          </h2>

          <div className="not-prose mb-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50">
              <Download className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">İndirme Linki</h3>
                <p className="text-sm text-muted-foreground">
                  portswigger.net/burp/communitydownload
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            language="bash"
            filename="Linux Kurulum"
            code={`# JAR dosyasını indirin ve çalıştırın
java -jar burpsuite_community_vX.X.X.jar

# Veya Kali Linux'ta
sudo apt update
sudo apt install burpsuite`}
          />

          <Callout type="tip" title="Java Gereksinimi">
            Burp Suite çalışması için Java 17+ gereklidir. 
            OpenJDK veya Oracle JDK kullanabilirsiniz.
          </Callout>
        </motion.section>

        {/* Features */}
        <motion.section variants={fadeIn}>
          <h2 id="temel-ozellikler" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Temel Özellikler
          </h2>

          <div className="not-prose grid gap-3 md:grid-cols-2 mb-6">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="p-4 rounded-lg border border-border/50 bg-card hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{feature.icon}</span>
                  <h3 className="font-semibold text-foreground">{feature.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Proxy Settings */}
        <motion.section variants={fadeIn}>
          <h2 id="proxy-ayarlari" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Proxy Ayarları
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Burp Suite&apos;i kullanmak için tarayıcınızı proxy üzerinden yönlendirmeniz gerekir.
          </p>

          <div className="not-prose space-y-4 mb-6">
            {[
              {
                step: "01",
                title: "Burp Proxy Başlat",
                desc: "Proxy → Options → Proxy Listeners → 127.0.0.1:8080",
              },
              {
                step: "02",
                title: "Tarayıcı Ayarları",
                desc: "Tarayıcı proxy ayarlarını 127.0.0.1:8080 olarak ayarlayın",
              },
              {
                step: "03",
                title: "CA Sertifikası",
                desc: "http://burpsuite adresinden CA sertifikasını indirip yükleyin",
              },
              {
                step: "04",
                title: "Intercept",
                desc: "Proxy → Intercept → Intercept is on/off ile trafiği yakalayın",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <CodeBlock
            language="text"
            filename="Firefox Proxy Ayarları"
            code={`Settings → Network Settings → Manual proxy configuration

HTTP Proxy: 127.0.0.1
Port: 8080
☑️ Also use this proxy for HTTPS`}
          />
        </motion.section>

        {/* Tips */}
        <motion.section variants={fadeIn}>
          <h2 id="ipuclari" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            İpuçları
          </h2>

          <div className="not-prose space-y-3 mb-6">
            {[
              "Scope tanımlayarak sadece hedef siteyi kaydedin",
              "Repeater'da request'leri organize etmek için tab'ları yeniden adlandırın",
              "Intruder attack type'larını iyi öğrenin: Sniper, Battering Ram, Pitchfork, Cluster Bomb",
              "Extensions menüsünden BApp Store'u keşfedin",
              "Project options'dan otomatik backup ayarlayın",
            ].map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Önerilen Eklentiler">
            Logger++, Autorize, Param Miner ve JSON Beautifier eklentilerini 
            mutlaka kurun. Bug hunting verimliliğinizi artıracaktır.
          </Callout>
        </motion.section>

        {/* Navigation */}
        <motion.div variants={fadeIn} className="flex items-center justify-between pt-8 mt-8 border-t border-border/50 not-prose">
          <Link
            href="/docs/metodoloji/rapor"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Rapor Yazımı</span>
          </Link>
          <Link
            href="/docs/araclar/nuclei"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Nuclei</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}
