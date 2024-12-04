'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN Card
import { BeatLoader } from 'react-spinners'; // ShadCN BeatLoader for loading state
import { Alert } from '@/components/ui/alert'; // ShadCN Alert (optional for error handling)

const OrganiserStats = () => {
  const [username, setUsername] = useState(null); // Store the username
  const [email, setEmail] = useState(null); // Store the email
  const [description, setDescription] = useState(null); // Store the description
  const [tournamentsConducted, setTournamentsConducted] = useState(null); // Store tournaments conducted
  const [rating, setRating] = useState(null); // Store rating
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

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
          // Set the individual fields in state
          setUsername(data.username);
          setEmail(data.email);
          setDescription(data.description);
          setTournamentsConducted(data.tournamentsConducted);
          setRating(data.rating);
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
        <section className="stats-section flex flex-wrap justify-between">
          <div className="stats w-1/2 sm:w-1/4 p-2">
            <h3 className="font-semibold">Username:</h3>
            <p>{username}</p>
          </div>
          <div className="stats w-1/2 sm:w-1/4 p-2">
            <h3 className="font-semibold">Email:</h3>
            <p>{email}</p>
          </div>
          <div className="stats w-1/2 sm:w-1/4 p-2">
            <h3 className="font-semibold">Description:</h3>
            <p>{description}</p>
          </div>
          <div className="stats w-1/2 sm:w-1/4 p-2">
            <h3 className="font-semibold">Rating:</h3>
            <p>{rating || 'N/A'}</p>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default OrganiserStats;
