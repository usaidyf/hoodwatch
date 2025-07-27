import React from 'react'
import Navbar from '@/app/components/sections/navbar'
import Footer from '@/app/components/sections/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-3 md:p-5 lg:p-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}
