import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../entities/friend-request.entity";
import ISocialService from "../interfaces/social.service.interface";
import { inject, injectable } from "inversify";
import { SYMBOLS } from "@/app/common/di/symbols";
import type ISocialRepository from "../interfaces/social.repository.interface";

@injectable()
export default class SocialService implements ISocialService {
  constructor(
    @inject(SYMBOLS.ISocialRepository)
    private readonly socialRepository: ISocialRepository
  ) {}

  searchUsersByUsername(query: string): Promise<User[]> {
    const processedQuery = query.trim();

    if (!processedQuery) {
      return Promise.resolve([]);
    }

    return this.socialRepository.searchUsersByUsername(processedQuery);
  }

  async getFriends(): Promise<User[]> {
    const response = await this.socialRepository.getFriends();
    console.log(JSON.stringify(response));
    return response;
  }

  removeFriend(friendId: string): Promise<void> {
    return this.socialRepository.removeFriend(friendId);
  }

  getPendingRequests(): Promise<FriendRequest[]> {
    return this.socialRepository.getPendingFriendRequests();
  }

  sendRequest(userId: string): Promise<FriendRequest> {
    return this.socialRepository.sendRequest(userId);
  }

  async acceptRequest(requestId: string): Promise<User> {
    return this.socialRepository.acceptRequest(requestId);
  }

  rejectRequest(requestId: string): Promise<void> {
    return this.socialRepository.rejectRequest(requestId);
  }
}
