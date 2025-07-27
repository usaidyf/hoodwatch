import { Input, Label, Select, Textarea } from "@headlessui/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function FormLabel({ children, className = "", requiredLabel = false }: { children: ReactNode, className?: string, requiredLabel?: boolean }) {
   return (
      <Label className={twMerge("font-medium text-sm md:text-base inline-block", className)}>
         {children} {requiredLabel && <span className='font-bold text-red-600'>*</span>}
      </Label>
   )
}

export function FormInput({ className, errorMessage, ...props }: ComponentPropsWithoutRef<'input'> & { errorMessage?: string }) {
   return (
      <>
         <Input
            className={twMerge(
               'mt-1.5 block w-full rounded-md border transition border-gray-300 bg-white px-3 py-1.5',
               'outline-none data-focus:border-primary',
               className,
               !!errorMessage && 'border-red-500 focus:border-red-500'
            )}
            {...props}
         />
         {errorMessage && <div className="mt-0.5 text-red-600 text-xs">{errorMessage}</div>}
      </>
   )
}

export function FormTextArea({ className, rows = 3, errorMessage, ...props }: ComponentPropsWithoutRef<'textarea'> & { errorMessage?: string }) {
  return (
    <>
      <Textarea
        rows={rows}
        className={twMerge(
          'mt-1 md:mt-1.5 block w-full rounded-md border transition border-gray-300 bg-white px-3 py-1.5',
          'outline-none data-focus:border-primary',
          className,
          !!errorMessage && 'border-red-500 focus:border-red-500'
        )}
        {...props}
      />
      {!!errorMessage && <div className="mt-0.5 text-red-600 text-xs">{errorMessage}</div>}
    </>
  )
}

export function FormSelect({ className, children, errorMessage, ...props }: ComponentPropsWithoutRef<'select'> & { errorMessage?: string }) {
   return (
      <>
         <Select
            className={twMerge(
               'mt-1.5 block w-full rounded-md border transition border-gray-300 bg-white px-3 py-1.5',
               'outline-none data-focus:border-primary data-active:border-primary',
               className,
               !!errorMessage && 'border-red-500 focus:border-red-500'
            )}
            {...props}
         >
            {children}
         </Select>
         {!!errorMessage && <div className="mt-0.5 text-red-600 text-xs">{errorMessage}</div>}
      </>
   )
}