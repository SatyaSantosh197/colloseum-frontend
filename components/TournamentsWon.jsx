'use client';

import { useState, useEffect } from 'react';

const TournamentsWon = () => {
  const [tournamentsWon, setTournamentsWon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

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

        console.log('Authorization Header:', `Bearer ${token}`);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error: ${response.statusText} - ${errorMessage}`);
        }

        const data = await response.json();
        console.log('Tournaments data:', data);

        if (data && typeof data.tournamentsWon === 'number') {
          setTournamentsWon(data.tournamentsWon);
        } else {
          setError('Invalid response format');
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
