import { AuthUser } from "../entities/auth-user.entity";

export default interface IAuthService {
  login(): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
}
