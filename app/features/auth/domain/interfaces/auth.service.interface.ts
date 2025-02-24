import { AuthUser } from "../entities/auth-user.entity";

/**
 * Interface for the Authentication Service.
 * Defines methods for handling user authentication and session management.
 */
export default interface IAuthService {
  /**
   * Logs in the user using the available authentication method.
   *
   * @returns {Promise<AuthUser>} - A promise that resolves to an `AuthUser` object representing the authenticated user.
   * @throws {Error} - If the login process fails.
   */
  login(): Promise<AuthUser>;

  /**
   * Logs out the currently authenticated user.
   *
   * @returns {Promise<void>} - A promise that resolves when the user has been successfully logged out.
   */
  logout(): Promise<void>;

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns {Promise<AuthUser | null>} - A promise that resolves to an `AuthUser` object if a user is authenticated, or `null` if no user is logged in.
   */
  getCurrentUser(): Promise<AuthUser | null>;
}
