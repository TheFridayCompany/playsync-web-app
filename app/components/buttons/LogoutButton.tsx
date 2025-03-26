import React from "react";

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <button className="text-green-400" onClick={onClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
