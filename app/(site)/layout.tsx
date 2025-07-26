import React from 'react'
import Navbar from '@/app/components/sections/navbar'
import Footer from '@/app/components/sections/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
