import { User } from "@/app/features/profile/domain/entities/user.entity";
import UserCard from "../cards/UserCard";
import AddCollaboratorButton from "../buttons/AddCollaboratorButton";
import { CloseTextButton } from "../buttons/CloseButton";

const AddCollaboratorModal = ({
  isOpen,
  onClose,
  onAddCollaborator,
  friends,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddCollaborator: (userId: string) => void;
  friends: User[];
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Add Collaborator
        </h2>
        <ul>
          {friends.map((friend) => (
            <UserCard user={friend} key={friend.id}>
              <AddCollaboratorButton
                onClick={() => onAddCollaborator(friend.id)}
              />
            </UserCard>
          ))}
        </ul>
        <CloseTextButton onClick={onClose} />
      </div>
    </div>
  );
};

export default AddCollaboratorModal;
