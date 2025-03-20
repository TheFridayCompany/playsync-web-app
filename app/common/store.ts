import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/presentation/store/auth.slice";
import profileReducer from "../features/profile/presentation/store/profile.slice";
import playlistsReducer from "../features/playlist/presentation/store/playlists.slice";
import socialReducer from "../features/social/presentation/store/social.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    playlists: playlistsReducer,
    social: socialReducer,
  },
});

export default store;
