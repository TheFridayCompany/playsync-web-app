import React from "react";

interface CreateAccountButtonProps {
  isSubmitting: boolean; // To disable the button while submitting
}

const CreateAccountButton: React.FC<CreateAccountButtonProps> = ({
  isSubmitting,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
    >
      {isSubmitting ? "Submitting..." : "Create Account"}
    </button>
  );
};

export default CreateAccountButton;
