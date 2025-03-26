import React from "react";

interface SearchUsersButtonProps {
  onClick: () => void;
}

const SearchUsersButton: React.FC<SearchUsersButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Search Users
    </button>
  );
};

export default SearchUsersButton;
