import "reflect-metadata";
import { Container } from "inversify";
import { authModule } from "./modules/auth.module";
import { profileModule } from "./modules/profile.module";
import { playlistsModule } from "./modules/playlists.module";
import { songsModule } from "./modules/songs.module";

const container = new Container();

// Load feature modules
container.load(authModule, profileModule, playlistsModule, songsModule);

export { container };
