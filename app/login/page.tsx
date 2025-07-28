import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import BasicLoader from '../components/reusables/basic-loader'
import LoginForm from '../components/sections/login-form'

export default function LoginPage() {
   return (
      <main className="flex items-center justify-center min-h-screen p-3">
         <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
            <div className="h-24 w-full rounded-2xl bg-white md:h-32">
               <Link href="/" className="w-full h-full bg-primary/30 items-center justify-center flex rounded-2xl p-3">
                  <Image className="w-14 sm:w-16 md:w-18" src='/logo.png' alt="logo" width={1080} height={1080} />
               </Link>
            </div>
            <Suspense fallback={<BasicLoader />}>
               <LoginForm />
            </Suspense>
         </div>
      </main>
   )
}
