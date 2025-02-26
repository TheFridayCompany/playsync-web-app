import Song from "../../domain/entities/song.entity";

export default interface ISongsApi {
  search(query: string, authToken: string): Promise<Song[]>;
}
