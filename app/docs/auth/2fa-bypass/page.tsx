"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "direct-bypass", title: "Direct Bypass", level: 2 },
  { id: "response-manipulation", title: "Response Manipulation", level: 2 },
  { id: "otp-brute", title: "OTP Brute Force", level: 2 },
  { id: "backup-code", title: "Backup Code Attacks", level: 2 },
  { id: "disable-downgrade", title: "2FA Disable / Downgrade", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function TwoFABypassPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-red-400 text-sm font-medium mb-4">
          <Lock className="w-4 h-4" />
          <span>Authentication</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">2FA Bypass</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          İki faktörlü kimlik doğrulama mekanizmalarının atlatılması. Direct bypass,
          brute force, response manipulation ve backup code saldırıları.
        </p>
      </motion.div>

      <Callout type="warning" title="High Impact">
        2FA bypass genelde P2/High çünkü ekstra güvenlik katmanını devre dışı bırakır.
        Account takeover chain&apos;inin kritik parçasıdır.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="direct-bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Direct Bypass</h2>
        <PayloadList
          title="2FA Skip Payloads"
          initialShow={8}
          payloads={[
            { code: `Login → skip 2FA page → go directly to /dashboard`, note: "Direct navigation bypass" },
            { code: `Login → 2FA page → change URL to /account`, note: "URL manipulation" },
            { code: `POST /verify-2fa with empty code → accepted?`, note: "Empty code" },
            { code: `POST /verify-2fa with code=000000`, note: "Zero code" },
            { code: `POST /verify-2fa with code=null`, note: "Null code" },
            { code: `POST /verify-2fa without code parameter`, note: "Missing parameter" },
            { code: `Login API response already contains session token before 2FA`, note: "Pre-2FA session" },
            { code: `POST /login → response has auth cookie → use directly`, note: "Cookie before 2FA" },
            { code: `Mobile API endpoint doesn't require 2FA`, note: "Platform inconsistency" },
            { code: `API v1 doesn't have 2FA, API v2 does → use v1`, note: "Version downgrade" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="response-manipulation" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Response Manipulation</h2>
        <PayloadList
          title="Response Tampering"
          initialShow={6}
          payloads={[
            { code: `{"success":false,"error":"invalid_code"} → {"success":true}`, note: "Response body tamper" },
            { code: `HTTP 403 → change to HTTP 200`, note: "Status code tamper" },
            { code: `{"verified":false} → {"verified":true}`, note: "Verified flag tamper" },
            { code: `{"2fa_required":true} → {"2fa_required":false}`, note: "2FA required flag" },
            { code: `Intercept response → add Set-Cookie: authenticated=true`, note: "Cookie injection" },
            { code: `Response has different structure for valid vs invalid → clone valid structure`, note: "Response structure cloning" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="otp-brute" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">OTP Brute Force</h2>
        <PayloadList
          title="OTP Attack Payloads"
          initialShow={8}
          payloads={[
            { code: `TOTP: 000000-999999 (6 digit, 30s window)`, note: "1M combinations" },
            { code: `Rate limit bypass via IP rotation headers`, note: "X-Forwarded-For rotation" },
            { code: `Race condition: 1000 parallel requests with different codes`, note: "Concurrent brute force" },
            { code: `OTP valid for multiple time windows (>30s)`, note: "Extended validity" },
            { code: `Same OTP accepted multiple times`, note: "No single-use check" },
            { code: `OTP not locked after N failed attempts`, note: "No lockout" },
            { code: `Request new OTP → old OTP still valid`, note: "OTP not invalidated on new request" },
            { code: `TOTP clock skew: try codes from ±5 time windows`, note: "Time window expansion" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="backup-code" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Backup Code Attacks</h2>
        <PayloadList
          title="Backup Code Payloads"
          initialShow={6}
          payloads={[
            { code: `Backup codes visible in API response`, note: "Backup code leak" },
            { code: `Backup code brute force (often 8 chars, alphanumeric)`, note: "Brute force" },
            { code: `Backup code reuse → same code works multiple times`, note: "Replay" },
            { code: `Backup code not invalidated after use`, note: "No single-use" },
            { code: `Generate new backup codes → old ones still valid`, note: "Old codes not revoked" },
            { code: `Backup code in password reset flow`, note: "Reset flow bypass" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="disable-downgrade" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">2FA Disable / Downgrade</h2>
        <PayloadList
          title="Disable Payloads"
          initialShow={6}
          payloads={[
            { code: `PUT /api/user {"2fa_enabled":false}`, note: "Mass assignment 2FA disable" },
            { code: `Disable 2FA without current 2FA code`, note: "No verification to disable" },
            { code: `Disable 2FA without password confirmation`, note: "No password check" },
            { code: `CSRF → disable victim's 2FA`, note: "CSRF 2FA disable" },
            { code: `Password reset → 2FA automatically disabled`, note: "Reset removes 2FA" },
            { code: `OAuth login bypasses 2FA entirely`, note: "OAuth 2FA skip" },
            { code: `Remember device cookie → steal cookie → bypass 2FA`, note: "Trust cookie theft" },
            { code: `Change phone number without 2FA → new SMS target`, note: "Phone number swap" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Login sonrası 2FA sayfasını atlayarak doğrudan dashboard&apos;a gidin{"\n"}
        2. Boş/null/zero code deneyin{"\n"}
        3. Response body&apos;yi manipüle edin (false → true){"\n"}
        4. Rate limit kontrol edin (brute force mümkün mü){"\n"}
        5. Backup code davranışını test edin{"\n"}
        6. 2FA devre dışı bırakma flow&apos;unu inceleyin{"\n"}
        7. Farklı platformlarda (mobile/API) 2FA zorunluluğunu test edin
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/auth/password-reset" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Password Reset</span>
        </Link>
        <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
          Ana Sayfa
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}
