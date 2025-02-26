import Playlist from "../entities/playlist.entity";

export default interface IPlaylistSongsService {
  addSong(id: string, songId: string): Promise<Playlist>;

  removeSong(id: string, songId: string): Promise<Playlist>;
}
