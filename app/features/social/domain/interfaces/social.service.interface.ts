import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../entities/friend-request.entity";

export default interface ISocialService {
  getFriends(): Promise<User[]>;

  getPendingRequests(): Promise<FriendRequest[]>;

  removeFriend(friendId: string): Promise<void>;

  sendRequest(userId: string): Promise<FriendRequest>;

  acceptRequest(requestId: string): Promise<User>;

  rejectRequest(requestId: string): Promise<void>;

  searchUsersByUsername(query: string): Promise<User[]>;
}
