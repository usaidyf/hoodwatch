import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import BasicLoader from '../components/reusables/basic-loader'
import LoginForm from '../components/sections/login-form'

export default function LoginPage() {
   return (
      <main className="flex items-center justify-center md:h-screen">
         <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
            <div className="h-24 w-full rounded-2xl bg-white md:h-32">
               <Link href="/" className="w-full h-full bg-primary/30 items-center justify-center flex rounded-2xl p-3">
                  <Image className="w-16 sm:w-18 md:w-16" src='/logo.png' alt="logo" width={64} height={64} />
               </Link>
            </div>
            <Suspense fallback={<BasicLoader />}>
               <LoginForm />
            </Suspense>
         </div>
      </main>
   )
}
