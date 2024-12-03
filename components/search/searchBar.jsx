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
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          id="search-input"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="'?' for tournaments, ':' for organisers"
          required
          aria-label="Search tournaments and organisers"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {message && <p className="error-message">{message}</p>}

      <div className="search-results">
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                {result.name || result.username || 'No Name'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
