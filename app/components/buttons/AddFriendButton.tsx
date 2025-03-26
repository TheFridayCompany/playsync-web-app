import React from "react";

interface AddFriendButtonProps {
  onClick: () => void;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
    >
      Add Friend
    </button>
  );
};

export default AddFriendButton;
