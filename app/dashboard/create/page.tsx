import React from 'react'
import Form from './form'
import { formHeading } from '@/app/lib/classnames'
import { fetchNeighborhoods } from '@/app/lib/data'
import { twMerge } from 'tailwind-merge';

export default async function CreateIssuePage() {
   const neighborhoods = await fetchNeighborhoods();

   if (neighborhoods === null || neighborhoods.length === 0) {
      throw new Error("No neighborhoods to select");
   }

   return (
      <div className='border border-gray-200 rounded-lg p-4 md:p-7'>
         <h3 className={twMerge(formHeading, 'mb-0')}>Create Issue</h3>
         <span className='inline-block mb-4 text-sm text-gray-600 -mt-0.5'>Posting in your neighborhood</span>
         <Form />
      </div>
   )
}
