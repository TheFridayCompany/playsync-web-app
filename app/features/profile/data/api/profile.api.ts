import { post, get, del } from "@/app/common/api";
import IProfileApi from "../interfaces/profile.api.interface";
import { User } from "../../domain/entities/user.entity";
import { injectable } from "inversify";

@injectable()
export default class ProfileApi implements IProfileApi {
  async create(
    email: string,
    username: string,
    name: string,
    token: string
  ): Promise<User> {
    const user = await post<User>("/users", { email, username, name }, token);
    return user;
  }

  /**
   * Deletes a user profile by their user ID.
   *
   * @returns A promise that resolves when the profile is deleted.
   */
  async delete(token: string): Promise<void> {
    await del("/users", token);
  }

  /**
   * Fetches the profile details of a user by their user ID.
   *
   * @param userId - The ID of the user whose profile is to be retrieved.
   * @returns A promise that resolves to the profile object containing email, username, and name.
   */
  async getProfile(token: string): Promise<User> {
    return get<User>("/users", token);
  }
}
