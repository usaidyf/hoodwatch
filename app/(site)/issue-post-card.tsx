"use client";

import React, { useEffect, useState, useTransition } from 'react'
import { IssueType } from '../lib/types'
import Link from 'next/link'
import { formatDateToRelative } from '../lib/utils'
import UpvoteButton from '../components/reusables/upvote-button'
import ShareButton from '../components/reusables/share-button'
import { Share2 } from 'lucide-react'
import { handleUpvoteIssue } from '../lib/actions';
import { toast } from 'sonner';
import { hasUpvotedIssue } from '../lib/data';

export default function IssuePostCard({ issue }: { issue: IssueType & { upvoteCount: number } }) {
   const [isPending, start] = useTransition();
   const [hasUpvoted, setHasUpvoted] = useState(false)

   async function updateActive() {
      const res = await hasUpvotedIssue(issue.id);
      setHasUpvoted(res || false)
   }

   async function handleUpvote() {
      start(async () => {
         const res = await handleUpvoteIssue(issue.id);
         if (res.ok === false) {
            toast.error(res.message || 'Error')
            return;
         }
         await updateActive()
      })
   }

   useEffect(() => {
      start(updateActive)
   }, [])

   return (
      <div className='bg-gray-100 border border-gray-200 px-5 py-4 rounded-lg'>
         <h6 className='text-xl font-semibold mb-2.5 md:mb-3 flex flex-col'>
            <Link href={`/issues/${issue.id}`} className='inline-block w-full h-full'>
               {issue.title}
            </Link>
            <span className='text-xs text-gray-600'>
               {formatDateToRelative(issue.created_at)}
            </span>
         </h6>
         <p className='text-sm'>
            {issue.description.substring(0, 500) + '... '}
            <Link href={`/issues/${issue.id}`} className='text-primary hover:underline'>
               See post
            </Link>
         </p>
         <div className='mt-4'>
            <div className="flex items-center gap-2">
               <UpvoteButton disabled={isPending} onClick={handleUpvote} isActive={hasUpvoted} count={issue.upvoteCount} />
               {/* TODO: Include base url in share button also */}
               <ShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/issues/${issue.id}`}>
                  {({ copied, share }) => (
                     <button onClick={share} className='text-sm flex items-center gap-1 hover:bg-gray-300 transition px-2.5 h-8.5 rounded-md cursor-pointer'>
                        <Share2 className="w-4.5" />
                        {copied ? "Link copied" : "Share"}
                     </button>
                  )}
               </ShareButton>
            </div>

         </div>
      </div>
   )
}
