'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the cookie package

const TournamentsWon = () => {
  const [tournamentsWon, setTournamentsWon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token'); // Access the token from cookies
    console.log('Token from cookies:', token); // Log the token for debugging

    if (!token) {
      setError('No token found');
      setLoading(false);
      console.error('No token found');
      return;
    }

    const fetchTournamentsWon = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/player/tournamentsWon', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Tournaments data:', data);

        if (data.tournamentsWon !== undefined) {
          setTournamentsWon(data.tournamentsWon);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentsWon();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Tournaments Won:</h3>
      <p>{tournamentsWon !== null ? tournamentsWon : 'No data available'}</p>
    </div>
  );
};

export default TournamentsWon;
