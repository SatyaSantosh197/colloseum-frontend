'use client';

import React, { useState, useEffect } from 'react';

const PlayerRanking = () => {
  const [playerRanking, setPlayerRanking] = useState(null); // State to hold the ranking data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    const fetchPlayerRanking = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/player/ranking', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPlayerRanking(data.playerRanking);
      } catch (error) {
        console.error('Error fetching player ranking:', error);
        setError('Error fetching ranking');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerRanking();
  }, []);

  if (loading) {
    return <p>Loading ranking...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ranking">
      <h3>Your Player Ranking</h3>
      {playerRanking ? (
        <p>Rank: {playerRanking}</p>
      ) : (
        <p>Ranking information is unavailable.</p>
      )}
    </div>
  );
};

export default PlayerRanking;
