import type { Metadata } from 'next'
import './globals.css'
import TopNavigation from '@/components/navbar/top-navigation'
import MobileBottomNavigation from '@/components/navbar/mobilte-bottom-navigation'
import MobileTopBar from '@/components/navbar/mobile-topbar'
import TabTopbar from '@/components/navbar/tab-topbar'
import AuthModalProvider from '@/providers/auth-modal-provider'
import { AuthModalContextProvider } from '@/context/AuthModalContext'



export const metadata: Metadata = {
  title: 'CloudBite: A Cloud-Native Food Delivery Experience​',
  description: 'CloudBite: A Cloud-Native Food Delivery Experience​',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthModalContextProvider>
          <div className=" bg-gray-200 p-3 w-full">
            <TopNavigation />
            <MobileBottomNavigation />
            <MobileTopBar />
            <TabTopbar />
          </div>
          <AuthModalProvider />
          {children}
        </AuthModalContextProvider>
      </body>
    </html>
  );
}
