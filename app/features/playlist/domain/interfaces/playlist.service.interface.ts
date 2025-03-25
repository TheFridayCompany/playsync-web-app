import { User } from "@/app/features/profile/domain/entities/user.entity";
import CreatePlaylistDto from "../dto/create-playlist.dto";
import Playlist from "../entities/playlist.entity";

/**
 * Interface for managing playlist services.
 */
export default interface IPlaylistService {
  /**
   * Retrieves all playlists from the service.
   *
   * @returns {Promise<Playlist[]>} A promise that resolves to an array of playlists.
   */
  getPlaylists(): Promise<Playlist[]>;

  /**
   * Creates a new playlist through the service.
   *
   * This method takes in a `CreatePlaylistDto` object containing the necessary data to create a new playlist,
   * and returns a promise that resolves to the newly created playlist.
   *
   * @param {CreatePlaylistDto} dto - The data transfer object containing the details for the new playlist.
   * @returns {Promise<Playlist>} A promise that resolves to the created playlist object, which includes
   *          the playlist's unique identifier and other details.
   */
  createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>;

  /**
   * Deletes a playlist from the service by its ID.
   *
   * @param {string} id The ID of the playlist to be deleted.
   * @returns {Promise<void>} A promise that resolves when the playlist is deleted.
   */
  deletePlaylist(id: string): Promise<void>;

  /**
   * Retrieves a single playlist from the service by its ID.
   *
   * @param {string} id The ID of the playlist to fetch.
   * @returns {Promise<Playlist>} A promise that resolves to the playlist with the given ID.
   */
  getPlaylist(id: string): Promise<Playlist>;

  getCollaborators(id: string): Promise<User[]>;

  addCollaborator(playlistId: string, friendId: string): Promise<User>;

  removeCollaborator(playlistId: string, friendId: string): Promise<void>;
}
