import React from "react";

interface AddSongToPlaylistButtonProps {
  onClick: () => void; // Function to handle adding the song to the playlist
}

const AddSongToPlaylistButton: React.FC<AddSongToPlaylistButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Add to Playlist
    </button>
  );
};

export default AddSongToPlaylistButton;
