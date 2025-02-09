'use client';

import React, { useState } from 'react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Handle form submission or search
  const handleSearch = () => {
    console.log('Searching for:', searchQuery); // Display query in console
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-80 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
