'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/player/profileNavbar/Navbar';

const PlayerProfile = () => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayerData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/player/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
  
        const data = await response.json();
        setPlayerData(data.player);
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlayerData();
  }, []);

  const handleTeamRedirect = () => {
    router.push('/player/team');
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Navbar />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Player Profile</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Username:</span> {playerData.username}</p>
          <p><span className="font-medium">Email:</span> {playerData.email}</p>
          <Button 
            onClick={handleTeamRedirect}
            className="mt-2"
          >
            {playerData.team ? `Team: ${playerData.team.name}` : 'No Team'}
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Player Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Global Rank</p>
            <p>{playerData.globalRank}</p>
          </div>
          <div>
            <p className="font-medium">Tournaments Played</p>
            <p>{playerData.tournamentsPlayed}</p>
          </div>
          <div>
            <p className="font-medium">Tournaments Won</p>
            <p>{playerData.tournamentsWon}</p>
          </div>
          <div>
            <p className="font-medium">Ongoing Tournaments</p>
            <p>{playerData.ongoingTournaments}</p>
          </div>
          <div>
            <p className="font-medium">Orgs Following</p>
            <p>{playerData.noOfOrgsFollowing}</p>
          </div>
          <div>
            <p className="font-medium">Win Percentage</p>
            <p>{playerData.winPercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

