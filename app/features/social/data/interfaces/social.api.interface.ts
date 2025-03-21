import { User } from "@/app/features/profile/domain/entities/user.entity";

export default interface ISocialApi {
  getFriends(token: string): Promise<User[]>;

  getPendingRequests(token: string): Promise<User[]>;

  removeFriend(token: string, friendId: string): Promise<void>;

  acceptRequest(token: string, requestId: string): Promise<void>;

  rejectRequest(token: string, requestId: string): Promise<void>;
}
