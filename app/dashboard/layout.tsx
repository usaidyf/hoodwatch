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
            <div className="flex items-center gap-1">
               <Link href='/dashboard/create' className='px-2.5 text-sm bg-primary-hover transition hover:text-red-100 rounded-md cursor-pointer py-1.5'>
                  Add Issue
               </Link>
               <LogoutButton />
            </div>
         </div>
         <div className="container mx-auto p-3 md:p-5 lg:p-8">
            {children}
         </div>
      </div>
   )
}
