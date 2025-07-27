import React from 'react'
import { ThumbsUp } from 'lucide-react'
import clsx from 'clsx'

export default function UpvoteButton({ isActive, count }: { isActive: boolean, count: number }) {
   return (
      <button className={clsx(
         isActive ?
            'hover:bg-primary-hover bg-primary text-white' :
            'hover:bg-primary-light/60 text-primary',
         'h-8.5 w-max px-2.5 transition text-nowrap flex items-center gap-1 text-sm rounded-md'
      )}>
         <ThumbsUp className='w-4.5' />
         {count}
      </button>
   )
}
