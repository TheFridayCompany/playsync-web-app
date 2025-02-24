export default interface ITokenPersistenceRepository {
  saveToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
  getToken(): Promise<string | null>;
}
