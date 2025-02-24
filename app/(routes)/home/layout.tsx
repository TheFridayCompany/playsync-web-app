"use client";
import React from "react";
import { Inter } from "next/font/google"; // Import font for styling
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/common/firebase";

const inter = Inter({ subsets: ["latin"] });
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const logoutUser = async () => {
    try {
      // TODO: logout user
      await signOut(auth);
      router.replace("/login");
      // Additional logout logic (e.g., redirecting, clearing session)
    } catch (error) {
      console.error("Error signing out: ", error);
      throw error; // Handle or propagate error as needed
    }
  };

  return (
    <div className={`flex h-screen ${inter.className} bg-gray-900`}>
      {/* Sidebar for Navigation */}
      <div className="w-64 bg-black text-white h-full fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navbar */}
        <Navbar onLogout={logoutUser} />

        {/* Main Content Section */}
        <main className="flex-1 overflow-auto p-6 bg-gray-800 text-white">
          {children} {/* Content will be injected here */}
        </main>
      </div>
    </div>
  );
}
