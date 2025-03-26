import { User } from "@/app/features/profile/domain/entities/user.entity";
import React, { ReactNode } from "react";

interface UserCardProps {
  user: User;
  children?: ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({ user, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-sm">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {user.username}
          </h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Injected Children (e.g., Action Button) */}
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default UserCard;
