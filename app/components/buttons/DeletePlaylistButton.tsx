import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
}

const DeletePlaylistButton: React.FC<DeleteButtonProps> = ({
  onClick,
  label,
}) => {
  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-red-500 text-black rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {label}
      </button>
    </div>
  );
};

export default DeletePlaylistButton;
