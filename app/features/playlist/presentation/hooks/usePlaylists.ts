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
import Playlist from "../../domain/entities/playlist.entity";

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
      return [];
    }
  };

  const fetchPlaylist = (id: string) => {
    return (playlists as Playlist[]).find((playlist) => playlist.id === id);
  };

  const createPlaylist = async (dto: CreatePlaylistDto) => {
    let temp_id = "optimisitic-id" + new Date().toString();

    try {
      dispatch(
        addPlaylist({
          ...dto,
          id: temp_id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: "",
          songs: [],
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

  const fetchCollaborators = async (id: string) => {
    try {
      const users = await playlistsService.getCollaborators(id);
      return users;
    } catch (e) {
      console.error(e);
    }
  };

  const addCollaborator = async (playlistId: string, friendId: string) => {
    try {
      const user = await playlistsService.addCollaborator(playlistId, friendId);
      return user;
    } catch (e) {
      console.error(e);
    }
  };

  const removeCollaborator = async (playlistId: string, friendId: string) => {
    try {
      const user = await playlistsService.removeCollaborator(
        playlistId,
        friendId
      );
      return user;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    playlists,
    isLoading,
    fetchPlaylists,
    fetchPlaylist,
    createPlaylist,
    deletePlaylist,
    addSong,
    removeSong,
    fetchCollaborators,
    addCollaborator,
    removeCollaborator,
  };
};

export default usePlaylists;
