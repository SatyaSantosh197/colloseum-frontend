'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN Card
import { BeatLoader } from 'react-spinners'; // ShadCN BeatLoader for loading state
import { Alert } from '@/components/ui/alert'; // ShadCN Alert (optional for error handling)

const OrganiserStats = () => {
  const [organiserStats, setOrganiserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganiserStats = async () => {
      try {
        const token = localStorage.getItem('token');  // Get the token from localStorage
        if (!token) {
          setError('Authentication token is missing');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/organiser/getOrganiserName', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Pass the token in the Authorization header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOrganiserStats(data);  // Store the organiser data in state
        } else {
          setError(data.message || 'Failed to fetch organiser data');
        }
      } catch (error) {
        setError('Error occurred while fetching organiser data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganiserStats();
  }, []);

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

  return (
    <Card className="shadow-lg bg-white rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold text-gray-900">Organiser Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="stats-section">
          <div className="stats">
            <h3>Followers:</h3>
            <p>{organiserStats.visibilitySettings.followersVisible ? organiserStats.followerCount : 'Hidden'}</p>
          </div>
          <div className="stats">
            <h3>Total Prize Pool:</h3>
            <p>{organiserStats.visibilitySettings.prizePoolVisible ? organiserStats.totalPrizePool : 'Hidden'}</p>
          </div>
          <div className="stats">
            <h3>Total Tournaments Held:</h3>
            <p>{organiserStats.visibilitySettings.tournamentsVisible ? organiserStats.totalTournaments : 'Hidden'}</p>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default OrganiserStats;
