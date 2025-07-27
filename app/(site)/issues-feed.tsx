import React from 'react'
import { IssueType } from '../lib/types'

export default function IssuesFeed({ issues, neighborhoodName }: { issues: IssueType[] | null, neighborhoodName: string }) {
   return (
      <div>
         <h4 className='text-xl font-semibold mb-4'>
            In your hood, {neighborhoodName}
         </h4>
         {(issues === null || issues.length === 0) && (
            <div className='p-4 md:p-6 h-[50vh] text-lg font-medium text-center bg-gray-100 rounded-lg'>
               Looks silent in this hood 👀
            </div>
         )}
         {/* TODO: I'm here */}
      </div>
   )
}
