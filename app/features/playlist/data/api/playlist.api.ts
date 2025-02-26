import { injectable } from "inversify";
import IPlaylistsApi from "../interfaces/playlists.api.interface";
import { del, get, post } from "@/app/common/api";

@injectable()
export default class PlaylistsApi implements IPlaylistsApi {
  async getPlaylists(authToken?: string): Promise<any> {
    return get("/playlists", authToken);
  }

  async getPlaylist(id: string, authToken?: string): Promise<any> {
    return get(`/playlists/${id}`, authToken);
  }

  async createPlaylist(data: object, authToken?: string): Promise<any> {
    console.log(JSON.stringify(data));

    return post("/playlists", data, authToken);
  }

  async deletePlaylist(id: string, authToken?: string): Promise<any> {
    return del(`/playlists/${id}`, authToken);
  }
}
