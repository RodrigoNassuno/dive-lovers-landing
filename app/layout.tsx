import type { Metadata } from 'next'
import { Quicksand, Afacad } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import SchemaOrg from '@/components/SchemaOrg'
import Analytics from '@/components/Analytics'
import ScrollTracker from '@/components/ScrollTracker'
import OceanBackground from '@/components/OceanBackground'
import Navbar from '@/components/Navbar'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['400', '500', '600', '700'],
})

const afacad = Afacad({
  subsets: ['latin'],
  variable: '--font-afacad',
  weight: ['400', '500', '600', '700'],
  // Silencia o warning "Failed to find font override values for font Afacad"
  // sem afetar o visual — a fonte carrega normalmente, apenas sem ajuste de fallback automático
  adjustFontFallback: false,
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://divelovers.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: 'Curso de Mergulho em São Sebastião | Open Water SSI em 3 dias | DiveLovers',
  description:
    'Escola de mergulho em São Sebastião/SP. Curso Open Water SSI: 3 dias, 4 mergulhos no mar, certificação internacional válida no mundo todo. Piscina exclusiva 3m + hospedagem própria.',

  keywords: [
    'curso de mergulho São Sebastião',
    'Open Water Diver',
    'certificação SSI',
    'mergulho Ilhabela',
    'escola de mergulho litoral norte SP',
    'mergulho São Sebastião SP',
    'curso mergulho 3 dias',
    'DiveLovers',
    'mergulho Pontal da Cruz',
  ],

  authors: [{ name: 'DiveLovers' }],
  creator: 'DiveLovers',
  publisher: 'DiveLovers',

  alternates: {
    canonical: BASE_URL, // TODO: trocar pelo domínio real
  },

  openGraph: {
    title: 'Em 3 dias, você é mergulhador certificado | DiveLovers',
    description:
      'Curso Open Water SSI em São Sebastião/SP. 3 dias, 4 mergulhos no mar, certificação internacional. Piscina exclusiva 3m, hospedagem própria, operação em Ilhabela.',
    url: BASE_URL, // TODO: trocar pelo domínio real
    siteName: 'DiveLovers',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DiveLovers — Curso Open Water SSI em São Sebastião/SP',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Em 3 dias, você é mergulhador certificado | DiveLovers',
    description:
      'Curso Open Water SSI em São Sebastião/SP. 3 dias, 4 mergulhos no mar, certificação SSI internacional.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  // Geo tags para São Sebastião/SP (usadas por mecanismos de busca locais)
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'São Sebastião, SP',
    'geo.position': '-23.804;-45.413',
    ICBM: '-23.804, -45.413',
  },

  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${quicksand.variable} ${afacad.variable}`}>
      <body>
        <SchemaOrg />
        <Analytics />
        <SmoothScroll />
        <ScrollTracker />
        <OceanBackground />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
