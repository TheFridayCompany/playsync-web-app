import { inject } from "inversify";
import Playlist from "../entities/playlist.entity";
import IPlaylistSongsService from "../interfaces/playlist-song.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import type IPlaylistsRepository from "../interfaces/playlists.repository.interface";

export default class PlayListSongsService implements IPlaylistSongsService {
  constructor(
    @inject(SYMBOLS.IPlaylistRepository)
    private readonly playlistsRepository: IPlaylistsRepository
  ) {}

  addSong(id: string, songId: string): Promise<Playlist> {
    return this.playlistsRepository.addSong(id, songId);
  }

  removeSong(id: string, songId: string): Promise<Playlist> {
    return this.playlistsRepository.removeSong(id, songId);
  }
}
