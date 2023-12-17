
import './globals.css'
import TopNavigation from '@/components/navbar/top-navigation'
import MobileBottomNavigation from '@/components/navbar/mobilte-bottom-navigation'
import MobileTopBar from '@/components/navbar/mobile-topbar'
import TabTopbar from '@/components/navbar/tab-topbar'
import AuthModalProvider from '@/providers/auth-modal-provider'
import { Providers } from '@/providers/graqhql-provider'
import { Metadata } from 'next'
import { Toaster } from "react-hot-toast";
import PreviewModalProvider from '@/providers/preview-modal-provider'
export const metadata: Metadata = {
  title: "CloudBite: A Cloud-Native Food Delivery Experience​",
  description: "CloudBite: A Cloud-Native Food Delivery Experience​",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <Providers>
      <body>
        <div className=" bg-gray-200 p-3 w-full">
          <TopNavigation />
          <MobileTopBar />
          <TabTopbar />
        </div>
        <AuthModalProvider />
    <PreviewModalProvider/>
          {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
        </Providers>
    </html>
  );
}
