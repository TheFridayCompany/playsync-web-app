"use client";

import PlaylistList from "@/app/features/playlist/presentation/components/PlaylistList";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { useState } from "react";
import CreatePlaylistModal from "@/app/features/playlist/presentation/components/CreatePlaylistModal";
import { useSelector } from "react-redux";

export default function Playlists() {
  const { loading, playlists, createPlaylist, deletePlaylist } = usePlaylists();
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PlaylistList
          playlists={playlists}
          onDelete={deletePlaylist}
          userId={profile.id}
        />
      )}

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={createPlaylist}
      />
    </div>
  );
}
