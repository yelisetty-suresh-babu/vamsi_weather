import React, { useState } from 'react';
import './App.css'
const CitySearch = ({ setCity }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      setCity(query);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search city"
        value={query}
        onChange={(e) => setQuery(e.target.value)
        }
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CitySearch;
