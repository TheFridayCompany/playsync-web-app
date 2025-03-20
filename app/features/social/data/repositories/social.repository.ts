import { inject, injectable } from "inversify";
import type ISocialRepository from "../../domain/interfaces/social.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import type ISocialApi from "../interfaces/social.api.interface";
import type ITokenPersistenceRepository from "@/app/features/auth/domain/interfaces/token-persistence.repository.interface";

@injectable()
export default class SocialRepository implements ISocialRepository {
  constructor(
    @inject(SYMBOLS.ISocialApi)
    private readonly socialApi: ISocialApi,
    @inject(SYMBOLS.ITokenPersistenceRepository)
    private _tokenPersistenceRepository: ITokenPersistenceRepository
  ) {}

  async getFriends(): Promise<User[]> {
    const token = await this._tokenPersistenceRepository.getToken();
    if (!token) throw new Error("No token found");
    return this.socialApi.getFriends(token);
  }
}
