import { inject, injectable } from "inversify";
import { User } from "../../domain/entities/user.entity";
import IProfileRepository from "../../domain/interfaces/profile.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import type ITokenPersistenceRepository from "@/app/features/auth/domain/interfaces/token-persistence.repository.interface";
import type IProfileApi from "../interfaces/profile.api.interface";

@injectable()
export default class ProfileRepository implements IProfileRepository {
  constructor(
    @inject(SYMBOLS.ITokenPersistenceRepository)
    private readonly tokenPersistenceRepository: ITokenPersistenceRepository,
    @inject(SYMBOLS.IProfileApi)
    private readonly profileApi: IProfileApi
  ) {}

  private async getToken(): Promise<string> {
    const token = await this.tokenPersistenceRepository.getToken();
    if (!token) throw new Error("Could not find JWT token");
    return token;
  }

  async createProfile(username: string, name: string): Promise<User> {
    const token = await this.getToken();

    // TODO: pass email
    const user = await this.profileApi.create(username, name, token);
    return user;
  }

  async deleteProfile(): Promise<void> {
    const token = await this.getToken();
    await this.profileApi.delete(token);
  }

  async getProfile(): Promise<User> {
    const token = await this.getToken();
    return this.profileApi.getProfile(token);
  }
}
