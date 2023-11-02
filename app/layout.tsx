import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProviders'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>

        <SupabaseProvider>

          <UserProvider>

            {/* it is self-closing tab, it doesn't need to wrap any children inside of it. */}
            <ModalProvider />

            <Sidebar>
              {children}
            </Sidebar>

          </UserProvider>

        </SupabaseProvider>

      </body>
    </html>
  )
}
