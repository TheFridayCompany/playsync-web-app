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

  getFriends(): Promise<User[]> {
    return this.socialRepository.getFriends();
  }

  getPendingRequests(): Promise<FriendRequest[]> {
    throw new Error("Method not implemented.");
  }

  acceptRequest(friendRequest: FriendRequest): Promise<User> {
    throw new Error("Method not implemented.");
  }

  rejectRequest(friendRequest: FriendRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
