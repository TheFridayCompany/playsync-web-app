import React, { useState } from "react";

interface SongSearchInputProps {
  onSearch: (query: string) => void; // Callback function to handle search query
  placeholder?: string; // Optional placeholder to customize the text inside the input
}

const SongSearchInput: React.FC<SongSearchInputProps> = ({
  onSearch,
  placeholder = "Search for songs, artists, or podcasts",
}) => {
  const [query, setQuery] = useState<string>(""); // Local state to manage the search query

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery); // Update the query as the user types
  };

  // Handle form submission (e.g., pressing Enter)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    if (query.trim()) {
      onSearch(query); // Trigger the search if the query is not empty
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="bg-gray-800 p-2 rounded-md text-white placeholder-gray-500 focus:outline-none"
      />
    </form>
  );
};

export default SongSearchInput;
