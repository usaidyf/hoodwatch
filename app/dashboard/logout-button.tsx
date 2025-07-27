"use client";

import axios from 'axios';
import React from 'react'
import { toast } from 'sonner';

export default function LogoutButton() {
   return (
      <button
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
