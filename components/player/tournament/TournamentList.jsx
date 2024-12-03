'use client';

import { useEffect, useState } from 'react';
import Tournament from './Tournament'; // Import the Tournament component

const TournamentList = () => {
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = localStorage.getItem('user_jwt');
        console.log(token);

        const response = await fetch('http://localhost:5000/api/tournament/tournamentsEnrolled', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);  // Log to check response structure

          setJoinedTournaments(data.tournaments); // Assuming 'tournaments' is the correct field in the response
        } else {
          console.error('Failed to fetch tournaments');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return <p className="text-center text-xl text-gray-700">Loading tournaments...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-6">
      {joinedTournaments.length > 0 ? (
        joinedTournaments.map((tournament) => (
          // Make sure you're passing the tournament object directly
          <Tournament key={tournament._id} tournament={tournament} />
        ))
      ) : (
        <p className="text-center text-lg text-gray-500">You have not joined any tournaments.</p>
      )}
    </div>
  );
};

export default TournamentList;
