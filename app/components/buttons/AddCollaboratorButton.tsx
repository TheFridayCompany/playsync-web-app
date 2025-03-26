import React from "react";

interface AddCollaboratorButtonProps {
  onClick: () => void; // Function to handle adding collaborator
}

const AddCollaboratorButton: React.FC<AddCollaboratorButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Add Collaborator
    </button>
  );
};

export default AddCollaboratorButton;
