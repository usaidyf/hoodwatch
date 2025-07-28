import React from 'react'
import { fetchNeighborhoods } from '@/app/lib/data'
import Link from 'next/link';

export default async function DiscoverNeighborhoodsFeed({ isLoggedIn }: { isLoggedIn: boolean }) {
   const neighborhoods = await fetchNeighborhoods();

   if (neighborhoods === null || neighborhoods.length === 0) {
      throw new Error("No neighborhoods to discover");
   }

   return (
      <div>
         <h4 className='text-xl font-semibold mb-4'>
            Discover Neighborhoods
         </h4>
         <div className='space-y-4'>
            {neighborhoods.map(nbh => (
               <div className='px-5 py-4 bg-gray-100 rounded-lg border border-gray-200'>
                  <div className="flex gap-2 justify-between">
                     <div className="flex flex-col">
                        <h6 className='text-xl font-semibold'>
                           <Link href={`/hoods/${nbh.id}`}>
                              {nbh.full_name}
                           </Link>
                        </h6>
                        <span className='text-gray-700 text-sm -mt-0.5'>{nbh.address}</span>
                        <span className='text-gray-700 text-sm -mt-0.5'>Postal Code: {nbh.postal_code}</span>
                     </div>
                     <span className="text-gray-700 text-sm mt-0.5">{nbh.city}, {nbh.state}, {nbh.country}</span>
                  </div>
                  <div className='mt-1.5'>
                     <p>{nbh.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
