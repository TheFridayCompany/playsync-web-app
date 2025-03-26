import React from "react";

interface DeleteProfileButtonProps {
  onClick: () => void;
}

const DeleteProfileButton: React.FC<DeleteProfileButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fill="currentColor"
          d="M10 1C5.03 1 1 5.03 1 10s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.53 0-6.43-2.91-6.43-6.43s2.9-6.43 6.43-6.43c3.53 0 6.43 2.91 6.43 6.43s-2.9 6.43-6.43 6.43zm1-6.93l-3.12 3.13c-.28.28-.73.29-1.02 0L5.47 10.5c-.28-.29-.29-.73-.01-1.02l.99-.99c.29-.28.74-.28 1.02 0l1.46 1.45 2.47-2.47c.29-.29.74-.29 1.02 0l.99.99c.28.29.29.73.01 1.02z"
        />
      </svg>
      <span>Delete Profile</span>
    </button>
  );
};

export default DeleteProfileButton;
