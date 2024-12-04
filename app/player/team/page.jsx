'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const TeamDashboard = () => {
  const [team, setTeam] = useState(null);
  const [playerRole, setPlayerRole] = useState('player');
  const [loading, setLoading] = useState(true);
  const [captainName, setCaptainName] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      console.log('Sending request to backend...');
      try {
        const response = await fetch('http://localhost:5000/api/team/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('user_jwt')}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to fetch team data');
          return;
        }

        const data = await response.json();
        console.log('Received team data:', data);
        setTeam(data.team);
        setPlayerRole(data.role);
        setCaptainName(data.captainName);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleRemovePlayer = async (playerId) => {
    try {
      console.log('Removing player with ID:', playerId);
      const response = await fetch(`http://localhost:5000/api/team/remove/${playerId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_jwt')}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const contentType = response.headers.get('Content-Type');

      if (!response.ok) {
        console.error('Error removing player:', response.statusText);
        return;
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data && data.team) {
          setTeam((prevState) => ({
            ...prevState,
            players: prevState.players.filter((player) => player._id !== playerId),
          }));
        } else {
          console.error('Unexpected response structure:', data);
        }
      } else {
        const errorHTML = await response.text();
        console.error('Received HTML instead of JSON:', errorHTML);
      }
    } catch (error) {
      console.error('Error in fetch request:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!team) return <p>No team data available.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="space-y-6 w-full max-w-3xl px-4">
        {/* Team Header */}
        <Card className="p-6 bg-black shadow-lg rounded-lg">
          <div className="flex items-center justify-between space-x-6">
            <div className="flex flex-col space-y-2">
              <h2 className="text-4xl font-bold text-white">{team?.name}</h2>
              <p className="text-lg text-gray-100">Captain: {captainName}</p>
            </div>
          </div>
        </Card>

        {/* Team Information with Two Columns */}
        <Card className="space-y-4 p-6">
          <h3 className="text-lg font-semibold">Team Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p><strong>Team Name:</strong> {team?.name}</p>
              <p><strong>Captain:</strong> {captainName}</p>
            </div>
            <div>
              <p><strong>Tournaments Participating:</strong> {team?.tournaments?.length || 0}</p>
              <p><strong>Tournaments Won:</strong> {team?.tournaments?.filter((t) => t.won).length || 0}</p>
            </div>
          </div>
        </Card>

        {/* Display Team Members and Participating Tournaments Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Members */}
          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <div className="space-y-2">
              {team?.players?.map((player) => (
                <div key={player._id} className="flex items-center justify-between p-3 border rounded-md">
                  <p>{player.username}</p>
                  {playerRole === 'captain' && (
                    <Button
                      variant="destructive"
                      onClick={() => handleRemovePlayer(player._id)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Participating Tournaments */}
          <Card className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">Participating Tournaments</h3>
            {team?.tournaments?.length === 0 ? (
              <p>No tournaments participated yet.</p>
            ) : (
              <ul className="space-y-2">
                {team?.tournaments?.map((tournament) => (
                  <li key={tournament._id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <p>{tournament.name}</p>
                      <Badge variant="outline">{tournament.status}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
