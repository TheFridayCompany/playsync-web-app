import React from "react";

interface RemoveFriendButtonProps {
  onClick: () => void; // Function to call when the button is clicked
}

const RemoveFriendButton: React.FC<RemoveFriendButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
    >
      Remove Friend
    </button>
  );
};

export default RemoveFriendButton;
