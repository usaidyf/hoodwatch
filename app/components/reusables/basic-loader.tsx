"use client";

import { LoaderCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export default function BasicLoader({ className }: { className?: { icon?: string, container?: string } }) {
   return (
      <div className={twMerge('w-full flex items-center justify-center py-4', className?.container)}>
         <BasicLoaderInline className={className?.icon} />
      </div>
   )
}

export function BasicLoaderInline({ className }: { className?: string }) {
   return (
      <LoaderCircle className={twMerge('text-gray-600 animate-[spin_600ms_linear_infinite]', className)} />
   )
}