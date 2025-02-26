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

  // PLAYLISTS
  IPlaylistService: Symbol.for("IPlaylistService"),
  IPlaylistRepository: Symbol.for("IPlaylistRepository"),
  IPlaylistApi: Symbol.for("IPlaylistApi"),

  // SONGS
  ISongsService: Symbol.for("ISongsService"),
  ISongsRepository: Symbol.for("ISongsRepository"),
  ISongsApi: Symbol.for("ISongsApi"),
};
