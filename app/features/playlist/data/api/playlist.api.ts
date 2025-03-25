import { injectable } from "inversify";
import IPlaylistsApi from "../interfaces/playlists.api.interface";
import { del, get, post } from "@/app/common/api";
import Playlist from "../../domain/entities/playlist.entity";
import { User } from "@/app/features/profile/domain/entities/user.entity";

@injectable()
export default class PlaylistsApi implements IPlaylistsApi {
  addCollaborator(
    playlistId: string,
    friendId: string,
    authToken: string
  ): Promise<User> {
    return post(
      `/playlists/${playlistId}/collaborators`,
      { collaboratorId: friendId },
      authToken
    );
  }

  removeCollaborator(
    playlistId: string,
    friendId: string,
    authToken: string
  ): Promise<void> {
    return del(`/playlists/${playlistId}/collaborators`, authToken, {
      collaboratorId: friendId,
    });
  }

  getCollaborators(id: string, authToken: string): Promise<User[]> {
    return get(`/playlists/${id}/collaborators`, authToken);
  }

  addSong(id: string, songId: string, authToken: string): Promise<Playlist> {
    return post(`/playlists/${id}/song/${songId}`, {}, authToken, {});
  }

  removeSong(id: string, songId: string, authToken: string): Promise<Playlist> {
    return del(`/playlists/${id}/song/${songId}`, authToken);
  }

  async getPlaylists(authToken?: string): Promise<any> {
    return get("/playlists", authToken);
  }

  async getPlaylist(id: string, authToken?: string): Promise<any> {
    return get(`/playlists/${id}`, authToken);
  }

  async createPlaylist(data: object, authToken?: string): Promise<any> {
    return post("/playlists", data, authToken);
  }

  async deletePlaylist(id: string, authToken?: string): Promise<any> {
    return del(`/playlists/${id}`, authToken);
  }
}
