'use client';
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN components
import TournamentsSection from '@/components/TournamentsSection'; // Import TournamentsSection component
import OrganiserReport from '@/components/OrgReports'; // Import OrganiserReport component
import OrganiserStats from '@/components/OrgStats';
import ReportedTeams from '@/components/ReportedTeams';
import OrganiserControls from '@/components/OrgTourn';
const Dashboard = () => {
  return (
    <div className="dashboard-container min-h-screen bg-gray-100 p-8">
      {/* Include the DashboardHeader component */}
      <DashboardHeader />

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
    </div>
  );
};

export default Dashboard;
