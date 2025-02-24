import { AuthUser } from "../entities/auth-user.entity";
import IAuthRepository from "../interfaces/auth.repository.interface";
import IAuthService from "../interfaces/auth.service.interface";
import ITokenPersistenceRepository from "../interfaces/token-persistence.repository.interface";

export default class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenPersistenceRepository: ITokenPersistenceRepository
  ) {}

  getCurrentUser(): Promise<AuthUser | null> {
    return this.authRepository.getCurrentUser();
  }

  async login(): Promise<AuthUser> {
    const authUser = await this.authRepository.signInWithGoogle();

    if (!authUser) {
      throw new Error("Google login failed");
    }

    const tokenExchange = await this.authRepository.exchangeToken(
      authUser?.authToken
    );

    console.log("exchange token: ");
    console.log(tokenExchange);

    await this.tokenPersistenceRepository.saveToken(tokenExchange);

    return authUser;
  }

  async logout(): Promise<void> {
    await Promise.all([
      this.authRepository.signOut(),
      this.tokenPersistenceRepository.clearToken(),
    ]);
  }
}
