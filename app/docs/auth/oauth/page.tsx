"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "redirect-uri", title: "Redirect URI Manipulation", level: 2 },
  { id: "auth-code", title: "Authorization Code Attacks", level: 2 },
  { id: "csrf-state", title: "CSRF / State Parameter", level: 2 },
  { id: "token-attacks", title: "Token Attacks", level: 2 },
  { id: "social-login", title: "Social Login Bypass", level: 2 },
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

export default function OAuthPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">OAuth Vulnerabilities</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            OAuth 2.0 implementasyonlarındaki güvenlik zafiyetleri. Authorization code theft,
            open redirect, CSRF ve token leakage saldırıları.
          </p>
        </motion.div>

        <Callout type="warning" title="Account Takeover">
          OAuth zafiyetleri doğrudan account takeover&apos;a yol açabilir. Özellikle
          redirect_uri ve state parametresi kontrol edilmelidir.
        </Callout>

        <motion.section variants={fadeIn} id="redirect-uri" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Redirect URI Manipulation
          </h2>
          <p className="text-muted-foreground mb-4">
            redirect_uri parametresinin validation&apos;ı yetersizse authorization code veya
            token attacker sunucusuna yönlendirilebilir.
          </p>
          <PayloadList
            title="Redirect URI Bypass"
            initialShow={10}
            payloads={[
              { code: `redirect_uri=https://evil.com`, note: "Direct override" },
              { code: `redirect_uri=https://target.com.evil.com`, note: "Subdomain bypass" },
              { code: `redirect_uri=https://evil.com/target.com`, note: "Path bypass" },
              { code: `redirect_uri=https://target.com@evil.com`, note: "Credentials bypass" },
              { code: `redirect_uri=https://target.com%40evil.com`, note: "URL encoded @" },
              { code: `redirect_uri=https://target.com/.evil.com`, note: "Dot bypass" },
              { code: `redirect_uri=https://target.com%23.evil.com`, note: "Fragment bypass" },
              { code: `redirect_uri=https://target.com/callback?next=https://evil.com`, note: "Open redirect chain" },
              { code: `redirect_uri=https://target.com/callback/../../../evil`, note: "Path traversal" },
              { code: `redirect_uri=https://target.com/callback%0d%0aLocation:%20https://evil.com`, note: "CRLF injection" },
              { code: `redirect_uri=http://target.com/callback`, note: "HTTP downgrade" },
              { code: `redirect_uri=https://target.com/callback#evil.com`, note: "Fragment injection" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="auth-code" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Authorization Code Attacks
          </h2>
          <PayloadList
            title="Code Theft & Replay"
            initialShow={6}
            payloads={[
              { code: `Referer header leak → code in URL visible to third-party`, note: "Referer leakage" },
              { code: `Code replay → same code used multiple times`, note: "Code reuse (no single-use)" },
              { code: `Code brute force → short/predictable codes`, note: "Code guessing" },
              { code: `Code leak via browser history`, note: "History-based attack" },
              { code: `response_type=code → response_type=token`, note: "Implicit flow downgrade" },
              { code: `Code + redirect_uri mismatch → use code with different redirect`, note: "Redirect mismatch" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="csrf-state" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            CSRF / State Parameter
          </h2>
          <PayloadList
            title="CSRF Payloads"
            initialShow={6}
            payloads={[
              { code: `OAuth flow without state parameter → CSRF possible`, note: "Missing state" },
              { code: `state=static_value → always same, no CSRF protection`, note: "Static state" },
              { code: `Attacker initiates OAuth → victim completes → account linked to attacker`, note: "Login CSRF" },
              { code: `<img src="https://target.com/oauth/callback?code=ATTACKER_CODE">`, note: "Force account link" },
              { code: `state parameter not validated on callback`, note: "State ignored" },
              { code: `state parameter predictable/guessable`, note: "Weak state generation" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="token-attacks" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Token Attacks
          </h2>
          <PayloadList
            title="Token Theft & Manipulation"
            initialShow={8}
            payloads={[
              { code: `Access token in URL fragment → JS access`, note: "Implicit flow token theft" },
              { code: `Token in Referer header`, note: "Third-party leak" },
              { code: `Token stored in localStorage → XSS = token theft`, note: "Storage-based theft" },
              { code: `Token scope escalation: scope=read → scope=admin`, note: "Scope escalation" },
              { code: `Refresh token reuse after rotation`, note: "Refresh token replay" },
              { code: `Token exchange between different clients`, note: "Client confusion" },
              { code: `Bearer token in GET parameters → server logs`, note: "Log leakage" },
              { code: `Expired token still accepted`, note: "No expiry validation" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="social-login" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            Social Login Bypass
          </h2>
          <PayloadList
            title="Social Auth Payloads"
            initialShow={6}
            payloads={[
              { code: `Register with victim's email → link OAuth → take over account`, note: "Pre-registration attack" },
              { code: `Change email on OAuth provider → relink account`, note: "Email change attack" },
              { code: `Multiple OAuth providers → unlink primary, link attacker`, note: "Provider switching" },
              { code: `OAuth account unlink → re-register with same email`, note: "Unlink + re-register" },
              { code: `Missing email verification on OAuth signup`, note: "Unverified email trust" },
              { code: `Race condition: simultaneous OAuth + password login`, note: "Race condition ATO" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          1. redirect_uri validation test edin (subdomain, path, protocol){"\n"}
          2. state parameter varlığını ve doğrulamasını kontrol edin{"\n"}
          3. Authorization code tek kullanımlık mı test edin{"\n"}
          4. Token&apos;ların nerede saklandığını kontrol edin{"\n"}
          5. Scope escalation deneyin{"\n"}
          6. Social login flow&apos;unda email verification bypass arayın
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/injection/header"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Header Injection
            </Link>
            <Link
              href="/docs/auth/jwt"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              JWT Attacks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
