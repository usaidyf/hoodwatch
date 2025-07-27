import React from 'react'
import LogoutButton from './logout-button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <h1>Dashboard</h1>
         <LogoutButton />
         <div className="container mx-auto p-3 md:p-5 lg:p-8">
            {children}
         </div>
      </div>
   )
}
