import { inject, injectable } from "inversify";
import { AuthUser } from "../../domain/entities/auth-user.entity";
import IAuthRepository from "../../domain/interfaces/auth.repository.interface";
import type IAuthApiGateway from "../interfaces/auth.api.interface";
import type IAuthGateway from "../interfaces/auth.gateway.interface";
import { SYMBOLS } from "@/app/common/di/symbols";

@injectable()
export default class AuthRepository implements IAuthRepository {
  constructor(
    @inject(SYMBOLS.IAuthGateway) private readonly authGateway: IAuthGateway,
    @inject(SYMBOLS.IAuthApiGateway) private readonly authApi: IAuthApiGateway
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
