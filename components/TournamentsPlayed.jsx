'use client';

import { useEffect, useState } from 'react';

const TournamentsPlayed = () => {
    const [tournamentsPlayed, setTournamentsPlayed] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTournamentsPlayed = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/player/tournamentsPlayed', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your auth method
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch tournaments played');
                }

                const data = await response.json();
                setTournamentsPlayed(data.tournamentsPlayed);
            } catch (err) {
                console.error('Error fetching tournaments played:', err.message);
                setError(err.message);
            }
        };

        fetchTournamentsPlayed();
    }, []);

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="tournaments-played">
            <h3>Tournaments Played</h3>
            <p>{tournamentsPlayed}</p>
        </div>
    );
};

export default TournamentsPlayed;
