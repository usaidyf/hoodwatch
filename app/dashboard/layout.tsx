import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <h1>Dashboard</h1>
         <div className="container mx-auto p-3 md:p-5 lg:p-8">
            {children}
         </div>
      </div>
   )
}
