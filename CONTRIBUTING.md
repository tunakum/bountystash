# BountyStash'e Katkıda Bulunma Rehberi

BountyStash'i geliştirmek için zaman ayırdığınız için teşekkür ederiz! 

Lütfen katkıda bulunmadan önce aşağıdaki adımları ve kuralları okuyun.

## Kurulum ve Geliştirme Ortamı

Projeyi kendi bilgisayarınızda (lokal ortamda) çalıştırmak ve değişiklik yapmak için şu adımları izleyin:

1. **Repoyu Forklayın:** GitHub üzerinden bu repoyu kendi hesabınıza "Fork" edin.
2. **Klonlayın:** Forkladığınız repoyu bilgisayarınıza indirin.
   ```bash
   https://github.com/KULLANICI_ADINIZ/bountystash.git
   cd bountystash
   ```
3. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```
4. **Sunucuyu Başlatın:**
   ```bash
   npm run dev
   ```
   *Tarayıcınızda `http://localhost:3000` adresine giderek projeyi canlı olarak görebilirsiniz.*

## Katkı Süreci (Pull Request Açmak)

1. **Yeni Bir Dal (Branch) Oluşturun:** Yapacağınız özelliğe veya ekleyeceğiniz payload'a uygun isimlendirilmiş bir dal açın.
   ```bash
   git checkout -b feature/xss-payloadlari
   ```
2. **Değişikliklerinizi Yapın ve Commit Edin:** Anlamlı commit mesajları kullanmaya özen gösterin.
   ```bash
   git commit -m "feat: bypass WAF için yeni XSS payload'ları eklendi"
   ```
3. **Kendi Reponuza Gönderin (Push):**
   ```bash
   git push origin feature/xss-payloadlari
   ```
4. **Pull Request (PR) Açın:** GitHub üzerinden orijinal BountyStash reposuna bir Pull Request gönderin.

## Payload Ekleme Standartları

Yeni bir zafiyet örneği veya payload eklerken lütfen aşağıdaki yapıyı koruyun:

```typescript
{
  code: "\"><script src=data:&comma;alert(1)//",
  note: "Cloudflare WAF bypass için virgül (comma) encoding tekniği."
}
```

* **`code`:** Eklediğiniz payload'ın ham hali. Çalışmaya hazır olmalıdır.
* **`note`:** (Zorunlu) Bu payload'ın ne işe yaradığı, hangi durumlarda kullanıldığı veya hangi WAF'ı atlattığına dair **Türkçe**, kısa ve öz bir açıklama.

## Onay Süreci

Gönderdiğiniz Pull Request'ler (PR), proje yöneticisi tarafından incelenir. Payload'ların tekrara düşmemesi, açıklamaların anlaşılır olması ve kodun yapıyı bozmaması durumunda onaylanarak (Merge) ana projeye dahil edilir.

Tekrar teşekkürler!