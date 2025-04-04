"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Sidebar from "@/app/components/navigation/Sidebar";
import Navbar from "@/app/components/navigation/Navbar";
import useAuth from "@/app/features/auth/presentation/hooks/useAuth";
import { useProfile } from "@/app/features/profile/presentation/hooks/useProfile.hook";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import useSocial from "@/app/features/social/presentation/hooks/useSocial";
import LogoutButton from "@/app/components/buttons/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const { fetchPlaylists } = usePlaylists();
  const { fetchFriends } = useSocial();

  useEffect(() => {
    console.log("profile changed: ");
    console.log(JSON.stringify(profile));
    if (profile) {
      fetchPlaylists();
      fetchFriends();
    }
  }, [profile]);

  return (
    <div className={`flex h-screen ${inter.className} bg-gray-900`}>
      {/* Sidebar for Navigation */}
      <div className="w-64 bg-black text-white h-full fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navbar */}
        <Navbar>
          <LogoutButton onClick={signOut} />
        </Navbar>

        {/* Main Content Section */}
        <main className="flex-1 overflow-auto p-6 bg-gray-800 text-white">
          {children} {/* Content will be injected here */}
        </main>
      </div>
    </div>
  );
}
