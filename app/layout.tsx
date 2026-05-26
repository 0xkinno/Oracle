import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ORACLE — Autonomous DeFi Intelligence Terminal',
  description: 'Five specialized AI agents deliver real-time DeFi intelligence: risk scoring, alpha signals, liquidity forensics, on-chain detective work, and macro strategy — all in one verdict.',
  keywords: 'DeFi, Solana, AI agents, crypto intelligence, risk analysis, ORACLE',
  openGraph: {
    title: 'ORACLE — Autonomous DeFi Intelligence Terminal',
    description: 'Five AI agents. One verdict. Real-time DeFi intelligence on any Solana token or wallet.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0A0F1E" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}