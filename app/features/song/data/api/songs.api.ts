import { injectable } from "inversify";
import Song from "../../domain/entities/song.entity";
import ISongsApi from "../interfaces/songs.api.interface";
import { get } from "@/app/common/api";

@injectable()
export default class SongsApi implements ISongsApi {
  search(query: string, token: string): Promise<Song[]> {
    return get("/songs", token, undefined, { query });
  }
}
