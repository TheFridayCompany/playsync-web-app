import React from "react";

interface RemoveSongButtonProps {
  songId: string; // The ID of the song to be removed
  onRemove: (songId: string) => void; // Function to handle the removal
}

const RemoveSongButton: React.FC<RemoveSongButtonProps> = ({
  songId,
  onRemove,
}) => {
  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this song?")) {
      onRemove(songId);
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Remove Song
    </button>
  );
};

export default RemoveSongButton;
