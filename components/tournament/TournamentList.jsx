'use client';

import { useEffect, useState } from 'react';
import Tournament from './Tournament'; // Import the Tournament component

const TournamentList = () => {
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      const token = localStorage.getItem('user_jwt');
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
        setJoinedTournaments(data.tournaments); // Assuming 'tournaments' is the correct field in the response
      } else {
        console.error('Failed to fetch tournaments');
      }

      setLoading(false);
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return <p>Loading tournaments...</p>;
  }

  return (
    <div className="space-y-4">
      {joinedTournaments.length > 0 ? (
        joinedTournaments.map((tournament) => (
          <Tournament key={tournament._id} tournament={tournament} />
        ))
      ) : (
        <p>You have not joined any tournaments.</p>
      )}
    </div>
  );
};

export default TournamentList;
