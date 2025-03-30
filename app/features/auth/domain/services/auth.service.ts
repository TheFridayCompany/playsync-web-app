import { inject, injectable } from "inversify";
import { AuthUser } from "../entities/auth-user.entity";
import type IAuthRepository from "../interfaces/auth.repository.interface";
import IAuthService from "../interfaces/auth.service.interface";
import type ITokenPersistenceRepository from "../interfaces/token-persistence.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";

@injectable()
export default class AuthService implements IAuthService {
  constructor(
    @inject(SYMBOLS.IAuthRepository) private _authRepository: IAuthRepository,
    @inject(SYMBOLS.ITokenPersistenceRepository)
    private _tokenPersistenceRepository: ITokenPersistenceRepository
  ) {}

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    this._authRepository.onAuthStateChanged(callback);
    return () => {
      this._authRepository.onAuthStateChanged(() => {});
    };
  }

  async exchangeAndSaveToken(socialToken: string) {
    const tokenExchange = await this._authRepository.exchangeToken(socialToken);

    console.log("exchange token: ");
    console.log(tokenExchange);

    await this._tokenPersistenceRepository.saveToken(tokenExchange);
  }

  getCurrentUser(): Promise<AuthUser | null> {
    return this._authRepository.getCurrentUser();
  }

  async login(): Promise<AuthUser> {
    console.log("[auth.service] login called");
    const currentUser = await this._authRepository.signInWithGoogle();

    if (!currentUser) throw new Error("Google sign in failed");

    await this.exchangeAndSaveToken(currentUser.authToken);

    return currentUser;
  }

  async logout(): Promise<void> {
    console.log("[auth.service] logout called");

    await Promise.all([
      this._authRepository.signOut(),
      this._tokenPersistenceRepository.clearToken(),
    ]);
  }
}
