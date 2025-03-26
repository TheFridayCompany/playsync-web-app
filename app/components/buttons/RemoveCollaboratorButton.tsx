import React from "react";

interface RemoveCollaboratorButtonProps {
  onClick: () => void; // Function to handle removing collaborator
}

const RemoveCollaboratorButton: React.FC<RemoveCollaboratorButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Remove Collaborator
    </button>
  );
};

export default RemoveCollaboratorButton;
