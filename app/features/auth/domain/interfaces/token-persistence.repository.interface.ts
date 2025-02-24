/**
 * Interface for Token Persistence Repository.
 * Defines methods for storing, retrieving, and clearing authentication tokens.
 */
export default interface ITokenPersistenceRepository {
  /**
   * Saves the authentication token.
   *
   * @param {string} token - The authentication token to be stored.
   * @returns {Promise<void>} - A promise that resolves when the token is successfully saved.
   */
  saveToken(token: string): Promise<void>;

  /**
   * Clears the stored authentication token.
   *
   * @returns {Promise<void>} - A promise that resolves when the token is successfully removed.
   */
  clearToken(): Promise<void>;

  /**
   * Retrieves the stored authentication token.
   *
   * @returns {Promise<string | null>} - A promise that resolves to the stored token as a string, or `null` if no token is found.
   */
  getToken(): Promise<string | null>;
}
