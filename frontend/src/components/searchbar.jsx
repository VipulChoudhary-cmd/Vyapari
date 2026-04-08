import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="Search for jeans, t-shirts, shoes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 
                   text-gray-100 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                   backdrop-blur-sm transition-all duration-200"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg 
                   hover:bg-emerald-700 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900
                   active:scale-95 flex items-center gap-1"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;