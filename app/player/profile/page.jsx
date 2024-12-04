"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NavProfile from "../../../components/NavProfile"; // Adjust the path as needed
import PlayerDetails from "../../../components/PlayerDetails"; // Adjust the path as needed
import TournamentsWon from "@/components/TournamentsWon";
import PlayerRanking from "@/components/PlayerRanking";
import TournamentsPlayed from "@/components/TournamentsPlayed";
import NoOfOrgsFollowing from "@/components/NoOfOrgsFollowing";
import WinPercentage from "@/components/WinPercentage";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <NavProfile />

      {/* Profile Overview */}
      <div className="container mx-auto px-6 py-12">
        <Card className="bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-pink-500">Player Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <PlayerDetails />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Player Statistics */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="statistics" className="w-full">
          <TabsList className="flex justify-center space-x-8 mb-4">
            <TabsTrigger
              value="statistics"
              className="px-6 py-3 font-medium text-lg text-gray-200 hover:bg-pink-500 hover:text-white rounded-md transition-colors duration-300"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="px-6 py-3 font-medium text-lg text-gray-200 hover:bg-pink-500 hover:text-white rounded-md transition-colors duration-300"
            >
              Activities
            </TabsTrigger>
          </TabsList>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <TournamentsWon />
              <PlayerRanking />
              <WinPercentage />
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <TournamentsPlayed />
              <NoOfOrgsFollowing />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;