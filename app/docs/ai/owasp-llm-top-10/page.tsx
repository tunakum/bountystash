"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, AlertTriangle, ArrowRight, ExternalLink } from "lucide-react"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { Callout } from "@/components/docs/callout"

const tocItems = [
  { id: "giris", title: "Giriş", level: 2 },
  { id: "llm01", title: "LLM01: Prompt Injection", level: 2 },
  { id: "llm02", title: "LLM02: Insecure Output Handling", level: 2 },
  { id: "llm03", title: "LLM03: Training Data Poisoning", level: 2 },
  { id: "llm04", title: "LLM04: Model DoS", level: 2 },
  { id: "llm05", title: "LLM05: Supply Chain Vulnerabilities", level: 2 },
  { id: "llm06", title: "LLM06: Sensitive Info Disclosure", level: 2 },
  { id: "llm07", title: "LLM07: Insecure Plugin Design", level: 2 },
  { id: "llm08", title: "LLM08: Excessive Agency", level: 2 },
  { id: "llm09", title: "LLM09: Overreliance", level: 2 },
  { id: "llm10", title: "LLM10: Model Theft", level: 2 },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const risks = [
  {
    id: "llm01",
    code: "LLM01",
    title: "Prompt Injection",
    severity: "kritik",
    description: "Saldırganın, model girişlerini manipüle ederek LLM davranışını değiştirmesi.",
    impact: "Yetkisiz erişim, veri sızıntısı, zararlı kod çalıştırma",
    link: "/docs/ai/prompt-injection",
  },
  {
    id: "llm02",
    code: "LLM02",
    title: "Insecure Output Handling",
    severity: "yüksek",
    description: "LLM çıktılarının yeterince doğrulanmadan veya sanitize edilmeden kullanılması.",
    impact: "XSS, SSRF, RCE gibi downstream zafiyetler",
    link: "/docs/ai/insecure-output",
  },
  {
    id: "llm03",
    code: "LLM03",
    title: "Training Data Poisoning",
    severity: "yüksek",
    description: "Eğitim verilerinin manipüle edilmesiyle modelin yanlış veya zararlı çıktılar üretmesi.",
    impact: "Backdoor, bias, yanlış bilgi yayılımı",
    link: "/docs/ai/data-poisoning",
  },
  {
    id: "llm04",
    code: "LLM04",
    title: "Model Denial of Service",
    severity: "orta",
    description: "Modelin kaynaklarını tüketen veya aşırı maliyet oluşturan sorgular.",
    impact: "Servis kesintisi, yüksek operasyonel maliyet",
    link: null,
  },
  {
    id: "llm05",
    code: "LLM05",
    title: "Supply Chain Vulnerabilities",
    severity: "yüksek",
    description: "Üçüncü parti model, veri seti veya plugin kullanımı kaynaklı zafiyetler.",
    impact: "Backdoor, veri sızıntısı, güvenilirlik kaybı",
    link: null,
  },
  {
    id: "llm06",
    code: "LLM06",
    title: "Sensitive Information Disclosure",
    severity: "yüksek",
    description: "LLM'in hassas bilgileri (PII, API anahtarları, vb.) ifşa etmesi.",
    impact: "Veri ihlali, gizlilik ihlali, yasal sorunlar",
    link: null,
  },
  {
    id: "llm07",
    code: "LLM07",
    title: "Insecure Plugin Design",
    severity: "yüksek",
    description: "LLM pluginlerinin yetersiz yetkilendirme veya giriş doğrulaması ile tasarlanması.",
    impact: "RCE, veri erişimi, yetki yükseltme",
    link: null,
  },
  {
    id: "llm08",
    code: "LLM08",
    title: "Excessive Agency",
    severity: "kritik",
    description: "LLM'e gereksiz yetki veya otonom karar verme yetkisi tanınması.",
    impact: "Yetkisiz işlemler, veri kaybı, sistem hasarı",
    link: null,
  },
  {
    id: "llm09",
    code: "LLM09",
    title: "Overreliance",
    severity: "orta",
    description: "LLM çıktılarının insan doğrulaması olmadan güvenilmesi.",
    impact: "Yanlış bilgi, güvenlik açıkları, hatalı kararlar",
    link: null,
  },
  {
    id: "llm10",
    code: "LLM10",
    title: "Model Theft",
    severity: "yüksek",
    description: "Özel LLM modellerinin kopyalanması veya çalınması.",
    impact: "Fikri mülkiyet kaybı, rekabet avantajı kaybı",
    link: "/docs/ai/model-theft",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "kritik":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "yüksek":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "orta":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export default function OwaspLlmTop10Page() {
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
        <motion.div variants={fadeIn} className="mb-10">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>AI / LLM Zafiyetleri</span>
          </div>
          <h1 id="giris" className="text-4xl font-bold text-foreground mb-4 scroll-mt-20">
            OWASP LLM Top 10
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            OWASP LLM Top 10, Large Language Model (LLM) uygulamalarında en kritik
            güvenlik risklerini tanımlar. Bu liste, AI güvenlik araştırmacıları ve
            geliştiriciler için önemli bir referans kaynağı oluşturur.
          </p>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Callout type="info" title="OWASP LLM Top 10 2025">
            Bu dokümantasyon OWASP LLM Top 10 v2.0 (2025) sürümünü temel alır.
            Güncel liste için{" "}
            <a
              href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              OWASP resmi sayfasını
              <ExternalLink className="w-3 h-3" />
            </a>
            {" "}ziyaret edin.
          </Callout>
        </motion.div>

        {/* Risk List */}
        <motion.section variants={fadeIn} className="mt-10">
          <div className="not-prose space-y-4">
            {risks.map((risk, i) => (
              <motion.div
                key={risk.id}
                id={risk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="scroll-mt-20"
              >
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden hover:border-border transition-colors">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 font-mono text-sm font-semibold">
                          {risk.code}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">
                          {risk.title}
                        </h3>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                        {risk.severity.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-3">
                      {risk.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground font-medium">Etki:</span> {risk.impact}
                      </span>
                    </div>

                    {risk.link && (
                      <Link
                        href={risk.link}
                        className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        Detaylı dokümantasyon
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Summary */}
        <motion.section variants={fadeIn} className="mt-10">
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Önemli Noktalar
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Prompt Injection (LLM01), LLM uygulamaları için en kritik risk olarak tanımlanır.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Excessive Agency (LLM08), özellikle otonom agent sistemlerinde büyük risk oluşturur.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Output doğrulama ve input sanitizasyonu, birçok riski azaltmada kritik öneme sahiptir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Supply chain güvenliği, üçüncü parti model ve plugin kullanımında dikkatle değerlendirilmelidir.</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div variants={fadeIn} className="mt-10 flex items-center justify-between pt-6 border-t border-border/50 not-prose">
          <div />
          <Link
            href="/docs/ai/prompt-injection"
            className="flex items-center gap-2 text-primary hover:underline group"
          >
            Prompt Injection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}
