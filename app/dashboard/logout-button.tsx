"use client";

import axios from 'axios';
import React from 'react'
import { toast } from 'sonner';

export default function LogoutButton() {
   return (
      <button
         className='px-2.5 text-sm bg-primary-hover transition hover:text-red-100 rounded-md cursor-pointer py-1.5'
         onClick={async (e) => {
            e.preventDefault();
            try {
               const res = await axios.post('/logout', {}, { withCredentials: true })
               if (res.data.redirect === true) {
                  toast.success('Logged out successfully!');
                  window.location.href = '/login';
               } else {
                  throw new Error('Logout request failed');
               }
            } catch (error) {
               console.error('Logout failed:', error);
               toast.error('Logout failed. Please try again.');
            }
         }}>
         Logout
      </button>
   )
}
