import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Caio Fochetto | Creator Economy & Performance Marketing Leader',
  description:
    '15+ years connecting brand, culture, and performance through creators and data. Former Director at Octagon, Jellysmack LATAM Lead. Expertise in influencer marketing, digital strategy, and brand building for global companies.',
  keywords: [
    'Creator Economy',
    'Performance Marketing',
    'Influencer Marketing',
    'Brand Strategy',
    'Digital Marketing',
    'LATAM',
    'Marketing Director',
    'Caio Fochetto',
  ],
  openGraph: {
    title: 'Caio Fochetto | Creator Economy & Performance Marketing Leader',
    description:
      '15+ years connecting brand, culture, and performance through creators and data.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caio Fochetto | Creator Economy & Performance Marketing Leader',
    description:
      '15+ years connecting brand, culture, and performance through creators and data.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
