'use client';

import { useEffect, useState } from 'react';
import TournamentList from '@/components/tournament/TournamentList';  // Import TournamentList component
import OrganiserList from '@/components/organisers/OrganiserList';  // Import OrganiserList component
import ReportForm from '@/components/report/ReportForm';  // Import ReportForm component
import SearchBar from '@/components/search/searchBar';
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after initial render or API calls
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Welcome to your Dashboard</h1>
      
      <div className="mb-81">
        <SearchBar />  {/* Render SearchBar component */}
      </div>
      {/* Tournament List Section */}
      <div className="mb-8">
        <TournamentList />  {/* Render TournamentList component */}
      </div>
      
      {/* Organiser List Section */}
      <div className="mt-8 mb-8">
        <OrganiserList />  {/* Render OrganiserList component */}
      </div>

      {/* Report a Team Form Section */}
      <div className="mt-8">
        <ReportForm />  {/* Render ReportForm component */}
      </div>
    </div>
  );
}
