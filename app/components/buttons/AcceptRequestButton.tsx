import React from "react";

interface AcceptRequestButtonProps {
  onClick: () => void; // Function to handle accepting request
}

const AcceptRequestButton: React.FC<AcceptRequestButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Accept Request
    </button>
  );
};

export default AcceptRequestButton;
