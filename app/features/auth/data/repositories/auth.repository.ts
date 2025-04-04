import { inject, injectable } from "inversify";
import { AuthUser } from "../../domain/entities/auth-user.entity";
import IAuthRepository from "../../domain/interfaces/auth.repository.interface";
import type IAuthApiGateway from "../interfaces/auth.api.interface";
import type IAuthGateway from "../interfaces/auth.gateway.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { isMobile } from "react-device-detect";

@injectable()
export default class AuthRepository implements IAuthRepository {
  constructor(
    @inject(SYMBOLS.IAuthGateway) private readonly authGateway: IAuthGateway,
    @inject(SYMBOLS.IAuthApiGateway) private readonly authApi: IAuthApiGateway
  ) {}

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return this.authGateway.onAuthStateChanged(callback);
  }

  getCurrentUser(): Promise<AuthUser | null> {
    return this.authGateway.checkAuthStatus();
  }

  async exchangeToken(socialToken: string): Promise<string> {
    return this.authApi.exchangeToken(socialToken);
  }

  async signInWithGoogle(): Promise<AuthUser | null> {
    if (isMobile) {
      return this.authGateway.signInWithGoogleRedirect();
    }

    return this.authGateway.signInWithGooglePopup();
  }

  async signOut(): Promise<void> {
    await this.authGateway.signOut();
  }
}
