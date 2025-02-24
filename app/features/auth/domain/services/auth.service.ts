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

  getCurrentUser(): Promise<AuthUser | null> {
    return this._authRepository.getCurrentUser();
  }

  async login(): Promise<AuthUser> {
    const authUser = await this._authRepository.signInWithGoogle();

    if (!authUser) {
      throw new Error("Google login failed");
    }

    const tokenExchange = await this._authRepository.exchangeToken(
      authUser?.authToken
    );

    console.log("exchange token: ");
    console.log(tokenExchange);

    await this._tokenPersistenceRepository.saveToken(tokenExchange);

    return authUser;
  }

  async logout(): Promise<void> {
    await Promise.all([
      this._authRepository.signOut(),
      this._tokenPersistenceRepository.clearToken(),
    ]);
  }
}
