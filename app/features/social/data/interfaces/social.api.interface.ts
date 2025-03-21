import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../../domain/entities/friend-request.entity";

export default interface ISocialApi {
  getFriends(token: string): Promise<User[]>;

  getPendingRequests(token: string): Promise<User[]>;

  removeFriend(token: string, friendId: string): Promise<void>;

  sendRequest(token: string, userId: string): Promise<FriendRequest>;

  acceptRequest(token: string, requestId: string): Promise<User>;

  rejectRequest(token: string, requestId: string): Promise<void>;
}
