'use client';

import { useState, useEffect } from 'react';

const PlayerDetails = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch player profile data from the backend
    const fetchPlayerProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/player/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assuming you store the token in localStorage
          },
          credentials: 'include', // Send cookies (if any) with the request
        });

        if (response.ok) {
          const data = await response.json();
          setPlayer(data);  // Store player data
        } else {
          setError('Failed to fetch player data');
        }
      } catch (error) {
        setError('An error occurred while fetching player data');
        console.error(error);
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

    fetchPlayerProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500">Loading player details...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">{error}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col items-center text-white">
        <img 
          src={player.profilePhoto || '/default-profile.png'} 
          alt="Profile Photo" 
          className="w-24 h-24 rounded-full border-4 border-gray-700 mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{player.username}</h2>
        <p className="text-lg text-gray-400 mb-4">{player.email}</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Team:</h3>
          <p className="text-lg text-gray-300">{player.team}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Following:</h3>
          <ul className="list-disc pl-5 text-lg text-gray-300">
            {player.following.length > 0 ? (
              player.following.map((org, index) => (
                <li key={index}>{org}</li>
              ))
            ) : (
              <li>No following organisers</li>
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tournaments:</h3>
          <ul className="list-disc pl-5 text-lg text-gray-300">
            {player.tournaments.length > 0 ? (
              player.tournaments.map((tournament, index) => (
                <li key={index}>
                  {tournament.tournament} - {tournament.won ? 'Won' : 'Lost'}
                </li>
              ))
            ) : (
              <li>No tournaments participated in</li>
            )}
          </ul>
        </div>

        <div className="mt-6 text-lg">
          {player.banned ? (
            <span className="text-red-500">You are banned from the platform</span>
          ) : (
            <span className="text-green-500">You are not banned</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
