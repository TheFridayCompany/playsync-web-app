import "reflect-metadata";
import { ContainerModule } from "inversify";
import IProfileService from "@/app/features/profile/domain/interfaces/profile.service.interface";
import ProfileService from "@/app/features/profile/domain/services/profile.service";
import { SYMBOLS } from "../symbols";
import IProfileRepository from "@/app/features/profile/domain/interfaces/profile.repository.interface";
import ProfileRepository from "@/app/features/profile/data/repositories/profile.repository";
import ProfileApi from "@/app/features/profile/data/api/profile.api";
import IProfileApi from "@/app/features/profile/data/interfaces/profile.api.interface";

const profileModule = new ContainerModule((bind) => {
  // domain layer
  bind<IProfileService>(SYMBOLS.IProfileService).to(ProfileService);

  // data layer
  bind<IProfileRepository>(SYMBOLS.IProfileRepository).to(ProfileRepository);
  bind<IProfileApi>(SYMBOLS.IProfileApi).to(ProfileApi);
});

export { profileModule };
