import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../entities/friend-request.entity";

export default interface ISocialService {
  getFriends(): Promise<User[]>;

  getPendingRequests(): Promise<FriendRequest[]>;

  acceptRequest(friendRequest: FriendRequest): Promise<User>;

  rejectRequest(friendRequest: FriendRequest): Promise<void>;
}
