export const SYMBOLS = {
  // AUTH
  IAuthRepository: Symbol.for("IAuthRepository"),
  ITokenPersistenceRepository: Symbol.for("ITokenPersistenceRepository"),

  IAuthGateway: Symbol.for("IAuthGateway"),
  IAuthApiGateway: Symbol.for("IAuthApiGateway"),

  IAuthService: Symbol.for("IAuthService"),

  // PROFILE
  IProfileService: Symbol.for("IProfileService"),
  IProfileRepository: Symbol.for("IProfileRepository"),
  IProfileApi: Symbol.for("IProfileApi"),
};
