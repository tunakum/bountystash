export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface NavGroup {
  id: string
  category: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    id: "web",
    category: "Web Zafiyetleri",
    items: [
      { title: "XSS (Cross-Site Scripting)", href: "/docs/web/xss", description: "Reflected, Stored ve DOM XSS türleri" },
      { title: "SQL Injection", href: "/docs/web/sql-injection", description: "Union, Blind ve Error-based SQLi teknikleri" },
      { title: "CSRF", href: "/docs/web/csrf", description: "Cross-Site Request Forgery saldırıları" },
      { title: "SSRF", href: "/docs/web/ssrf", description: "Server-Side Request Forgery açıkları" },
      { title: "XXE Injection", href: "/docs/web/xxe", description: "XML External Entity zafiyetleri" },
      { title: "Insecure Deserialization", href: "/docs/web/deserialization", description: "Güvensiz deserialization zafiyetleri" },
      { title: "File Upload", href: "/docs/web/file-upload", description: "Dosya yükleme zafiyetleri" },
    ],
  },
  {
    id: "api",
    category: "API Zafiyetleri",
    items: [
      { title: "BOLA / IDOR", href: "/docs/api/bola-idor", description: "Yetkilendirme atlatma açıkları" },
      { title: "Broken Authentication", href: "/docs/api/broken-auth", description: "Kırık kimlik doğrulama" },
      { title: "BOPLA", href: "/docs/api/bopla", description: "Broken Object Property Level Authorization" },
      { title: "Mass Assignment", href: "/docs/api/mass-assignment", description: "Toplu atama zafiyetleri" },
      { title: "Rate Limiting", href: "/docs/api/rate-limiting", description: "Hız sınırlama zafiyetleri" },
      { title: "GraphQL Security", href: "/docs/api/graphql", description: "GraphQL güvenlik açıkları" },
      { title: "REST API Security", href: "/docs/api/rest", description: "REST API güvenlik açıkları" },
    ],
  },
  {
    id: "ai",
    category: "AI / LLM Zafiyetleri",
    items: [
      { title: "OWASP LLM Top 10", href: "/docs/ai/owasp-llm-top-10", description: "LLM güvenlik riskleri özeti" },
      { title: "Prompt Injection", href: "/docs/ai/prompt-injection", description: "Doğrudan ve dolaylı prompt enjeksiyonu" },
      { title: "Jailbreaking", href: "/docs/ai/jailbreaking", description: "LLM kısıtlamalarını aşma teknikleri" },
      { title: "Data Poisoning", href: "/docs/ai/data-poisoning", description: "Veri zehirleme saldırıları" },
      { title: "Model Theft", href: "/docs/ai/model-theft", description: "Model hırsızlığı saldırıları" },
      { title: "Insecure Output", href: "/docs/ai/insecure-output", description: "Güvensiz çıktı işleme" },
    ],
  },
  {
    id: "injection",
    category: "Injection Zafiyetleri",
    items: [
      { title: "Command Injection", href: "/docs/injection/command", description: "Komut enjeksiyonu açıkları" },
      { title: "LDAP Injection", href: "/docs/injection/ldap", description: "LDAP enjeksiyon saldırıları" },
      { title: "NoSQL Injection", href: "/docs/injection/nosql", description: "NoSQL veritabanı enjeksiyonu" },
      { title: "Template Injection (SSTI)", href: "/docs/injection/ssti", description: "Server-Side Template Injection" },
      { title: "Header Injection", href: "/docs/injection/header", description: "HTTP header enjeksiyonu" },
    ],
  },
  {
    id: "auth",
    category: "Authentication",
    items: [
      { title: "OAuth Vulnerabilities", href: "/docs/auth/oauth", description: "OAuth protokol açıkları" },
      { title: "JWT Attacks", href: "/docs/auth/jwt", description: "JWT token saldırıları" },
      { title: "Session Management", href: "/docs/auth/session", description: "Oturum yönetimi zafiyetleri" },
      { title: "Password Reset Flaws", href: "/docs/auth/password-reset", description: "Şifre sıfırlama açıkları" },
      { title: "2FA Bypass", href: "/docs/auth/2fa-bypass", description: "İki faktörlü doğrulama atlatma" },
    ],
  },
]

export const searchData = navGroups.flatMap((group) =>
  group.items.map((item) => ({
    title: item.title,
    href: item.href,
    category: group.category,
    description: item.description,
  }))
)

export const breadcrumbMap: Record<string, [string, string]> = Object.fromEntries(
  navGroups.flatMap((group) =>
    group.items.map((item) => [item.href, [group.category, item.title] as [string, string]])
  )
)
