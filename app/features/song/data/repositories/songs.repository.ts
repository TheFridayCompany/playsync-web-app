import { inject, injectable } from "inversify";
import Song from "../../domain/entities/song.entity";
import ISongsRepository from "../../domain/interfaces/songs.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import type ISongsApi from "../interfaces/songs.api.interface";
import type ITokenPersistenceRepository from "@/app/features/auth/domain/interfaces/token-persistence.repository.interface";

@injectable()
export default class SongsRepository implements ISongsRepository {
  constructor(
    @inject(SYMBOLS.ISongsApi) private readonly songsApi: ISongsApi,
    @inject(SYMBOLS.ITokenPersistenceRepository)
    private readonly tokenPersistenceRepository: ITokenPersistenceRepository
  ) {}

  private async getToken(): Promise<string> {
    const token = await this.tokenPersistenceRepository.getToken();
    if (!token) throw new Error("Could not find JWT token");
    return token;
  }

  async search(query: string): Promise<Song[]> {
    console.log("reached inside repo");
    const token = await this.getToken();
    return this.songsApi.search(query, token);
  }
}
