'use client';

import { useState, useEffect } from "react";
import OrganiserDropdown from "./OrganiserDropdown";

import ReportFormDialog from "../org/OrgReports"; // Import ReportFormDialog component

const OrganiserNavbar = ({ handleOpenDialog }) => {
  const [username, setUsername] = useState(""); // State to store the username
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to track error messages

  useEffect(() => {
    // Fetch the organiser's username from the API when the component mounts
    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/organiser/getOrganiserName", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Assuming JWT token is stored in localStorage
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Set the username state
          setLoading(false); // Set loading to false once the data is fetched
        } else {
          const data = await response.json();
          setError(data.message || "Error fetching username");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  return (
    <nav className="bg-gray-900 p-4 shadow-md mb-6 w-full border-b border-gray-700 rounded-xl">
      <div className="flex justify-between items-center w-full">
        <div className="text-white text-2xl font-bold">
          {/* Display the username or fallback to a default text */}
          {loading ? "Loading..." : username ? username : "My Tournament App"}
        </div>

        {/* Align the SearchBar and Dropdown to the right */}
        <div className="flex items-center space-x-4 ml-auto">
          
          <button
            onClick={handleOpenDialog}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Report
          </button>
        <OrganiserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default OrganiserNavbar;
