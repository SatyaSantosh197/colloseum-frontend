'use client';

const Tournament = ({ tournament }) => {
  return (
    <div className="tournament-item tournament-list p-4 border rounded-md shadow-md">
      <div className="TName">
        <h4 className="text-xl font-bold">{tournament.name}</h4>
      </div>
      <div className="DescT mt-2">
        <p><strong>Description:</strong> {tournament.description}</p>
        <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
      </div>
      <div className="tournament-details mt-4">
        Render the entire tournament object in JSON format for debugging purposes
        <pre>{JSON.stringify(tournament, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Tournament;
