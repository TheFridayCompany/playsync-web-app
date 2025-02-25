import { User } from "../entities/user.entity";

/**
 * Interface for managing user profiles.
 */
export default interface IProfileRepository {
  /**
   * Creates a new user profile.
   * @param {string} username - The username chosen by the user.
   * @param {string} name - The full name of the user.
   * @returns {Promise<User>} A promise that resolves to the created user profile.
   */
  createProfile(username: string, name: string): Promise<User>;

  /**
   * Deletes a user profile by ID.
   * @returns {Promise<void>} A promise that resolves when the profile is deleted.
   */
  deleteProfile(): Promise<void>;

  /**
   * Retrieves the current user's profile.
   * @returns {Promise<User>} A promise that resolves with the user's profile data.
   */
  getProfile(): Promise<User>;
}
