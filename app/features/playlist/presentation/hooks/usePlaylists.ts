import { container } from "@/app/common/di/container";
import { useDispatch, useSelector } from "react-redux";
import IPlaylistService from "../../domain/interfaces/playlist.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import {
  addPlaylist,
  removePlaylist,
  resetLoading,
  setLoading,
  setPlaylists,
  updatePlaylist,
} from "../store/playlists.slice";
import CreatePlaylistDto from "../../domain/dto/create-playlist.dto";
import IPlaylistSongService from "../../domain/interfaces/playlist-song.service.interface";

const usePlaylists = () => {
  const dispatch = useDispatch();
  const { playlists, isLoading } = useSelector((state: any) => state.playlists);

  const playlistsService = container.get<IPlaylistService>(
    SYMBOLS.IPlaylistService
  );

  const playlistSongsService = container.get<IPlaylistSongService>(
    SYMBOLS.IPlaylistSongsService
  );

  const fetchPlaylists = async () => {
    dispatch(setLoading(true));
    try {
      const playlists = await playlistsService.getPlaylists();
      console.log(playlists);
      console.log(JSON.stringify(playlists));
      dispatch(setPlaylists(playlists));
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      console.log("reached finally block");
      dispatch(resetLoading());
    }
  };

  const createPlaylist = async (dto: CreatePlaylistDto) => {
    let temp_id = "optimisitic-id" + new Date().toString();

    try {
      dispatch(
        addPlaylist({
          ...dto,
          id: temp_id,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: "",
        })
      );
      const playlist = await playlistsService.createPlaylist(dto);
      dispatch(updatePlaylist({ id: temp_id, updatedPlaylist: playlist }));
    } catch (error) {
      console.error("Error creating playlist:", error);
      dispatch(removePlaylist(temp_id));
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      await playlistsService.deletePlaylist(id);
      dispatch(removePlaylist(id));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const addSong = async (id: string, songId: string) => {
    try {
      const playlist = await playlistSongsService.addSong(id, songId);
      dispatch(updatePlaylist({ id: id, updatedPlaylist: playlist }));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const removeSong = async (id: string, songId: string) => {
    try {
      const playlist = await playlistSongsService.removeSong(id, songId);
      dispatch(updatePlaylist({ id: id, updatedPlaylist: playlist }));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return {
    playlists,
    isLoading,
    fetchPlaylists,
    createPlaylist,
    deletePlaylist,
    addSong,
    removeSong,
  };
};

export default usePlaylists;
