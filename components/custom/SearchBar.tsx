'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query);
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
<div className="relative w-full">
  {/* Search Icon */}
  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg 
      className="w-4 h-4 text-beige-400 transition-colors duration-200" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  </div>

  {/* Input Field */}
  <input
    type="text"
    placeholder="Search...."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full pl-10 pr-10 py-3 
               bg-white border-2 border-beige-200 rounded-lg
               font-vintage text-vintage-brown placeholder-beige-400
               shadow-sm transition-all duration-200 ease-in-out
               hover:border-beige-300 hover:shadow-md
               focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/20 
               focus:bg-white focus:outline-none focus:shadow-md
               sm:text-sm"
  />

  {/* Clear Button */}
  {query && (
    <button
      onClick={() => setQuery('')}
      className="absolute right-3 top-1/2 -translate-y-1/2 
                 p-1 rounded-full text-beige-400 hover:text-vintage-brown 
                 hover:bg-beige-100 transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-vintage-sage/20"
      aria-label="Clear search"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )}
</div>
  );
};
