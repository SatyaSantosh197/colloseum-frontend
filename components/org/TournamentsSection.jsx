"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TournamentsSection = () => {
  const [visibilitySettings, setVisibilitySettings] = useState({});
  const [tournamentList, setTournamentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/organiser/getOrganiserName', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setVisibilitySettings(data.visibilitySettings);
          setTournamentList(data.tournaments);
        } else {
          setError('Failed to fetch organiser data');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!visibilitySettings.tournamentsVisible) {
    return null;
  }

  return (
    <section className="tournaments-section mt-8 px-2">
      <div className="tournament-list">
        <h3 className="text-2xl font-semibold text-gray-900">All Tournaments</h3>
        {tournamentList.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {tournamentList.map((tournament) => {
              if (!tournament._id) {
                console.warn('Tournament missing _id:', tournament);
                return null;
              }

              return (
                <li key={tournament._id}>
                  <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900">{tournament.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Start Date: {new Date(tournament.startDate).toLocaleDateString()}</p>
                      <p className="text-gray-600">End Date: {new Date(tournament.endDate).toLocaleDateString()}</p>
                      <p className="text-gray-600">Prize Pool: ${tournament.prizePool}</p>
                      <div
                        className={`status-box ${tournament.status?.toLowerCase() || 'unknown'} bg-gray-200 rounded-full py-1 px-4 inline-block mt-2`}>
                        {tournament.status || 'Unknown'}
                      </div>
                      {tournament.status === 'Completed' && (
                        <p className="text-gray-600 mt-2">Winner: {tournament.winner || 'TBD'}</p>
                      )}
                      {/* Updated button to use Next.js router for navigation */}
                      <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => router.push(`/org/dashboard/tournament/${tournament._id}`)}
                      >
                        View Details
                      </button>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-4">No tournaments available</p>
        )}
      </div>
    </section>
  );
};

export default TournamentsSection;
