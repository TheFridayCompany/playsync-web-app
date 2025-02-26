"use client";

import { useState } from "react";
import { useSongs } from "@/app/features/song/presentation/hooks/useSongs";
import SongsList from "@/app/features/song/presentation/components/SongsList";

export default function Search() {
  const { songSearch, songs, loading } = useSongs();
  const [query, setQuery] = useState(""); // State to manage the input value

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    if (query.trim()) {
      songSearch(query); // Pass the query to the songSearch function
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for songs, artists, or podcasts"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query on input change
          className="bg-gray-800 p-2 rounded-md text-white placeholder-gray-500 focus:outline-none"
        />
        <button type="submit" className="text-white">
          Search
        </button>
      </form>

      {loading ? <p>Loading...</p> : <SongsList songs={songs} />}
    </div>
  );
}
