import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Providers from "./Providers"
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Videogames API',
  description: 'Basic demostration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen mx-auto flex flex-col">
        <Providers>
          <Navbar />
          <div className='flex-1'>
            {children}
          </div>
          <Footer />
        </Providers>
        </body>
    </html>
  )
}
