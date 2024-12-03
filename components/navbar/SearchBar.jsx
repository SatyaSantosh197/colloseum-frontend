// SearchBar.jsx

'use client';

import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Search Term Submitted:', searchTerm);
  
    if (!searchTerm) {
      setMessage('Please enter a search term.');
      return;
    }
  
    let actionUrl = '';
    let updatedSearchTerm = searchTerm;
  
    if (updatedSearchTerm.startsWith('?')) {
      actionUrl = '/api/player/searchTournaments';
      updatedSearchTerm = updatedSearchTerm.slice(1);
    } else if (updatedSearchTerm.startsWith(':')) {
      actionUrl = '/api/player/searchOrganisers';
      updatedSearchTerm = updatedSearchTerm.slice(1);
    } else {
      setMessage('Invalid search format. Use "?" for tournaments and ":" for organisers.');
      return;
    }
  
    console.log('Action URL:', actionUrl);
    console.log('Updated Search Term:', updatedSearchTerm);
  
    setLoading(true);
    try {
      const token = localStorage.getItem('user_jwt');
      console.log('Using token:', token);
  
      const response = await fetch(actionUrl + `?searchTerm=${updatedSearchTerm}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        setSearchResults(result.results || result.organisationResults || []);
        setMessage('');
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
        console.error('Response Error:', errorText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setMessage('Error fetching search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        type="text"
        id="search-input"
        name="searchTerm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="'?' for tournaments, ':' for organisers"
        required
        aria-label="Search tournaments and organisers"
        className="p-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar; // Make sure you are exporting it as default
