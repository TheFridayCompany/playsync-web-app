"use client";

import { PlaylistCard } from "@/app/features/playlist/presentation/components/PlaylistList";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { useState } from "react";
import CreatePlaylistModal from "@/app/features/playlist/presentation/components/CreatePlaylistModal";
import { useSelector } from "react-redux";
import Playlist from "@/app/features/playlist/domain/entities/playlist.entity";
import Link from "next/link";

export default function Playlists() {
  const { isLoading, playlists, createPlaylist, deletePlaylist } =
    usePlaylists();
  const { profile } = useSelector((state: any) => state.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Create Playlist</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {playlists.map((playlist: Playlist) => (
            <Link key={playlist.id} href={`/home/playlists/${playlist.id}`}>
              <PlaylistCard
                playlist={playlist}
                userId={profile.id}
                onDelete={deletePlaylist}
              />
            </Link>
          ))}
        </>
      )}

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={createPlaylist}
      />
    </div>
  );
}
