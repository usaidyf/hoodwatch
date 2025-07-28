import { auth } from '@/auth';
import React from 'react'
import { fetchIssuesByNeighborhood, fetchNeighborhoodById, findUserByEmail } from '@/app/lib/data';
import IssuesFeed from '@/app/components/sections/issues-feed';
import DiscoverNeighborhoodsFeed from './discover-neighborhoods-feed';

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session && !!session.user

  if (isLoggedIn) {
    const user = await findUserByEmail(session.user?.email ?? '');
    if (user?.neighborhood_id) {
      const neighborhood = await fetchNeighborhoodById(user.neighborhood_id);
      const issues = await fetchIssuesByNeighborhood(user.neighborhood_id);

      if (!neighborhood || issues === null) {
        return <DiscoverNeighborhoodsFeed isLoggedIn={isLoggedIn} />
      }

      return <IssuesFeed issues={issues} neighborhoodName={neighborhood?.full_name} />
    }
    return <DiscoverNeighborhoodsFeed isLoggedIn={isLoggedIn} />
  }
  return <DiscoverNeighborhoodsFeed isLoggedIn={isLoggedIn} />
}
