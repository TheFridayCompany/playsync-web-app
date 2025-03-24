"use client";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import { useProfile } from "@/app/features/profile/presentation/hooks/useProfile.hook";
import FriendRequest from "@/app/features/social/domain/entities/friend-request.entity";
import useSocial from "@/app/features/social/presentation/hooks/useSocial";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FriendsLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    fetchFriends,
    fetchPendingRequests,
    removeFriend,
    sendRequest,
    acceptRequest,
    rejectRequest,
    friends,
    pendingRequests,
  } = useSocial();

  const { profile } = useSelector((state: any) => state.profile);

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
  }, []);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Button to open modal */}

      <button onClick={() => sendRequest("67aab03b833f69d4e6bf7d25")}>
        Send request
      </button>
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
                <button
                  onClick={() => removeFriend(friend.id)}
                  className="text-red-500"
                >
                  Remove friend
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Pending Friend Requests */}
        <div className="flex-1 p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          <ul className="space-y-2">
            {pendingRequests.length > 0 ? (
              (pendingRequests as FriendRequest[]).map((request, index) => (
                <li key={request.id} className="text-gray-700">
                  {request.sender.username}
                  {request.sender.id != profile.id && (
                    <>
                      <button
                        className="text-green-500"
                        onClick={(_) => acceptRequest(request.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="text-red-500"
                        onClick={(_) => rejectRequest(request.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
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
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchUsersByUsername, friends, removeFriend, sendRequest } =
    useSocial();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for users:", searchQuery);
    setIsLoading(true);
    try {
      const users = await searchUsersByUsername(searchQuery);
      console.log("printing users in presentation layer");
      console.log(users);
      if (users) setUsers(users);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
            className="text-black w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Search
          </button>
        </form>

        <ul>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            users.map((user, index) => (
              <p key={user.id} className="text-black">
                {user.username}
                {friends.some((friend: any) => friend.id == user.id) ? (
                  <button
                    className="text-red-500"
                    onClick={(_) => removeFriend(user.id)}
                  >
                    Remove Friend
                  </button>
                ) : (
                  <button
                    className="text-green-500"
                    onClick={(_) => sendRequest(user.id)}
                  >
                    Add Friend
                  </button>
                )}
              </p>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
