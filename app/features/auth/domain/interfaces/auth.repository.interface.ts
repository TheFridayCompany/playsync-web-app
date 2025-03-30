import { AuthUser } from "../entities/auth-user.entity";

/**
 * Interface for the Authentication Repository.
 * Defines methods for handling authentication-related operations.
 */
export default interface IAuthRepository {
  /**
   * Signs in the user using Google authentication.
   *
   * @returns {Promise<AuthUser | null>} - A promise that resolves to an `AuthUser` object if sign-in is successful, or `null` if it fails.
   */
  signInWithGoogle(): Promise<AuthUser | null>;

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns {Promise<AuthUser | null>} - A promise that resolves to an `AuthUser` object if a user is authenticated, or `null` if no user is logged in.
   */
  getCurrentUser(): Promise<AuthUser | null>;

  /**
   * Exchanges a social authentication token for a backend-issued token.
   *
   * @param {string} socialToken - The social authentication token obtained from a provider (e.g., Google).
   * @returns {Promise<string>} - A promise that resolves to a backend-issued authentication token.
   */
  exchangeToken(socialToken: string): Promise<string>;

  /**
   * Signs out the currently authenticated user.
   *
   * @returns {Promise<void>} - A promise that resolves when the sign-out process is complete.
   */
  signOut(): Promise<void>;

  /**
   * Subscribes to authentication state changes.
   *
   * @param callback - A function that receives an `AuthUser` object when the authentication state changes.
   * @returns {() => void} - A function to unsubscribe from authentication state changes.
   */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}
