"use client";

import { authenticate } from '@/app/lib/actions';
import clsx from 'clsx';
import { ArrowRightIcon, AtSignIcon, CircleAlert, KeyRound } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useActionState } from 'react'
import { BasicLoaderInline } from '../reusables/basic-loader';
import Link from 'next/link';
import { authFormIcon, authFormInput } from '@/app/lib/classnames';

export default function LoginForm() {
   const params = useSearchParams();
   const callbackUrl = params.get('callbackUrl') || '/';

   const [state, formAction, pending] = useActionState(
      authenticate,
      undefined,
   );


   return (
      <form action={formAction} className="space-y-3 flex-1 rounded-2xl bg-white border border-gray-300 px-6 pb-8 pt-6">
         <h1 className={`text-2xl`}>
            Login to Your Account
         </h1>

         <div className="w-full text-sm">
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
            </div>
            <div className="mt-3">
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
                     placeholder={"Your password here"}
                     required
                     defaultValue={state?.formData?.password || ""}
                     minLength={8}
                  />
                  <KeyRound className={authFormIcon} />
               </div>
            </div>
         </div>
         <input type="hidden" name="redirectTo" value={callbackUrl} />
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
            Log in
            {pending ? <BasicLoaderInline className='ml-auto w-5 text-white' /> : <ArrowRightIcon className="ml-auto w-5" />}
         </button>
         <Link href='/signup' className='text-sm text-center text-primary hover:underline block'>
            Create an account?
         </Link>
      </form>
   )
}
