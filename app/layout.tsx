import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Luckiest_Guy } from 'next/font/google'
import { BingoBackground } from '@/components/bingo-background'
import './globals.css'

const luckiest = Luckiest_Guy({
  variable: '--font-luckiest',
  subsets: ['latin'],
  weight: ['400'],
})
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Bingo',
  description:
    'Sistema de bingo animado para festas, eventos e comemorações.',
  icons: {
    icon: '/icon.svg',
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1f38',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${luckiest.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <BingoBackground>{children}</BingoBackground>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
