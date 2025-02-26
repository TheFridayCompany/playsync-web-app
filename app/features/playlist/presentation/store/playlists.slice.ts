import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Playlist from "../../domain/entities/playlist.entity";

interface PlaylistsState {
  playlists: Playlist[];
}

const initialState: PlaylistsState = {
  playlists: [],
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    updatePlaylist: (
      state,
      action: PayloadAction<{ id: string; updatedPlaylist: Playlist }>
    ) => {
      const { id, updatedPlaylist } = action.payload;
      const index = state.playlists.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.playlists[index] = {
          ...state.playlists[index],
          ...updatedPlaylist,
        };
      }
    },
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
  },
});

export const { addPlaylist, removePlaylist, updatePlaylist, setPlaylists } =
  playlistsSlice.actions;
export default playlistsSlice.reducer;
