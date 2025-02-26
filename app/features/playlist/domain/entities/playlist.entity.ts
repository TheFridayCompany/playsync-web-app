export default interface Playlist {
  id: string;
  name: string;
  description?: string;
  visibility: PlaylistVisibility;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // TODO: collaborators
}

/**
 * Enum representing the visibility options for a playlist.
 *
 * - PUBLIC: The playlist is visible to all users.
 * - PRIVATE: The playlist is only visible to the creator and collaborators.
 */
export enum PlaylistVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}
