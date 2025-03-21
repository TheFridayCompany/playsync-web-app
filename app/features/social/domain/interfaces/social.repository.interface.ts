import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../entities/friend-request.entity";

export default interface ISocialRepository {
  getFriends(): Promise<User[]>;

  getPendingFriendRequests(): Promise<FriendRequest[]>;

  removeFriend(friendId: string): Promise<void>;

  acceptRequest(requestId: string): Promise<void>;

  rejectRequest(requestId: string): Promise<void>;
}
