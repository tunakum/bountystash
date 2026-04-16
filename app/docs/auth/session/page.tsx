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

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function SessionPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="fixation" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Session Fixation</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="cookie-flags" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Cookie Security Flags</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="hijacking" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Session Hijacking</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="prediction" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Session Prediction</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="logout" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Logout & Invalidation</h2>
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

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/auth/jwt" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>JWT Attacks</span>
        </Link>
        <Link href="/docs/auth/password-reset" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>Password Reset</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}
