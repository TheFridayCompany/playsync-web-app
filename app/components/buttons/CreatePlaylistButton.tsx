import React from "react";

interface CreatePlaylistButtonProps {
  onClick: () => void; // Callback function when the button is clicked
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Create Playlist
    </button>
  );
};

export default CreatePlaylistButton;
