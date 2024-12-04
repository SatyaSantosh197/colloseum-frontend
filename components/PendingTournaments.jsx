// components/PendingTournament.jsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import ScrollableTable from './ScrollableTable';
import { useAdminDashboard } from '../context/AdminDashboardContext';
import { toast } from 'react-toastify'; // For notifications

export default function PendingTournament() {
  const { dashboardData, setDashboardData } = useAdminDashboard();
  const [approvingIds, setApprovingIds] = useState([]); // To manage loading state for individual approvals

  if (!dashboardData) {
    return <p className="text-center text-xl text-gray-700">Loading tournaments...</p>;
  }

  // Derive pending tournaments by filtering the tournaments list
  const pendingTournaments = dashboardData.tournaments.filter(
    (tournament) => tournament.status === 'Pending'
  );

  const handleApproveTournament = async (tournamentId) => {
    setApprovingIds((prev) => [...prev, tournamentId]);
    try {
      const response = await fetch(`http://localhost:5000/admin/approve/tournament/${tournamentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Extract error message from response if available
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve tournament');
      }

      // Update the tournament status in the context
      const updatedTournament = await response.json();

      setDashboardData((prevData) => {
        // Update tournaments array
        const updatedTournaments = prevData.tournaments.map((tournament) =>
          tournament._id === tournamentId ? updatedTournament : tournament
        );

        return {
          ...prevData,
          tournaments: updatedTournaments,
          activeTournamentsCount: prevData.activeTournamentsCount + 1, // Assuming approval makes it active
        };
      });

      // Show success notification
      toast.success('Tournament approved successfully!');
    } catch (error) {
      console.error('Error approving tournament:', error);
      // Show error notification
      toast.error(`Failed to approve tournament: ${error.message}`);
    } finally {
      setApprovingIds((prev) => prev.filter((id) => id !== tournamentId));
    }
  };

  if (pendingTournaments.length === 0) {
    return <p className="text-center text-xl text-gray-700">No pending tournaments.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tournament Requests</h2>
      <ScrollableTable headers={["Organiser", "Tournament Name", "Start Date", "Prize Pool", "Status", "Action"]}>
        {pendingTournaments.map((tournament) => (
          <TableRow key={tournament._id}>
            {/* Safely access organiser's username */}
            <TableCell>{tournament.organiser?.username || 'Unknown Organiser'}</TableCell>
            <TableCell>{tournament.name}</TableCell>
            <TableCell>{new Date(tournament.startDate).toLocaleDateString()}</TableCell>
            <TableCell>${tournament.prizePool.toLocaleString()}</TableCell>
            <TableCell>{tournament.status}</TableCell>
            <TableCell>
              {tournament.status === 'Pending' && (
                <Button
                  onClick={() => handleApproveTournament(tournament._id)}
                  disabled={approvingIds.includes(tournament._id)}
                >
                  {approvingIds.includes(tournament._id) ? 'Approving...' : 'Approve Tournament'}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </ScrollableTable>
    </div>
  );
}