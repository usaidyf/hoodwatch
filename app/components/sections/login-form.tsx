"use client";

import { authenticate } from '@/app/lib/actions';
import clsx from 'clsx';
import { ArrowRightIcon, AtSignIcon, CircleAlert, KeyRound } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useActionState } from 'react'
import { BasicLoaderInline } from '../reusables/basic-loader';
import Link from 'next/link';

export default function LoginForm() {
   const params = useSearchParams();
   const callbackUrl = params.get('callbackUrl') || '/';

   const [state, formAction, pending] = useActionState(
      authenticate,
      undefined,
   );

   const inputClassName = "peer block w-full rounded-md border border-gray-300 py-2 placeholder:text-gray-500 pl-10 pr-3";
   const iconClassName = "pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 left-3"

   return (
      <form action={formAction} className="space-y-3 flex-1 rounded-2xl bg-white border border-gray-300 px-6 pb-8 pt-6">
         <h1 className={`mb-1 text-2xl`}>
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
                     className={inputClassName}
                     id="email"
                     type="email"
                     name="email"
                     placeholder={"Your email here"}
                     required
                     defaultValue={state?.formData?.email || ""}
                  />
                  <AtSignIcon className={iconClassName} />
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
                     className={inputClassName}
                     id="password"
                     type="password"
                     name="password"
                     placeholder={"Your password here"}
                     required
                     defaultValue={state?.formData?.password || ""}
                     minLength={6}
                  />
                  <KeyRound className={iconClassName} />
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
