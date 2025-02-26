import { inject, injectable } from "inversify";
import Playlist from "../entities/playlist.entity";
import IPlaylistService from "../interfaces/playlist.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import type IPlaylistsRepository from "../interfaces/playlists.repository.interface";
import CreatePlaylistDto from "../dto/create-playlist.dto";

@injectable()
export default class PlaylistService implements IPlaylistService {
  constructor(
    @inject(SYMBOLS.IPlaylistRepository)
    private readonly playlistRepository: IPlaylistsRepository
  ) {}

  createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistRepository.createPlaylist(dto);
  }

  getPlaylist(id: string): Promise<Playlist> {
    return this.playlistRepository.getPlaylist(id);
  }

  getPlaylists(): Promise<Playlist[]> {
    return this.playlistRepository.getPlaylists();
  }

  deletePlaylist(id: string): Promise<void> {
    return this.playlistRepository.deletePlaylist(id);
  }
}
