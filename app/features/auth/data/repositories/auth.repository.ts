import { AuthUser } from "../../domain/entities/auth-user.entity";
import IAuthRepository from "../../domain/interfaces/auth.repository.interface";
import IAuthApiGateway from "../interfaces/auth.api.interface";
import IAuthGateway from "../interfaces/auth.gateway.interface";

export default class AuthRepository implements IAuthRepository {
  constructor(
    private readonly authGateway: IAuthGateway,
    private readonly authApi: IAuthApiGateway
  ) {}

  getCurrentUser(): Promise<AuthUser | null> {
    return this.authGateway.checkAuthStatus();
  }

  async exchangeToken(socialToken: string): Promise<string> {
    return this.authApi.exchangeToken(socialToken);
  }

  async signInWithGoogle(): Promise<AuthUser | null> {
    return this.authGateway.signInWithGoogle();
  }

  async signOut(): Promise<void> {
    await this.authGateway.signOut();
  }
}
