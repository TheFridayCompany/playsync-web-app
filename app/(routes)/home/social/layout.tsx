"use client";
import AcceptRequestButton from "@/app/components/buttons/AcceptRequestButton";
import RejectRequestButton from "@/app/components/buttons/RejectRequestButton";
import RemoveFriendButton from "@/app/components/buttons/RemoveFriendButton";
import SearchUsersButton from "@/app/components/buttons/SearchUsersButton";
import UserCard from "@/app/components/cards/UserCard";
import UserSearchModal from "@/app/components/modals/UsersSearchModal";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "@/app/features/social/domain/entities/friend-request.entity";
import useSocial from "@/app/features/social/presentation/hooks/useSocial";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FriendsLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
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
    fetchPendingRequests();
  }, []);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Button to open modal */}
      <SearchUsersButton onClick={toggleModal} />

      {/* Modal to search for users */}
      {isModalOpen && <UserSearchModal onClose={toggleModal} />}

      <div className="flex justify-between space-x-6">
        {/* Left side - Current Friends */}
        <div className="flex-1 p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Friends</h2>
          <ul className="space-y-2">
            {(friends as User[]).map((friend) => (
              <UserCard key={friend.id} user={friend}>
                <RemoveFriendButton onClick={() => removeFriend(friend.id)} />
              </UserCard>
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
                  {request.sender.id == profile.id
                    ? request.receiver.username
                    : request.sender.username}
                  {request.sender.id != profile.id && (
                    <>
                      <AcceptRequestButton
                        onClick={() => acceptRequest(request.id)}
                      />
                      <RejectRequestButton
                        onClick={() => rejectRequest(request.id)}
                      />
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
