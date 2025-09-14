import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import ClientOnly from '../components/ClientOnly'

export const metadata: Metadata = {
  title: 'Torry Anchor - Fresh Meat Delivery',
  description: 'Fresh meat and seafood delivery at your doorstep. Quality guaranteed.',
  keywords: 'meat delivery, fresh meat, seafood, fish, chicken, mutton, online meat store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="font-poppins">
        <ClientOnly>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  )
} 