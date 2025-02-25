import "reflect-metadata";
import { ContainerModule } from "inversify";
import IProfileService from "@/app/features/profile/domain/interfaces/profile.service.interface";
import ProfileService from "@/app/features/profile/domain/services/profile.service";
import { SYMBOLS } from "../symbols";

const profileModule = new ContainerModule((bind) => {
  // domain layer
  bind<IProfileService>(SYMBOLS.IProfileService).to(ProfileService);
});

export { profileModule };
