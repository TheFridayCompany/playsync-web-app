import { inject } from "inversify";
import Playlist from "../../domain/entities/playlist.entity";
import IPlaylistsRepository from "../../domain/interfaces/playlists.repository.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import type IPlaylistsApi from "../interfaces/playlists.api.interface";
import type ITokenPersistenceRepository from "@/app/features/auth/domain/interfaces/token-persistence.repository.interface";
import CreatePlaylistDto from "../../domain/dto/create-playlist.dto";
import { User } from "@/app/features/profile/domain/entities/user.entity";

export default class PlaylistsRepository implements IPlaylistsRepository {
  constructor(
    @inject(SYMBOLS.IPlaylistApi) private readonly playlistApi: IPlaylistsApi,
    @inject(SYMBOLS.ITokenPersistenceRepository)
    private readonly tokenPersistenceRepository: ITokenPersistenceRepository
  ) {}

  async addCollaborator(playlistId: string, friendId: string): Promise<User> {
    const token = await this.getToken();
    return this.playlistApi.addCollaborator(playlistId, friendId, token);
  }

  async removeCollaborator(
    playlistId: string,
    friendId: string
  ): Promise<void> {
    const token = await this.getToken();
    return this.playlistApi.removeCollaborator(playlistId, friendId, token);
  }

  async getCollaborators(id: string): Promise<User[]> {
    const token = await this.getToken();
    return this.playlistApi.getCollaborators(id, token);
  }

  async addSong(id: string, songId: string): Promise<Playlist> {
    const token = await this.getToken();
    return this.playlistApi.addSong(id, songId, token);
  }

  async removeSong(id: string, songId: string): Promise<Playlist> {
    const token = await this.getToken();
    return this.playlistApi.removeSong(id, songId, token);
  }

  private async getToken(): Promise<string> {
    const token = await this.tokenPersistenceRepository.getToken();
    if (!token) throw new Error("Could not find JWT token");
    return token;
  }

  async getPlaylists(): Promise<Playlist[]> {
    const token = await this.getToken();

    const playlists = await this.playlistApi.getPlaylists(token);
    return playlists;
  }

  async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
    const token = await this.getToken();
    const playlist = await this.playlistApi.createPlaylist(dto, token);
    return playlist;
  }

  async deletePlaylist(id: string): Promise<void> {
    const token = await this.getToken();
    await this.playlistApi.deletePlaylist(id, token);
  }

  getPlaylist(id: string): Promise<Playlist> {
    throw new Error("Method not implemented.");
  }
}
