import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LA ROCKA SHOP',
  description: 'Created with love by La Rocka Shop',
  generator: 'La Rocka Shop',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
