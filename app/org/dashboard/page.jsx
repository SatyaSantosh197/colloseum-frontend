'use client';

import React, { useState } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN components
import TournamentsSection from '@/components/org/TournamentsSection'; // Import TournamentsSection component
import OrganiserReport from '@/components/org/OrgReports'; // Import OrganiserReport component
import OrganiserStats from '@/components/org/OrgStats'; 
import ReportedTeams from '@/components/org/ReportedTeams';
import OrganiserControls from '@/components/org/OrgTourn';
import UpdateDetails from '@/components/org/UpdateDetails';
import OrganiserNavbar from '@/components/org/NavOrg';

const Dashboard = () => {
  const [isReportDialogOpen, setReportDialogOpen] = useState(false); // State to manage the report dialog visibility

  // Function to open the dialog
  const handleOpenDialog = () => setReportDialogOpen(true);

  // Function to close the dialog
  const handleCloseDialog = () => setReportDialogOpen(false);

  return (
    <div className="dashboard-container min-h-screen bg-gray-100 p-8">
      {/* Include the DashboardHeader component */}
      <OrganiserNavbar handleOpenDialog={handleOpenDialog} />

      {/* Organiser Profile Section */}
      <div className="mt-8 px-2">
        <Card className="shadow-lg bg-white rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-900">Dashboard Information</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Organiser Reporting Form */}
            <OrganiserReport /> {/* This will render the Organiser Report form inside the dashboard */}
            <OrganiserStats />
            <ReportedTeams />
            <UpdateDetails />
          </CardContent>
        </Card>
      </div>

      {/* Tournaments Section */}
      <div className="mt-8 px-2">
        <Card className="shadow-lg bg-white rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-900">Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tournaments Section */}
            <TournamentsSection /> {/* Include TournamentsSection component */}
          </CardContent>
          <OrganiserControls />
        </Card>
      </div>

      {/* Report Form Dialog */}
      <OrganiserReport
        open={isReportDialogOpen}
        onOpenChange={handleCloseDialog}
      /> {/* Pass state and handler to control dialog visibility */}
    </div>
  );
};

export default Dashboard;
