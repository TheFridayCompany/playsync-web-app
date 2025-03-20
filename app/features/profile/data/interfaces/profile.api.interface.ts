import { User } from "../../domain/entities/user.entity";

export default interface IProfileApi {
  /**
   * Creates a new profile with the specified email, username, and name.
   *
   * @param username - The username of the user.
   * @param name - The full name of the user.
   * @returns A promise that resolves when the profile is created.
   */
  create(
    email: string,
    username: string,
    name: string,
    token: string
  ): Promise<User>;

  /**
   * Deletes a user profile by their user ID.
   *
   * @param userId - The ID of the user whose profile is to be deleted.
   * @returns A promise that resolves when the profile is deleted.
   */
  delete(token: string): Promise<void>;

  /**
   * Fetches the profile details of a user by their user ID.
   *
   * @param userId - The ID of the user whose profile is to be retrieved.
   * @returns A promise that resolves to the profile object containing email, username, and name.
   */
  getProfile(token: string): Promise<User>;
}
