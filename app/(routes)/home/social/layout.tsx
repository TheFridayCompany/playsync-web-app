"use client";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import useSocial from "@/app/features/social/presentation/hooks/useSocial";
import React, { useEffect, useState } from "react";

export default function FriendsLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchFriends, friends, isLoading } = useSocial();

  useEffect(() => {
    fetchFriends();
  }, []);

  // Sample data for friends and pending requests (this would usually come from your state or API)
  // const friends = ["Alice", "Bob", "Charlie", "David"];
  const pendingRequests = ["Eve", "Frank"];

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Button to open modal */}
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Search Users
      </button>

      {/* Modal to search for users */}
      {isModalOpen && <Modal onClose={toggleModal} />}

      <div className="flex justify-between space-x-6">
        {/* Left side - Current Friends */}
        <div className="flex-1 p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Friends</h2>
          <ul className="space-y-2">
            {(friends as User[]).map((friend, index) => (
              <li key={index} className="text-gray-700">
                {friend.username}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Pending Friend Requests */}
        <div className="flex-1 p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          <ul className="space-y-2">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request, index) => (
                <li key={index} className="text-gray-700">
                  {request}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No pending requests</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for users:", searchQuery);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-black z-10"
        >
          &times;
        </button>
        <h2 className="text-2xl text-black font-semibold mb-4">Search Users</h2>
        <form onSubmit={handleSearchSubmit} className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by username"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
