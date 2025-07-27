import React from 'react'
import Form from './form'
import { formHeading } from '@/app/lib/classnames'

export default function CreateIssuePage() {
   return (
      <div className='border border-gray-200 rounded-lg p-4 md:p-7'>
         <h3 className={formHeading}>Create Issue</h3>
         <Form />
      </div>
   )
}
