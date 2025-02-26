import Song from "../entities/song.entity";

export default interface ISongsRepository {
  search(query: string): Promise<Song[]>;
}
