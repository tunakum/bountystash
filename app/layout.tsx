import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: 'BountyStash | Güvenlik Zafiyetleri Dokümantasyonu',
  description: 'Web, API ve AI güvenlik zafiyetleri için kapsamlı Türkçe dokümantasyon. XSS, SQL Injection, Prompt Injection payload ve bypass teknikleri.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" className={`dark ${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-3 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground">
          Skip to content
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
