import { User } from "@/app/features/profile/domain/entities/user.entity";
import useSocial from "@/app/features/social/presentation/hooks/useSocial";
import { useState } from "react";
import UserCard from "../cards/UserCard";
import RemoveFriendButton from "../buttons/RemoveFriendButton";
import AddFriendButton from "../buttons/AddFriendButton";
import UserSearchInput from "../inputs/UserSearchInput";
import { CloseButton } from "../buttons/CloseButton";

interface UserSearchModalProps {
  onClose: () => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({ onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchUsersByUsername, friends, removeFriend, sendRequest } =
    useSocial();

  const handleSearchSubmit = async (query: string) => {
    setIsLoading(true);
    try {
      const users = await searchUsersByUsername(query);
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
      <h2 className="text-2xl text-black font-semibold mb-4">Search Users</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <CloseButton onClick={onClose} />
        <UserSearchInput onSearch={handleSearchSubmit} />

        <ul>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            users.map((user, index) => (
              <UserCard key={user.id} user={user}>
                {friends.some((friend: any) => friend.id == user.id) ? (
                  <RemoveFriendButton onClick={() => removeFriend(user.id)} />
                ) : (
                  <AddFriendButton onClick={() => sendRequest(user.id)} />
                )}
              </UserCard>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserSearchModal;
