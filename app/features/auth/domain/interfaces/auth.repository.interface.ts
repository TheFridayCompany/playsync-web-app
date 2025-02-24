import { AuthUser } from "../entities/auth-user.entity";

export default interface IAuthRepository {
  signInWithGoogle(): Promise<AuthUser | null>;
  getCurrentUser(): Promise<AuthUser | null>;
  exchangeToken(socialToken: string): Promise<string>;
  signOut(): Promise<void>;
}
