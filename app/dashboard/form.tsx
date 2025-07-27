"use client";

import { Field } from '@headlessui/react';
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner';
import { FormInput, FormLabel, FormSelect } from '../components/reusables/form-components';
import { updateProfile } from '../lib/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Button from '../components/reusables/button';
import { ArrowLeftIcon } from 'lucide-react';
import z from 'zod';
import { NeighborhoodSchema, UpdateProfileSchema } from '../lib/schema';

export default function EditProfileForm({ user, neighborhoods }: { user: z.infer<typeof UpdateProfileSchema>, neighborhoods: z.infer<typeof NeighborhoodSchema>[] }) {
   const [fieldErrors, setFieldErrors] = useState<Record<string, any>>({})
   const [isPending, start] = useTransition();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const fd = new FormData(e.currentTarget);

      start(async () => {
         const res = await updateProfile(fd);
         if (!res.ok) {
            toast.error(res.message);
            setFieldErrors(res.fieldErrors || {});
            return;
         }
         toast.success(res.message);
         redirect('/');
      })
   }

   return (
      <form onSubmit={handleSubmit} className='space-y-3'>
         <Field>
            <FormLabel>Full Name</FormLabel>
            <FormInput errorMessage={fieldErrors?.full_name && String(fieldErrors.full_name)} name='full_name' placeholder="e.g. John Doe" defaultValue={user.full_name} />
         </Field>
         <Field>
            <FormLabel>Your neighborhood</FormLabel>
            <FormSelect name='neighborhood_id' defaultValue={user.neighborhood_id ?? undefined} errorMessage={fieldErrors?.neighborhood_id && String(fieldErrors.neighborhood_id)}>
               {neighborhoods.map(nbh => (
                  <option key={nbh.id} value={nbh.id}>{nbh.full_name} - {nbh.address}</option>
               ))}
            </FormSelect>
         </Field>
         <input type="hidden" name="id" value={user.id} />

         <div className='flex items-center gap-3 justify-between mt-8'>
            <Button as={Link} href='/dashboard' className='bg-gray-100 hover:bg-gray-200 text-gray-800'>
               <ArrowLeftIcon className='w-3.5 md:w-4.5' />
               Go Back
            </Button>
            <Button type='submit' disabled={isPending}>
               {isPending ? 'Updating...' : 'Update Profile'}
            </Button>
         </div>
      </form>
   )
}
