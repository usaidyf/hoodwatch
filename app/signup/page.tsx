"use client";

import { ArrowRightIcon, AtSignIcon, CircleAlert, KeyRound, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useActionState, useEffect } from 'react'
import { authFormIcon, authFormInput } from '@/app/lib/classnames'
import { BasicLoaderInline } from '../components/reusables/basic-loader'
import clsx from 'clsx'
import { createAccount } from '@/app/lib/actions'
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export default function SignupPage() {
   const [state, formAction, pending] = useActionState(
      createAccount,
      undefined,
   );

   useEffect(() => {
      if (state !== undefined && 'ok' in state && state.ok === true) {
         toast.success("Account created successfully")
         redirect('/login')
      }
   }, [state?.ok])

   return (
      <main className="flex items-center justify-center min-h-screen p-2">
         <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2">
            <div className="h-24 w-full rounded-2xl bg-white md:h-32">
               <Link href="/" className="w-full h-full bg-primary/30 items-center justify-center flex rounded-2xl p-3">
                  <Image className="w-14 sm:w-16 md:w-18" src='/logo.png' alt="logo" width={1080} height={1080} />
               </Link>
            </div>
            <form action={formAction} className="space-y-3 flex-1 rounded-2xl bg-white border border-gray-300 px-6 pb-8 pt-6">
               <h1 className={`text-2xl`}>
                  Create an Account
               </h1>

               <div className="w-full text-sm space-y-2">
                  <div>
                     <label
                        className="mb-1.5 block font-medium text-gray-900"
                        htmlFor="full_name"
                     >
                        Full Name
                     </label>
                     <div className="relative">
                        <input
                           className={authFormInput}
                           id="full_name"
                           type="text"
                           name="full_name"
                           placeholder={"Your full name"}
                           required
                           defaultValue={state?.formData?.email || ""}
                        />
                        <UserIcon className={authFormIcon} />
                     </div>
                     <span className='text-red-500 text-xs'>{state?.fieldErrors?.full_name ?? ''}</span>
                  </div>
                  <div>
                     <label
                        className="mb-1.5 block font-medium text-gray-900"
                        htmlFor="email"
                     >
                        Email
                     </label>
                     <div className="relative">
                        <input
                           className={authFormInput}
                           id="email"
                           type="email"
                           name="email"
                           placeholder={"Your email here"}
                           required
                           defaultValue={state?.formData?.email || ""}
                        />
                        <AtSignIcon className={authFormIcon} />
                     </div>
                     <span className='text-red-500 text-xs'>{state?.fieldErrors?.email ?? ''}</span>
                  </div>
                  <div>
                     <label
                        className="mb-1.5 block font-medium text-gray-900"
                        htmlFor="password"
                     >
                        Password
                     </label>
                     <div className="relative">
                        <input
                           className={authFormInput}
                           id="password"
                           type="password"
                           name="password"
                           placeholder={"Create a strong password"}
                           required
                           defaultValue={state?.formData?.password || ""}
                           minLength={8}
                        />
                        <KeyRound className={authFormIcon} />
                     </div>
                     <span className='text-red-500 text-xs'>{state?.fieldErrors?.password ?? ''}</span>
                  </div>
               </div>
               <div
                  className={clsx("flex gap-2 items-center px-2 rounded-lg py-2 min-h-9 text-red-500", { "bg-red-100": !!state })}
                  aria-live="polite"
                  aria-atomic="true"
               >
                  {state?.error && (
                     <>
                        <CircleAlert className="h-5 w-5" />
                        <p className="text-sm">{state.error}</p>
                     </>
                  )}
               </div>
               <button disabled={pending} className="mt- w-full bg-primary hover:bg-primary-hover active:bg-primary-hover rounded-lg text-white cursor-pointer transition flex items-center justify-center px-4 py-2 disabled:bg-primary/40 disabled:cursor-not-allowed">
                  Create account
                  {pending ? <BasicLoaderInline className='ml-auto w-5 text-white' /> : <ArrowRightIcon className="ml-auto w-5" />}
               </button>
               <Link href='/login' className='text-sm text-center text-primary hover:underline block'>
                  Already a member?
               </Link>
            </form>
         </div>
      </main>
   )
}
