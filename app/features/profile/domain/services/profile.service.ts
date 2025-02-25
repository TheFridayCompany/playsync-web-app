import { inject, injectable } from "inversify";
import { User } from "../entities/user.entity";
import IProfileService from "../interfaces/profile.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import type IProfileRepository from "../interfaces/profile.repository.interface";

@injectable()
export default class ProfileService implements IProfileService {
  constructor(
    @inject(SYMBOLS.IProfileRepository)
    private readonly profileRepository: IProfileRepository
  ) {}

  async createProfile(username: string, name: string): Promise<User> {
    return this.profileRepository.createProfile(username, name);
  }

  async deleteProfile(): Promise<void> {
    return this.profileRepository.deleteProfile();
  }

  async getProfile(): Promise<User> {
    console.log("[profile.service] get profile called");
    return this.profileRepository.getProfile();
  }
}
