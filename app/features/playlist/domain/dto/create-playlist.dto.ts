import { PlaylistVisibility } from "../entities/playlist.entity";

/**
 * Data transfer object for creating a playlist.
 * This interface defines the structure of the request body required
 * to create a new playlist, including details such as name, description,
 * collaborators, and visibility.
 */
export default interface CreatePlaylistDto {
  /**
   * The name of the playlist.
   * This is a required field and must be a string between 3 and 20 characters.
   *
   * @type {string}
   */
  name: string;

  /**
   * The description of the playlist.
   * This is an optional field and must be a string between 6 and 20 characters.
   *
   * @type {string}
   */
  description?: string;

  /**
   * A list of collaborator IDs for the playlist.
   * This is an optional field. If provided, each ID must be a valid MongoDB ID.
   *
   * @type {string[]}
   */
  collaboratorIds?: string[];

  /**
   * The visibility of the playlist.
   * It must be one of the values from the PlaylistVisibility enum.
   *
   * @type {PlaylistVisibility}
   */
  visibility: PlaylistVisibility;
}
