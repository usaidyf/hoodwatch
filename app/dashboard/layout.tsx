import React from 'react'
import LogoutButton from './logout-button';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className='p-1'>
         <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-primary text-gray-50">
            <Link href='/' className="flex gap-1">
               <Image alt='logo' className='w-9 md:w-10' src='/logo-neutral.png' width={1080} height={1080} />
               <h1 className='text-xl font-bold mt-1'>Dashboard</h1>
            </Link>
            <LogoutButton />
         </div>
         <div className="container mx-auto p-3 md:p-5 lg:p-8">
            {children}
         </div>
      </div>
   )
}
