import { injectable } from "inversify";
import { User } from "../entities/user.entity";
import IProfileService from "../interfaces/profile.service.interface";

@injectable()
export default class ProfileService implements IProfileService {
  async createProfile(
    email: string,
    username: string,
    name: string
  ): Promise<User> {
    return new User("", name, username, email);
  }

  async deleteProfile(id: string): Promise<void> {
    // throw new Error("Method not implemented.");
  }

  async getProfile(): Promise<User> {
    console.log("[profile.service] get profile called");
    return new User("", "test", "test123", "test123@test.com");
  }
}
