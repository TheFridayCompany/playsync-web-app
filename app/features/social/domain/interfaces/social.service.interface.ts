import { User } from "@/app/features/profile/domain/entities/user.entity";

export default interface ISocialService {
  getFriends(): Promise<User[]>;

  getPendingRequests(): Promise<any[]>;

  removeFriend(friendId: string): Promise<void>;

  acceptRequest(requestId: string): Promise<User>;

  rejectRequest(requestId: string): Promise<void>;
}
