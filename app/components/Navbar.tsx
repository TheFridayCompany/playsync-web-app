"use client";
import React from "react";
import { useSelector } from "react-redux";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const { profile, isLoading } = useSelector((state: any) => state.profile);

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between">
      {/* Right: Profile/Logout options */}
      <div className="flex items-center space-x-6">
        {!isLoading && profile && (
          <div className="text-lg">{profile.username}</div>
        )}
        <button className="text-green-400" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
