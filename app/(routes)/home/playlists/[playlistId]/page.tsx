"use client";

import Playlist from "@/app/features/playlist/domain/entities/playlist.entity";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { SongCard } from "@/app/features/song/presentation/components/SongsList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = params?.playlistId as string;
  const { fetchPlaylist } = usePlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    if (playlistId) {
      const p = fetchPlaylist(playlistId);
      if (p) setPlaylist(p);
    }
  }, []);

  return (
    <div>
      <h1>Playlist ID: {playlistId}</h1>
      {playlist && (
        <>
          {playlist.songs.map((song) => (
            <SongCard song={song} />
          ))}
        </>
      )}
    </div>
  );
};

export default PlaylistPage;
