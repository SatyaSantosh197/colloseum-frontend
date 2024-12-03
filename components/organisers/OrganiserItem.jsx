'use client';

const OrganiserItem = ({ organiser }) => {
  return (
    <div className="organiser-item p-6 bg-white rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold">{organiser.username}</h3>
      <div className="organiser-description mt-2">
        <p><strong>Email:</strong> {organiser.email}</p>
        <p><strong>Tournaments Organized:</strong></p>
        <ul className="list-disc ml-5">
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

export default OrganiserItem;
