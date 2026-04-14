# BountyStash

Türkçe güvenlik zafiyetleri dokümantasyonu. Web, API ve AI/LLM güvenlik açıkları için kapsamlı payload koleksiyonu ve bypass teknikleri.

[Demo](https://bountystash.vercel.app) | [Katkıda Bulun](#katkıda-bulunma)

---

## Özellikler

- **Web Zafiyetleri** - XSS, SQL Injection, CSRF, SSRF, XXE, Deserialization, File Upload
- **API Zafiyetleri** - BOLA/IDOR, Broken Auth, Mass Assignment, GraphQL, REST
- **AI/LLM Zafiyetleri** - OWASP LLM Top 10, Prompt Injection, Jailbreaking, Data Poisoning
- **Injection Türleri** - Command, LDAP, NoSQL, SSTI, Header Injection
- **Authentication** - OAuth, JWT, Session, Password Reset, 2FA Bypass

## Neden BountyStash?

- Türkçe içerik - Tüm açıklamalar ve dipnotlar Türkçe
- Geniş payload koleksiyonu - Her kategori için 100+ payload
- Kopyala-yapıştır - Tek tıkla payload kopyalama
- WAF bypass teknikleri - Gerçek dünya senaryoları
- Modern UI - Linear.app tarzı premium arayüz

## Teknolojiler

- [Next.js 16](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animasyonlar
- [shadcn/ui](https://ui.shadcn.com/) - UI bileşenleri

## Kurulum

```bash
# Repoyu klonla
git clone https://github.com/tunakum/BountyStash.git
cd BountyStash

# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

## Proje Yapısı

```
BountyStash/
├── app/
│   ├── docs/
│   │   ├── web/          # Web zafiyetleri (XSS, SQLi, vb.)
│   │   ├── api/          # API zafiyetleri (BOLA, IDOR, vb.)
│   │   ├── ai/           # AI/LLM zafiyetleri
│   │   ├── injection/    # Injection türleri
│   │   └── auth/         # Authentication zafiyetleri
│   └── page.tsx          # Ana sayfa
├── components/
│   ├── docs/             # Dokümantasyon bileşenleri
│   └── ui/               # shadcn/ui bileşenleri
└── public/               # Statik dosyalar
```

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Yeni payload eklemek, hata düzeltmek veya çeviri yapmak için:

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-payload`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni XSS payload eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-payload`)
5. Pull Request açın

### Payload Ekleme

Payload eklerken şu formata uyun:

```typescript
{
  code: "<script>alert(1)</script>",
  note: "Temel XSS payload'ı, çoğu WAF tarafından engellenir"
}
```

- `code`: Payload kodu (escape edilmeden)
- `note`: Türkçe açıklama veya ipucu (opsiyonel)

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## İletişim

- GitHub: [@tunakum](https://github.com/tunakum)
- Proje: [BountyStash](https://github.com/tunakum/BountyStash)

---

**Uyarı:** Bu dokümantasyon yalnızca eğitim amaçlıdır. Payloadları yalnızca izinli sistemlerde ve yasal bug bounty programlarında kullanın.
