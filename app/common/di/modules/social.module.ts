import "reflect-metadata";
import { ContainerModule } from "inversify";
import { SYMBOLS } from "../symbols";
import ISocialApi from "@/app/features/social/data/interfaces/social.api.interface";
import ISocialRepository from "@/app/features/social/domain/interfaces/social.repository.interface";
import SocialRepository from "@/app/features/social/data/repositories/social.repository";
import ISocialService from "@/app/features/social/domain/interfaces/social.service.interface";
import SocialService from "@/app/features/social/domain/services/social.service";
import SocialApi from "@/app/features/social/data/api/social.api";

const socialModule = new ContainerModule((bind) => {
  // data layer
  bind<ISocialApi>(SYMBOLS.ISocialApi).to(SocialApi);

  bind<ISocialRepository>(SYMBOLS.ISocialRepository).to(SocialRepository);

  // domain layer
  bind<ISocialService>(SYMBOLS.ISocialService).to(SocialService);
});

export { socialModule };
