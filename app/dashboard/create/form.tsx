"use client";

import Button from '@/app/components/reusables/button';
import { FormLabel, FormInput, FormTextArea, FormSelect } from '@/app/components/reusables/form-components';
import { createIssue } from '@/app/lib/actions';
import { Field } from '@headlessui/react';
import { ArrowLeftIcon, ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner';

export default function CreateIssueForm() {
   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
   const [isPending, start] = useTransition();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const fd = new FormData(e.currentTarget);

      start(async () => {
         const res = await createIssue(fd);
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
            <FormLabel>Issue Title</FormLabel>
            <FormInput name='title' placeholder="Enter issue title" errorMessage={fieldErrors?.title && String(fieldErrors?.title)} />
         </Field>
         <Field>
            <FormLabel>Issue Description</FormLabel>
            <FormTextArea name='description' placeholder="Enter issue description" rows={5} errorMessage={fieldErrors?.description && String(fieldErrors?.description)} />
         </Field>
         <Field>
            <FormLabel>Status</FormLabel>
            <FormSelect defaultValue="open" name='status' errorMessage={fieldErrors?.status && String(fieldErrors?.status)}>
               <option value="open">Open</option>
               <option value="resolved">Resolved</option>
            </FormSelect>
         </Field>
         <Field>
            <FormLabel>Neighborhood</FormLabel>
            <FormSelect name='neighborhood_id' errorMessage={fieldErrors?.neighborhood_id && String(fieldErrors?.neighborhood_id)}>
               {/* TODO: Use dynamic values */}
               <option value="aa8ac40f-3b80-487d-a202-548c755872c9">Uptown</option>
            </FormSelect>
         </Field>


         <div className='flex items-center gap-3 justify-between mt-8'>
            <Button as={Link} href='/' className='bg-gray-100 hover:bg-gray-200 text-gray-800'>
               <ArrowLeftIcon className='w-3.5 md:w-4.5' />
               Go Back
            </Button>
            <Button type='submit' disabled={isPending}>
               {isPending ? 'Creating...' : 'Create Issue'}
            </Button>
         </div>
      </form>
   )
}
