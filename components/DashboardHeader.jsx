"use client"; // This marks the component as a client-side component

import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners'; // ShadCN BeatLoader for loading state
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN card components

const DashboardHeader = () => {
  const [username, setUsername] = useState(null); // Store the username
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    // Fetch organiser name from the backend API
    const fetchOrganiserName = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/organiser/getOrganiserName', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Set the fetched username
        } else {
          setError('Failed to fetch organiser name'); // Handle failed response
        }
      } catch (error) {
        setError('Error fetching data'); // Handle any errors
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchOrganiserName();
  }, []); // Empty dependency array to run only on component mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader /> {/* Show a loading spinner while fetching data */}
      </div>
    );
  }

  return (
    <header className="bg-white shadow-md p-4">
      <Card className="max-w-2xl mx-auto p-3 shadow-sm bg-white align-center">
        <CardContent>
          {/* Check if username is loaded, display it or error message */}
          <div className="text-lg text-gray-800">{username ? `${username}'s Profile` : 'Profile'}</div>
          {error && (
            <div className="text-red-500 mt-4">{error}</div> // Show error if fetching fails
          )}
        </CardContent>
      </Card>
    </header>
  );
};

export default DashboardHeader;
