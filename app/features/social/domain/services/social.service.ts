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

  async acceptRequest(requestId: string): Promise<User> {
    const response = await this.socialRepository.acceptRequest(requestId);
    throw new Error("Method not implemented.");
  }

  rejectRequest(requestId: string): Promise<void> {
    return this.socialRepository.rejectRequest(requestId);
  }
}
