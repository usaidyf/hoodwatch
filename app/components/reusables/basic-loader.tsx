"use client";

import { LoaderCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export default function BasicLoader({ className }: { className?: { icon?: string, container?: string } }) {
   return (
      <div className={twMerge('w-full flex items-center justify-center py-4', className?.container)}>
         <LoaderCircle className={twMerge('animate-spin', className?.icon)} />
      </div>
   )
}
