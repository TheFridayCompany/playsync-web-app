import Song from "../entities/song.entity";

export default interface ISongsService {
  search(query: string): Promise<Song[]>;
}
