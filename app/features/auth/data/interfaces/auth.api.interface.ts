/**
 * Interface for the Authentication API Gateway.
 * Provides methods to interact with authentication-related API endpoints.
 */
export default interface IAuthApiGateway {
  /**
   * Exchanges a social authentication token (e.g., Google, Facebook)
   * for a backend-issued authentication token.
   *
   * @param {string} socialToken - The social authentication token received from an identity provider.
   * @returns {Promise<string>} - A promise that resolves to the backend-issued authentication token.
   */
  exchangeToken(socialToken: string): Promise<string>;
}
