"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, DollarSign, Shield, Users, Trophy, Target } from "lucide-react"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "tanim", title: "Tanım", level: 2 },
  { id: "nasil-calisir", title: "Nasıl Çalışır?", level: 2 },
  { id: "avantajlar", title: "Avantajlar", level: 2 },
  { id: "platformlar", title: "Popüler Platformlar", level: 2 },
  { id: "odul-miktarlari", title: "Ödül Miktarları", level: 2 },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const platforms = [
  {
    name: "HackerOne",
    description: "Dünyanın en büyük bug bounty platformu",
    programs: "2000+",
  },
  {
    name: "Bugcrowd",
    description: "Kurumsal odaklı güvenlik platformu",
    programs: "1000+",
  },
  {
    name: "Intigriti",
    description: "Avrupa merkezli bug bounty platformu",
    programs: "500+",
  },
  {
    name: "YesWeHack",
    description: "Fransız menşeli global platform",
    programs: "300+",
  },
]

const rewards = [
  { severity: "Critical", range: "$10,000 - $100,000+", color: "bg-red-500/20 text-red-400" },
  { severity: "High", range: "$3,000 - $15,000", color: "bg-orange-500/20 text-orange-400" },
  { severity: "Medium", range: "$500 - $3,000", color: "bg-yellow-500/20 text-yellow-400" },
  { severity: "Low", range: "$100 - $500", color: "bg-green-500/20 text-green-400" },
]

export default function BugBountyNedirPage() {
  return (
    <>
      <TableOfContents items={tocItems} />
      
      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="prose prose-invert max-w-none"
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="mb-8">
          <Link 
            href="/docs" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dokümantasyon
          </Link>
          
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Başlangıç</span>
          </div>
          
          <h1 id="tanim" className="text-4xl font-bold text-foreground mb-4 scroll-mt-20">
            Bug Bounty Nedir?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Bug bounty programları, şirketlerin güvenlik araştırmacılarını güvenlik 
            açıklarını bulmaya teşvik ettiği ve karşılığında ödüllendirdiği bir 
            sistemdir.
          </p>
        </motion.div>

        {/* Definition */}
        <motion.section variants={fadeIn}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bug bounty, kelime anlamıyla &quot;böcek ödülü&quot; demektir. Yazılım dünyasında 
            &quot;bug&quot; (böcek) terimi, programlardaki hataları ifade eder. Bug bounty 
            programları, bu hataları bulan kişilere maddi ödül vererek güvenlik 
            açıklarının kötü niyetli kişiler tarafından keşfedilmeden önce 
            tespit edilmesini amaçlar.
          </p>

          <Callout type="info" title="Tarihçe">
            İlk bug bounty programı 1995 yılında Netscape tarafından başlatılmıştır. 
            Bugün Fortune 500 şirketlerinin çoğu bug bounty programı yürütmektedir.
          </Callout>
        </motion.section>

        {/* How it works */}
        <motion.section variants={fadeIn}>
          <h2 id="nasil-calisir" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Nasıl Çalışır?
          </h2>

          <div className="not-prose space-y-4 mb-6">
            {[
              {
                step: "01",
                title: "Programa Katılım",
                desc: "Bug bounty platformuna kaydolun ve ilgilendiğiniz programı seçin.",
                icon: Users,
              },
              {
                step: "02",
                title: "Kuralları İncele",
                desc: "Programın scope'unu, kapsam dışı alanları ve kuralları dikkatlice okuyun.",
                icon: BookOpen,
              },
              {
                step: "03",
                title: "Test ve Keşif",
                desc: "İzin verilen kapsamda güvenlik testleri yapın ve açıkları tespit edin.",
                icon: Target,
              },
              {
                step: "04",
                title: "Rapor Gönder",
                desc: "Bulduğunuz açığı detaylı bir şekilde raporlayın.",
                icon: Shield,
              },
              {
                step: "05",
                title: "Ödül Al",
                desc: "Geçerli açıklar için şirket tarafından ödüllendirilirsiniz.",
                icon: Trophy,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card group hover:bg-secondary/20 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Advantages */}
        <motion.section variants={fadeIn}>
          <h2 id="avantajlar" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Avantajlar
          </h2>

          <div className="not-prose grid gap-4 md:grid-cols-2 mb-6">
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Finansal Kazanç</h3>
              <p className="text-sm text-muted-foreground">
                Kritik açıklar için yüksek ödüller. Bazı araştırmacılar yılda 
                $1M+ kazanmaktadır.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <BookOpen className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Sürekli Öğrenme</h3>
              <p className="text-sm text-muted-foreground">
                Her hedef yeni teknolojiler ve güvenlik konseptleri öğretir.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Global Topluluk</h3>
              <p className="text-sm text-muted-foreground">
                Dünya çapında binlerce araştırmacıyla bağlantı kurma imkanı.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <Target className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Esnek Çalışma</h3>
              <p className="text-sm text-muted-foreground">
                İstediğiniz zaman, istediğiniz yerden çalışma özgürlüğü.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Platforms */}
        <motion.section variants={fadeIn}>
          <h2 id="platformlar" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Popüler Platformlar
          </h2>

          <div className="not-prose space-y-3 mb-6">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card hover:bg-secondary/20 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-foreground">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{platform.programs}</div>
                  <div className="text-xs text-muted-foreground">program</div>
                </div>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Başlangıç İçin">
            İlk başlayanlar için HackerOne&apos;daki VDP (Vulnerability Disclosure Program) 
            programları önerilir. Bu programlar ödül sunmasa da pratik kazanmak için idealdir.
          </Callout>
        </motion.section>

        {/* Rewards */}
        <motion.section variants={fadeIn}>
          <h2 id="odul-miktarlari" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">
            Ödül Miktarları
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Ödül miktarları açığın şiddetine, programa ve şirkete göre değişir.
            İşte genel bir ödül skalası:
          </p>

          <div className="not-prose rounded-lg border border-border/50 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left p-3 text-foreground font-semibold">Şiddet</th>
                  <th className="text-left p-3 text-foreground font-semibold">Ödül Aralığı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {rewards.map((row) => (
                  <tr key={row.severity} className="hover:bg-secondary/30">
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${row.color}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="p-3 text-foreground font-mono">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="Önemli Not">
            Ödül miktarları programa göre büyük farklılıklar gösterebilir. 
            Her zaman programın ödül tablosunu kontrol edin.
          </Callout>
        </motion.section>

        {/* Navigation */}
        <motion.div variants={fadeIn} className="flex items-center justify-between pt-8 mt-8 border-t border-border/50 not-prose">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Giriş</span>
          </Link>
          <Link
            href="/docs/giris/nasil-baslanir"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Nasıl Başlanır?</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}
