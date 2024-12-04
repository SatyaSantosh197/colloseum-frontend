"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN Card
import { BeatLoader } from 'react-spinners'; // ShadCN BeatLoader for loading state
import { Alert } from '@/components/ui/alert'; // ShadCN Alert (optional for error handling)
import useFetchAdminDashboard from "@/context/useFetchAdminDashboard"; // Import the hook

const OrganiserStats = () => {
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

  // Fetch admin dashboard data using the custom hook
  const dashboardData = useFetchAdminDashboard();

  useEffect(() => {
    if (dashboardData) {
      setLoading(false);
    }
  }, [dashboardData]);

  if (loading) {
    return (
      <Card className="shadow-lg bg-white rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900">Organiser Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center">
            <BeatLoader />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg bg-white rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900">Organiser Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="text-center">
            {error}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Extract necessary data from the dashboardData
  const {
    activeTournamentsCount,
    avgMonthlyPrizePool,
    players,
    avgYearlyPrizePool,
    tournamentToBeApproved,
  } = dashboardData;

  // Helper function to safely format numbers
  const formatCurrency = (value) => {
    return typeof value === 'number' ? value.toLocaleString() : 'N/A';
  };

  return (
    <Card className="shadow-lg bg-white rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold text-gray-900">Organiser Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="stats-section flex flex-wrap justify-between">
          {/* Active Tournaments */}
          <div className="stat-card w-full sm:w-1/3 p-4">
            <Card className="shadow-sm bg-black text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Active Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-center">{activeTournamentsCount || 0}</p>
              </CardContent>
            </Card>
          </div>

          {/* Avg Monthly Prize Pool */}
          <div className="stat-card w-full sm:w-1/3 p-4">
            <Card className="shadow-sm bg-black text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Avg Monthly Prize Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-center">{formatCurrency(avgMonthlyPrizePool)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Players */}
          <div className="stat-card w-full sm:w-1/3 p-4">
            <Card className="shadow-sm bg-black text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Players</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-center">{players.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Yearly Prize Pool Data */}
          <div className="stat-card w-full sm:w-1/3 p-4">
            <Card className="shadow-sm bg-black text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Yearly Prize Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-center">{formatCurrency(avgYearlyPrizePool)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tournaments To Be Approved */}
          <div className="stat-card w-full sm:w-1/3 p-4">
            <Card className="shadow-sm bg-black text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">To be Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-center">{tournamentToBeApproved.length}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default OrganiserStats;
