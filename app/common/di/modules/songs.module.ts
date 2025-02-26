import "reflect-metadata";
import { ContainerModule } from "inversify";
import { SYMBOLS } from "../symbols";
import ISongsRepository from "@/app/features/song/domain/interfaces/songs.repository.interface";
import SongsRepository from "@/app/features/song/data/repositories/songs.repository";
import ISongsService from "@/app/features/song/domain/interfaces/songs.service.interface";
import SongsService from "@/app/features/song/domain/services/songs.service";
import ISongsApi from "@/app/features/song/data/interfaces/songs.api.interface";
import SongsApi from "@/app/features/song/data/api/songs.api";

const songsModule = new ContainerModule((bind) => {
  // data layer
  bind<ISongsApi>(SYMBOLS.ISongsApi).to(SongsApi);

  // data layer
  bind<ISongsRepository>(SYMBOLS.ISongsRepository).to(SongsRepository);

  // domain layer
  bind<ISongsService>(SYMBOLS.ISongsService).to(SongsService);
});

export { songsModule };
