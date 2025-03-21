import { inject, injectable } from "inversify";
import type ISocialRepository from "../../domain/interfaces/social.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import type ISocialApi from "../interfaces/social.api.interface";
import type ITokenPersistenceRepository from "@/app/features/auth/domain/interfaces/token-persistence.repository.interface";
import FriendRequest from "../../domain/entities/friend-request.entity";

@injectable()
export default class SocialRepository implements ISocialRepository {
  constructor(
    @inject(SYMBOLS.ISocialApi)
    private readonly socialApi: ISocialApi,
    @inject(SYMBOLS.ITokenPersistenceRepository)
    private _tokenPersistenceRepository: ITokenPersistenceRepository
  ) {}

  async getFriends(): Promise<User[]> {
    const token = await this.getTokenOrThrow();
    return this.socialApi.getFriends(token);
  }

  async getPendingFriendRequests(): Promise<any[]> {
    const token = await this.getTokenOrThrow();
    return this.socialApi.getPendingRequests(token);
  }

  async removeFriend(friendId: string): Promise<void> {
    const token = await this.getTokenOrThrow();
    return this.socialApi.removeFriend(token, friendId);
  }

  async acceptRequest(requestId: string): Promise<void> {
    const token = await this.getTokenOrThrow();
    return this.socialApi.acceptRequest(token, requestId);
  }

  async rejectRequest(requestId: string): Promise<void> {
    const token = await this.getTokenOrThrow();
    return this.socialApi.removeFriend(token, requestId);
  }

  private async getTokenOrThrow(): Promise<string> {
    const token = await this._tokenPersistenceRepository.getToken();
    if (!token) throw new Error("No token found");
    return token;
  }
}
