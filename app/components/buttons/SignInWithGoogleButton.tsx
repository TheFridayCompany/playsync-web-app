import React from "react";

interface SignInWithGoogleButtonProps {
  onClick: () => void;
}

const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          d="M10 1C5.03 1 1 5.03 1 10s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-.22 13.48c-1.24 0-2.21-.88-2.43-2.07h-2.66v3.02h2.84c-.11.57-.42 1.05-.83 1.41a3.09 3.09 0 0 1-1.33.52c-.05.01-.1.01-.15.01zm0-3.48c-.61 0-1.14-.17-1.6-.44a2.13 2.13 0 0 1-.78-.7 2.12 2.12 0 0 1-.29-1.38c.01-.5.18-.97.47-1.36a2.05 2.05 0 0 1 1.34-.56c.5 0 .96.17 1.34.47a2.1 2.1 0 0 1 .57 1.34c0 .49-.18.96-.49 1.32-.33.37-.75.66-1.24.85a2.06 2.06 0 0 1-.95.22z"
        />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};

export default SignInWithGoogleButton;
