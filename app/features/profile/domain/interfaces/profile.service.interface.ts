import { User } from "../entities/user.entity";

/**
 * Interface for managing user profiles.
 */
export default interface IProfileService {
  /**
   * Creates a new user profile.
   * @param {string} email - The email address of the user.
   * @param {string} username - The username chosen by the user.
   * @param {string} name - The full name of the user.
   * @returns {Promise<User>} A promise that resolves to the created user profile.
   */
  createProfile(email: string, username: string, name: string): Promise<User>;

  /**
   * Deletes a user profile by ID.
   * @param {string} id - The unique identifier of the user profile to delete.
   * @returns {Promise<void>} A promise that resolves when the profile is deleted.
   */
  deleteProfile(id: string): Promise<void>;

  /**
   * Retrieves the current user's profile.
   * @returns {Promise<User>} A promise that resolves with the user's profile data.
   */
  getProfile(): Promise<User>;
}
