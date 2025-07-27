import { fetchIssuesByNeighborhood, fetchNeighborhoodById } from '@/app/lib/data';
import React from 'react'
import IssuesFeed from '@/app/components/sections/issues-feed';
import { notFound } from 'next/navigation';

export default async function NeighborhoodPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;

   const neighborhood = await fetchNeighborhoodById(id);

   if (neighborhood === null) {
      return notFound();
   }

   const issues = await fetchIssuesByNeighborhood(id);

   return (
      <IssuesFeed issues={issues} neighborhoodName={neighborhood.full_name} />
   );
}
