import React from "react";

interface RejectRequestButtonProps {
  onClick: () => void; // Function to handle rejecting request
}

const RejectRequestButton: React.FC<RejectRequestButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Reject Request
    </button>
  );
};

export default RejectRequestButton;
