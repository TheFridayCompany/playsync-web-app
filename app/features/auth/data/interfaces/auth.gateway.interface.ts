import { AuthUser } from "../../domain/entities/auth-user.entity";

export default interface IAuthGateway {
  signInWithGoogle(): Promise<AuthUser | null>;
  checkAuthStatus(): Promise<AuthUser | null>;
  signOut(): Promise<void>;
}
