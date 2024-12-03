'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a button component

const OrganiserItem = ({ organiser }) => {
  return (
    <div className="organiser-item p-4 border rounded-md shadow-md">
      <h3 className="text-xl font-bold">{organiser.username}</h3>
      <div className="organiser-description mt-2">
        <p><strong>Email:</strong> {organiser.email}</p>
        <p><strong>Tournaments Organized:</strong></p>
        <ul>
          {organiser.tournaments && organiser.tournaments.length > 0 ? (
            organiser.tournaments.map((tournament) => (
              <li key={tournament._id}>{tournament.name}</li>
            ))
          ) : (
            <li>No tournaments organized yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const OrganiserList = () => {
  const [followedOrganisers, setFollowedOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedOrganisers = async () => {
      try {
        const token = localStorage.getItem('user_jwt');
        const response = await fetch('http://localhost:5000/api/player/followedOrg', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching followed organisers:', errorData);
          return;
        }

        const data = await response.json();
        setFollowedOrganisers(data.followedOrganisers);
      } catch (error) {
        console.error('Error fetching followed organisers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedOrganisers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {followedOrganisers.length > 0 ? (
        followedOrganisers.map((organiser) => (
          <OrganiserItem key={organiser._id} organiser={organiser} />
        ))
      ) : (
        <p>No followed organisers.</p>
      )}
    </div>
  );
};

export default OrganiserList;
