import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Remove keys that would clash with own props or with "as"
type MergeProps<
   C extends React.ElementType,
   P = {}
> = P &
   Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as'> & {
      as?: C;
   };

// Component‑specific props
type ButtonOwnProps = {
   children: React.ReactNode;
   className?: string;
};

// Public prop type (defaults to <button>)
export type ButtonProps<C extends React.ElementType = 'button'> =
   MergeProps<C, ButtonOwnProps>;


export default function Button<C extends React.ElementType = 'button'>(
   {
      as,
      children,
      className,
      ...rest
   }: ButtonProps<C>,
) {
   // fall back to an actual button if no "as" provided
   const Component = (as || 'button') as React.ElementType;

   return (
      <Component
         className={twMerge(
            clsx(
               'text-sm px-2.5 py-1.5',
               'md:text-base md:px-4 md:py-2',
               'flex items-center justify-between gap-2',
               'rounded-md text-white bg-primary hover:bg-primary-hover',
               'transition cursor-pointer',
               'disabled:cursor-not-allowed disabled:opacity-50',
            ),
            className,
         )}
         {...rest}
      >
         {children}
      </Component>
   );
}
