import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/slices/recipesSlice';
import { setSearchQuery } from '../store/slices/filtersSlice';
import type { AppDispatch } from '../store/store';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
    dispatch(fetchRecipes({ query }));
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        />
        <button
          type="submit"
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <Search className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </form>
  );
}