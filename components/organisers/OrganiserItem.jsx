'use client';

const OrganiserItem = ({ organiser }) => {
  const handleUnfollow = async (organiserId) => {
    const response = await fetch('/api/player/unFollowOrganiser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organiserId }),
    });

    if (response.ok) {
      alert('Unfollowed successfully');
      window.location.reload(); // Reload to reflect changes
    } else {
      alert('Error unfollowing organiser');
    }
  };

  return (
    <div className="organiser-item p-4 border rounded-md shadow-md">
      <div className="organiser-header">
        <h3 className="text-xl font-bold">{organiser.username}</h3>
      </div>
      <div className="organiser-description mt-2">
        <p><strong>Email:</strong> {organiser.email}</p>
        <p><strong>Tournaments Organized:</strong></p>
        <ul>
          {organiser.tournaments && organiser.tournaments.length > 0 ? (
            organiser.tournaments.map((tournament) => (
              <li key={tournament._id} style={{ color: 'white' }}>
                Tournament Name: {tournament.name}
              </li>
            ))
          ) : (
            <li>No tournaments organized yet</li>
          )}
        </ul>
        {/* Unfollow button */}
        <button
          onClick={() => handleUnfollow(organiser._id)}
          className="followButton bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Unfollow
        </button>
      </div>
    </div>
  );
};

export default OrganiserItem;
