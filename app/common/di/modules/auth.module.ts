import "reflect-metadata";
import { ContainerModule } from "inversify";
import IAuthService from "@/app/features/auth/domain/interfaces/auth.service.interface";
import AuthService from "@/app/features/auth/domain/services/auth.service";
import IAuthApiGateway from "@/app/features/auth/data/interfaces/auth.api.interface";
import AuthApi from "@/app/features/auth/data/api/auth.api";
import IAuthRepository from "@/app/features/auth/domain/interfaces/auth.repository.interface";
import AuthRepository from "@/app/features/auth/data/repositories/auth.repository";
import ITokenPersistenceRepository from "@/app/features/auth/domain/interfaces/token-persistence.repository.interface";
import LocalStorageTokenPersistenceRepository from "@/app/features/auth/data/repositories/token-persistence.repository";
import IAuthGateway from "@/app/features/auth/data/interfaces/auth.gateway.interface";
import FirebaseAuthGateway from "@/app/features/auth/infra/firebase-auth.wrapper";
import { SYMBOLS } from "../symbols";

const authModule = new ContainerModule((bind) => {
  // infra layer
  bind<IAuthApiGateway>(SYMBOLS.IAuthApiGateway).to(AuthApi);
  bind<IAuthGateway>(SYMBOLS.IAuthGateway)
    .to(FirebaseAuthGateway)
    .inSingletonScope();

  // data layer
  bind<IAuthRepository>(SYMBOLS.IAuthRepository).to(AuthRepository);
  bind<ITokenPersistenceRepository>(SYMBOLS.ITokenPersistenceRepository).to(
    LocalStorageTokenPersistenceRepository
  );

  // domain layer
  bind<IAuthService>(SYMBOLS.IAuthService).to(AuthService);
});

export { authModule };
