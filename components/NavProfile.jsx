'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DropdownWithComponents from '../components/player/navbar/DropDownMenu';

const NavProfile = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the username from the API when the component mounts
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/player/getUserName', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setLoading(false);
        } else {
          console.error('Error fetching username:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  // Search input preprocessing before form submission
  const preprocessSearchInput = (e) => {
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value.trim(); // Get the input value
    
    // Check if input is empty
    if (!inputValue) {
      alert("Please enter a search term.");
      return false; // Prevent form submission
    }

    // Determine the type of search based on the first character
    if (inputValue.startsWith('-')) {
      // Remove '-' for player search
      searchInput.value = inputValue.slice(1); // Set the cleaned value back to input
      document.querySelector('.search-form').action = 'http://localhost:5000/api/player/searchPlayer'; // Full URL for player search
    } else if (inputValue.startsWith('>')) {
      // Remove '>' for team search
      searchInput.value = inputValue.slice(1); // Set the cleaned value back to input
      document.querySelector('.search-form').action = 'http://localhost:5000/api/player/teamName'; // Full URL for team search
    } else {
      alert("Invalid search format. Use '>' for teams and '-' for players");
      return false; // Prevent form submission
    }

    return true; // Allow form submission
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md mb-6 w-full border-b border-gray-700 rounded-xl">
      <div className="flex justify-between items-center w-full">
        <div className="text-white text-2xl font-bold">
          {loading ? 'Loading...' : username ? username : 'My Tournament App'}
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 ml-auto">
          <form className="search-form" method="GET" action="http://localhost:5000/api/player/searchTournaments" onSubmit={preprocessSearchInput}>
            <input
              type="text"
              id="search-input"
              name="searchTerm"
              placeholder=" '>' for teams '-' for player"
              required
              aria-label="Search teams and player"
              className="p-2 rounded-md"
            />
          </form>

          {/* Dropdown Menu */}
          <DropdownWithComponents />
        </div>
      </div>
    </nav>
  );
};

export default NavProfile;
