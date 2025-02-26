import "reflect-metadata";
import { ContainerModule } from "inversify";
import { SYMBOLS } from "../symbols";
import IPlaylistsApi from "@/app/features/playlist/data/interfaces/playlists.api.interface";
import PlaylistsApi from "@/app/features/playlist/data/api/playlist.api";
import IPlaylistsRepository from "@/app/features/playlist/domain/interfaces/playlists.repository.interface";
import PlaylistsRepository from "@/app/features/playlist/data/repositories/playlist.repository";
import IPlaylistService from "@/app/features/playlist/domain/interfaces/playlist.service.interface";
import PlaylistService from "@/app/features/playlist/domain/services/playlist.service";

const playlistsModule = new ContainerModule((bind) => {
  // data layer
  bind<IPlaylistsApi>(SYMBOLS.IPlaylistApi).to(PlaylistsApi);

  bind<IPlaylistsRepository>(SYMBOLS.IPlaylistRepository).to(
    PlaylistsRepository
  );

  // domain layer
  bind<IPlaylistService>(SYMBOLS.IPlaylistService).to(PlaylistService);
});

export { playlistsModule };
