"use client";

import React from 'react'

export default function DashboardError({ reset }: { reset: () => void }) {
   return (
      <div className='flex items-center justify-center h-screen bg-gray-100 text-gray-800'>
         <div className='text-center'>
            <h1 className='text-4xl font-bold text-primary'>Something went wrong</h1>
            <p className='mt-2 text-lg'>Try again or refresh the page.</p>
            <button onClick={() => { reset() }} className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition cursor-pointer mt-4'>Try again</button>
         </div>
      </div>
   )
}
