"use client";
import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../buttons/LogoutButton";

interface NavbarProps {
  children?: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const { profile, isLoading } = useSelector((state: any) => state.profile);

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between">
      {/* Left: Any other items could be added here */}
      <div className="flex items-center space-x-6">
        {!isLoading && profile && (
          <div className="text-lg">{profile.username}</div>
        )}
      </div>

      {/* Right: Render injected LogoutButton */}
      <div className="flex items-center space-x-6">{children}</div>
    </header>
  );
}
