import { AuthUser } from "../../domain/entities/auth-user.entity";

/**
 * Interface for the Authentication Gateway.
 * Provides methods to interact with authentication providers such as Firebase.
 */
export default interface IAuthGateway {
  /**
   * Signs in the user using Google authentication.
   *
   * @returns {Promise<AuthUser | null>} - A promise that resolves to an `AuthUser` object if sign-in is successful, or `null` if it fails.
   */
  signInWithGoogle(): Promise<AuthUser | null>;

  /**
   * Checks the current authentication status of the user.
   *
   * @returns {Promise<AuthUser | null>} - A promise that resolves to an `AuthUser` object if a user is authenticated, or `null` if no user is logged in.
   */
  checkAuthStatus(): Promise<AuthUser | null>;

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
