import { User } from "@/app/features/profile/domain/entities/user.entity";

export default interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  createdAt: Date;
  updatedAt: Date;
}
