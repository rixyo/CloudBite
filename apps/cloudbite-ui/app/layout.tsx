import type { Metadata } from 'next'
import './globals.css'
import TopNavigation from '@/components/navbar/top-navigation'



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
        <div className=' bg-gray-200 p-3  w-full'>

        <TopNavigation/>
        </div>
        {children}
      </body>
    </html>
  )
}
