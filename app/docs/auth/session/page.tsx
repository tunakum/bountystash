"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "fixation", title: "Session Fixation", level: 2 },
  { id: "cookie-flags", title: "Cookie Security Flags", level: 2 },
  { id: "hijacking", title: "Session Hijacking", level: 2 },
  { id: "prediction", title: "Session Prediction", level: 2 },
  { id: "logout", title: "Logout & Invalidation", level: 2 },
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

export default function SessionPage() {
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
          <div className="flex items-center gap-2 text-red-400 text-sm font-medium mb-4">
            <Lock className="w-4 h-4" />
            <span>Authentication</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Session Management</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Session yönetimindeki zafiyetler. Session fixation, hijacking, prediction
            ve cookie güvenlik yapılandırma hataları.
          </p>
        </motion.div>

        <motion.section variants={fadeIn} id="fixation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Session Fixation
          </h2>
          <PayloadList
            title="Fixation Payloads"
            initialShow={6}
            payloads={[
              { code: `Set attacker's session ID → victim logs in → attacker uses same session`, note: "Classic fixation" },
              { code: `https://target.com/login?PHPSESSID=attacker_session_id`, note: "URL-based fixation" },
              { code: `<script>document.cookie="PHPSESSID=attacker_session_id"</script>`, note: "XSS-based fixation" },
              { code: `Set-Cookie: session=attacker_session via CRLF injection`, note: "Header injection fixation" },
              { code: `Login → check if session ID changes → same ID = fixation vulnerable`, note: "Detection" },
              { code: `<meta http-equiv="Set-Cookie" content="session=attacker_id">`, note: "Meta tag fixation" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="cookie-flags" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Cookie Security Flags
          </h2>
          <Callout type="info" title="Dipnot">
            Cookie&apos;lerin güvenlik flag&apos;lerini kontrol edin. Eksik flag&apos;ler
            session hijacking&apos;i kolaylaştırır.
          </Callout>
          <PayloadList
            title="Cookie Flag Kontrolü"
            initialShow={8}
            payloads={[
              { code: `HttpOnly flag missing → XSS ile cookie çalınabilir`, note: "document.cookie erişimi" },
              { code: `Secure flag missing → HTTP üzerinden cookie gönderilir`, note: "MITM riski" },
              { code: `SameSite=None → CSRF'e açık`, note: "Cross-site request" },
              { code: `SameSite missing → browser default (Lax)`, note: "Eski browser'larda None" },
              { code: `Domain=.target.com → tüm subdomain'ler cookie'yi görür`, note: "Overly broad domain" },
              { code: `Path=/ → tüm path'ler cookie'yi görür`, note: "Broad path" },
              { code: `Expires/Max-Age çok uzun → persistent session`, note: "Long-lived session" },
              { code: `__Host- prefix missing → cookie overwrite mümkün`, note: "Cookie prefix" },
              { code: `__Secure- prefix missing → HTTP'de set edilebilir`, note: "Secure prefix" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="hijacking" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Session Hijacking
          </h2>
          <PayloadList
            title="Hijacking Teknikleri"
            initialShow={8}
            payloads={[
              { code: `XSS → document.cookie → attacker sunucusuna gönder`, note: "XSS-based hijacking" },
              { code: `MITM → HTTP trafiğinde cookie yakalama`, note: "Network sniffing" },
              { code: `Session token in URL → Referer header leak`, note: "Referer leakage" },
              { code: `Session token in browser history/logs`, note: "History-based" },
              { code: `Shared hosting → session file access`, note: "Server-side session theft" },
              { code: `Cross-subdomain cookie theft via subdomain takeover`, note: "Subdomain takeover → cookie" },
              { code: `Browser extension malware → cookie extraction`, note: "Client-side malware" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="prediction" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Session Prediction
          </h2>
          <PayloadList
            title="Prediction Payloads"
            initialShow={6}
            payloads={[
              { code: `Sequential session IDs: 1001, 1002, 1003...`, note: "Predictable sequence" },
              { code: `Timestamp-based: base64(unix_timestamp + user_id)`, note: "Time-based prediction" },
              { code: `MD5(username + timestamp)`, note: "Weak hashing" },
              { code: `Low entropy: short session ID (< 128 bit)`, note: "Brute force possible" },
              { code: `Pattern analysis: collect 100+ session IDs → find pattern`, note: "Statistical analysis" },
              { code: `Same session ID regenerated after delete/recreate`, note: "Deterministic generation" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="logout" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            Logout & Invalidation
          </h2>
          <PayloadList
            title="Logout Bypass"
            initialShow={6}
            payloads={[
              { code: `Logout → use old session token → still valid?`, note: "Server-side invalidation check" },
              { code: `Logout → cookie deleted client-side but session alive on server`, note: "Client-only logout" },
              { code: `Password change → old sessions still active?`, note: "Session invalidation on password change" },
              { code: `Role change → old session has old permissions?`, note: "Permission caching" },
              { code: `Concurrent session limit bypass`, note: "Multiple active sessions" },
              { code: `Session timeout not enforced → idle session reuse`, note: "Timeout check" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          1. Login öncesi ve sonrası session ID değişiyor mu kontrol edin{"\n"}
          2. Cookie flag&apos;lerini inceleyin (HttpOnly, Secure, SameSite){"\n"}
          3. Session ID entropy&apos;sini analiz edin{"\n"}
          4. Logout sonrası eski token&apos;ı kullanmayı deneyin{"\n"}
          5. Concurrent session yönetimini test edin
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/auth/jwt"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              JWT Attacks
            </Link>
            <Link
              href="/docs/auth/password-reset"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              Password Reset
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
