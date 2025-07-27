import React from 'react'
import { IssueType } from '../lib/types'
import IssuePostCard from './issue-post-card'

export default function IssuesFeed({ issues, neighborhoodName }: { issues: IssueType[] | null, neighborhoodName: string }) {
   return (
      <div>
         <h3 className='text-xl font-semibold mb-4'>
            In your hood, {neighborhoodName}
         </h3>
         {(issues === null || issues.length === 0) ? (
            <div className='p-4 md:p-6 h-[50vh] text-lg font-medium text-center bg-gray-100 text-gray-600 rounded-lg'>
               Looks silent in this hood 👀
            </div>
         ) : (
            <div className='space-y-4'>
               {issues.map(issue => (
                  <IssuePostCard key={issue.id} issue={issue} />
               ))}
            </div>
         )}
      </div>
   )
}
