import "reflect-metadata";
import { Container } from "inversify";
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
import { SYMBOLS } from "./symbols";

const container = new Container();
// infra layer
container.bind<IAuthApiGateway>(SYMBOLS.IAuthApiGateway).to(AuthApi);
container.bind<IAuthGateway>(SYMBOLS.IAuthGateway).to(FirebaseAuthGateway);

// data layer
container.bind<IAuthRepository>(SYMBOLS.IAuthRepository).to(AuthRepository);
container
  .bind<ITokenPersistenceRepository>(SYMBOLS.ITokenPersistenceRepository)
  .to(LocalStorageTokenPersistenceRepository);

// domain layer
container.bind<IAuthService>(SYMBOLS.IAuthService).to(AuthService);

export { container };
