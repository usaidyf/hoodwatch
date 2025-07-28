import { MouseEventHandler } from 'react'
import { ThumbsUp } from 'lucide-react'
import clsx from 'clsx'

export default function UpvoteButton({ disabled, isActive, count, onClick }: { disabled: boolean, isActive: boolean, count: number, onClick: MouseEventHandler<HTMLButtonElement> }) {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={clsx(
            isActive ?
               'hover:bg-primary-hover bg-primary text-white disabled:bg-primary' :
               'hover:bg-primary-light/60 text-primary disabled:bg-transparent',
            'h-8.5 w-max px-2.5 transition text-nowrap flex items-center gap-1 text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
         )}
      >
         <ThumbsUp className='w-4.5' />
         {count}
      </button>
   )
}
