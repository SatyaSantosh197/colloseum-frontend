'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';  // Assuming you are using ShadCN button

const Tournament = ({ tournament }) => {
  const [isClient, setIsClient] = useState(false); // Client-side check
  const router = useRouter();  // Hook to access the router

  useEffect(() => {
    setIsClient(true); // Set isClient to true once the component is mounted
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  // Function to navigate to tournament details page
  const handleViewDetails = () => {
    router.push(`/player/home/tournament/${tournament._id}`);  // Navigate to tournament details page
  };

  // Ensure the component is rendered only on the client side
  if (!isClient) return null;

  return (
    <div className="tournament-item p-6 border-2 border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="TName">
        <h4 className="text-2xl font-semibold text-gray-800">{tournament.name}</h4>
      </div>

      <div className="DescT mt-4">
        <p className="text-lg text-gray-700">
          <strong className="font-medium text-gray-900">Start Date:</strong> {formatDate(tournament.startDate)}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-medium text-gray-900">Prize Pool:</strong> ${tournament.prizePool}
        </p>
      </div>

      {/* View Details Button */}
      <Button 
        onClick={handleViewDetails} 
        className="mt-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        View Details
      </Button>
    </div>
  );
};

export default Tournament;
