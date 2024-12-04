'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN Card
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table'; // ShadCN Table

const ReportedTeams = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use effect to fetch reported teams
  useEffect(() => {
    const fetchReportedTeams = async () => {
      const token = localStorage.getItem('token'); // Check if token exists in localStorage (client-side only)

      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/report/getTeamReports', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Adding the token in the Authorization header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setReports(data); // Set the reported teams if the request is successful
        } else {
          setError('Failed to fetch reported teams');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchReportedTeams();
  }, []);

  return (
    <div className="mt-8 px-2">
      <Card className="shadow-lg bg-white rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900">Reported Teams</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-center text-gray-500">Loading...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Team Name</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reported At</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <TableRow key={report._id}>
                      <TableCell>{report.reportedBy.name}</TableCell>
                      <TableCell>{report.reportedTeam}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{report.status}</TableCell>
                      <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center text-gray-500">
                      No reports available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportedTeams;
