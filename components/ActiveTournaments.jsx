"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminDashboard } from '../context/AdminDashboardContext';

export function ActiveTournaments() {
  const { dashboardData } = useAdminDashboard();

  // Determine if data is still loading
  const isLoading = !dashboardData;

  return (
    <Card className="bg-secondary/10">
      <CardHeader>
        <CardTitle className="text-secondary-foreground">Total Active Tournaments</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <p className="text-3xl font-bold text-secondary-foreground">
            {dashboardData.activeTournamentsCount}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
