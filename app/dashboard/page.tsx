import React from 'react'
import Form from './form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import { fetchNeighborhoods, findUserByEmail } from '@/app/lib/data';
import { formHeading } from '../lib/classnames';

export default async function DashboardHome() {
   const session = await auth();
   if (!session || !session.user) return redirect('/login')

   const user = await findUserByEmail(session.user?.email);
   if (!user) return redirect('/login')

   const neighborhoods = await fetchNeighborhoods();
   if (neighborhoods === null || neighborhoods.length === 0) {
      throw new Error("No neighborhoods to select");
   }

   return (
      <div className='border border-gray-200 rounded-lg p-4 md:p-7'>
         <h3 className={formHeading}>Edit profile</h3>
         <Form neighborhoods={neighborhoods} user={user} />
      </div>
   )
}
