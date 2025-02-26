import Playlist from "../../domain/entities/playlist.entity";

/**
 * Interface for interacting with the Playlists API.
 * Provides methods to create, delete, and retrieve playlists.
 */
export default interface IPlaylistsApi {
  /**
   * Fetch all playlists.
   * @param authToken - Authentication token.
   * @returns A promise resolving to the list of playlists.
   */
  getPlaylists(authToken: string): Promise<any>;

  /**
   * Fetch a specific playlist by ID.
   * @param id - The ID of the playlist.
   * @param authToken - Authentication token.
   * @returns A promise resolving to the playlist details.
   */
  getPlaylist(id: string, authToken: string): Promise<any>;

  /**
   * Create a new playlist.
   * @param data - The playlist data.
   * @param authToken - Authentication token.
   * @returns A promise resolving to the created playlist.
   */
  createPlaylist(data: object, authToken: string): Promise<any>;

  /**
   * Delete a playlist by ID.
   * @param id - The ID of the playlist to delete.
   * @param authToken - Authentication token.
   * @returns A promise resolving to the delete confirmation.
   */
  deletePlaylist(id: string, authToken: string): Promise<any>;

  addSong(id: string, songId: string, authToken: string): Promise<Playlist>;

  removeSong(id: string, songId: string, authToken: string): Promise<Playlist>;
}
