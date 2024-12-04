'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // ShadCN Button
import { Input } from '@/components/ui/input'; // ShadCN Input
import { Textarea } from '@/components/ui/textarea'; // ShadCN Textarea
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN Card

const OrganiserReport = () => {
  const [organiserName, setOrganiserName] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from localStorage (make sure the user is logged in)
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No authentication token found.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/report/OreportO2A', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ organiserName, reason }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || 'Report submitted successfully');
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to submit report');
      }
    } catch (error) {
      setMessage('Error occurred while submitting the report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8 bg-white shadow-lg p-6 rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">Organiser Reporting Another Organiser</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="organiserName" className="block text-sm font-medium text-gray-700">Organiser Name</label>
            <Input
              id="organiserName"
              name="organiserName"
              value={organiserName}
              onChange={(e) => setOrganiserName(e.target.value)}
              required
              className="w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
            <Textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full mt-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </form>
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </CardContent>
    </Card>
  );
};

export default OrganiserReport;
