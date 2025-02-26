import { inject, injectable } from "inversify";
import Song from "../entities/song.entity";
import ISongService from "../interfaces/songs.service.interface";
import type ISongsRepository from "../interfaces/songs.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";

@injectable()
export default class SongsService implements ISongService {
  constructor(
    @inject(SYMBOLS.ISongsRepository)
    private readonly songsRepository: ISongsRepository
  ) {}

  search(query: string): Promise<Song[]> {
    console.log("reached inside service layer");
    const processedQuery = query.trim().replaceAll(" ", "+");

    if (processedQuery.length == 0) throw new Error("empty query");

    return this.songsRepository.search(processedQuery);
  }
}
