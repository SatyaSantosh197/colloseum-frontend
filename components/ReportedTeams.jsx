'use client';
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDashboard } from "@/context/AdminDashboardContext";
import useFetchAdminDashboard from "@/context/useFetchAdminDashboard";

export default function ReportedTeams() {
  const dashboardData = useFetchAdminDashboard();
  const [reportedTeams, setReportedTeams] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // Log the data to console once it's fetched
  useEffect(() => {
    if (dashboardData && dashboardData.reports) {
      console.log("Dashboard Data:", dashboardData);
      console.log(JSON.stringify(dashboardData.reports));
      dashboardData.reports.forEach(report => {
        console.log("Reported By Data:", report.reportedBy);
      });

      // Filter the reports for 'Team' type
      const filteredReports = dashboardData.reports.filter(
        (report) => report.reportType === "Team"
      );

      setReportedTeams(filteredReports);
      console.log("Filtered Reported Teams:", filteredReports);
    }
  }, [dashboardData]); // This effect will run every time dashboardData is updated

  // Handle review report
  const handleReviewReport = (reportId, status) => {
    setReportedTeams((prevReports) =>
      prevReports.map((report) =>
        report._id === reportId ? { ...report, status: status } : report
      )
    );
    setSelectedReport(null);
  };

  if (!dashboardData || !reportedTeams) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reported Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reported By</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported At</TableHead> {/* Updated column */}
            </TableRow>
          </TableHeader>
          <TableBody>
  {reportedTeams.length > 0 ? (
    reportedTeams.map((report) => (
      <TableRow key={report._id}>
        <TableCell>{report.reportedBy.username}</TableCell>
        <TableCell>{report.reportedTeam}</TableCell>
        <TableCell>{report.reason}</TableCell>
        <TableCell>{report.status}</TableCell>
        <TableCell>
          {/* Displaying formatted createdAt date */}
          <span>{new Date(report.createdAt).toLocaleString()}</span>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        No reported teams.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </CardContent>
    </Card>
  );
}
