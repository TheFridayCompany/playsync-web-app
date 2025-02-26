import { container } from "@/app/common/di/container";
import { useDispatch, useSelector } from "react-redux";
import IPlaylistService from "../../domain/interfaces/playlist.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { useState } from "react";
import {
  addPlaylist,
  removePlaylist,
  setPlaylists,
  updatePlaylist,
} from "../store/playlists.slice";
import CreatePlaylistDto from "../../domain/dto/create-playlist.dto";

const usePlaylists = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { playlists } = useSelector((state: any) => state.playlists);

  const playlistsService = container.get<IPlaylistService>(
    SYMBOLS.IPlaylistService
  );

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const playlists = await playlistsService.getPlaylists();
      console.log(playlists);
      console.log(JSON.stringify(playlists));
      dispatch(setPlaylists(playlists));
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
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
  return { playlists, loading, fetchPlaylists, createPlaylist, deletePlaylist };
};

export default usePlaylists;
