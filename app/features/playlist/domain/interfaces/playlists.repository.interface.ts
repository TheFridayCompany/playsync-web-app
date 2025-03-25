import { User } from "@/app/features/profile/domain/entities/user.entity";
import CreatePlaylistDto from "../dto/create-playlist.dto";
import Playlist from "../entities/playlist.entity";

/**
 * Interface for interacting with playlists in the repository.
 */
export default interface IPlaylistsRepository {
  /**
   * Fetches all playlists from the repository.
   *
   * @returns {Promise<Playlist[]>} A promise that resolves to an array of playlists.
   */
  getPlaylists(): Promise<Playlist[]>;

  /**
   * Creates a new playlist in the repository.
   * @param {CreatePlaylistDto} dto - The data transfer object containing the details for the new playlist.
   * @returns {Promise<Playlist>} A promise that resolves to the created playlist.
   */
  createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>;

  /**
   * Deletes a playlist from the repository by its ID.
   *
   * @param {string} id The ID of the playlist to be deleted.
   * @returns {Promise<void>} A promise that resolves when the playlist is deleted.
   */
  deletePlaylist(id: string): Promise<void>;

  /**
   * Fetches a single playlist from the repository by its ID.
   *
   * @param {string} id The ID of the playlist to fetch.
   * @returns {Promise<Playlist>} A promise that resolves to the playlist with the given ID.
   */
  getPlaylist(id: string): Promise<Playlist>;

  addSong(id: string, songId: string): Promise<Playlist>;

  removeSong(id: string, songId: string): Promise<Playlist>;

  getCollaborators(id: string): Promise<User[]>;

  addCollaborator(playlistId: string, friendId: string): Promise<User>;

  removeCollaborator(playlistId: string, friendId: string): Promise<void>;
}
