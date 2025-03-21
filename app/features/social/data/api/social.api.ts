import { del, get, post } from "@/app/common/api";
import { injectable } from "inversify";
import ISocialApi from "../interfaces/social.api.interface";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../../domain/entities/friend-request.entity";

@injectable()
export default class SocialApi implements ISocialApi {
  async getFriends(token: string): Promise<User[]> {
    const response = await get<User[]>("/friendship", token);
    console.log(JSON.stringify(response));
    return response;
  }

  async getPendingRequests(token: string): Promise<User[]> {
    const response = await get<User[]>("/friend-request", token);
    return response;
  }

  async removeFriend(token: string, friendId: string): Promise<void> {
    console.log("Removing friend with id: ", friendId);
    await del("/friendship", token, { friendId });
  }

  sendRequest(token: string, userId: string): Promise<FriendRequest> {
    return post<FriendRequest>(
      "/friend-request",
      { receiverId: userId },
      token
    );
  }

  async acceptRequest(token: string, requestId: string): Promise<User> {
    return post<User>(`/friend-request/${requestId}/accept`, {}, token);
  }

  async rejectRequest(token: string, requestId: string): Promise<void> {
    await post(`/friend-request/${requestId}/reject`, {}, token);
  }
}
