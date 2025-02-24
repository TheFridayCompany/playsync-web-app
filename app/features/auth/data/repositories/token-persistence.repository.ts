import ITokenPersistenceRepository from "../../domain/interfaces/token-persistence.repository.interface";

export default class LocalStorageTokenPersistenceRepository
  implements ITokenPersistenceRepository
{
  private readonly key = "token";

  async saveToken(token: string): Promise<void> {
    localStorage.setItem(this.key, token);
  }

  async clearToken(): Promise<void> {
    localStorage.removeItem(this.key);
  }

  async getToken(): Promise<string | null> {
    return localStorage.getItem(this.key);
  }
}
