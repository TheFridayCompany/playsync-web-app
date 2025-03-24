"use client";

import Playlist from "@/app/features/playlist/domain/entities/playlist.entity";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { SongCard } from "@/app/features/song/presentation/components/SongsList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = params?.playlistId as string;
  const { fetchPlaylist, removeSong } = usePlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    if (playlistId) {
      const p = fetchPlaylist(playlistId);
      if (p) setPlaylist(p);
    }
  }, []);

  const handleRemoveSong = async (songId: string) => {
    try {
      if (playlist) {
        await removeSong(playlistId, songId);
        setPlaylist({
          ...playlist,
          songs: playlist.songs.filter((song) => song.id !== songId),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Playlist ID: {playlistId}</h1>
      {playlist && (
        <>
          {playlist.songs.map((song) => (
            <SongCard key={song.id} song={song}>
              <button
                onClick={(_) => handleRemoveSong(song.id)}
                className="text-red-500"
              >
                Remove song
              </button>
            </SongCard>
          ))}
        </>
      )}
    </div>
  );
};

export default PlaylistPage;
