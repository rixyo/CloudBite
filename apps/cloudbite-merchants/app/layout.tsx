import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthModalProvider from '@/providers/auth-modal-provider'
import { Providers } from '@/providers/graqhql-provider'
import StoreModalProvider from '@/providers/store-modal-provider'
import WalletModalProvider from '@/providers/wallet-modal-provider'
import SecretKeyModalProvider from '@/providers/secretkey-modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CloudBite Merchants',
  description: 'CloudBite Merchants is a platform for merchants to sell their products online.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <AuthModalProvider />
        <StoreModalProvider />
        <WalletModalProvider />
        <SecretKeyModalProvider />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
      </Providers>
    </html>
  );
}
