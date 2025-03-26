"use client";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { useState } from "react";
import { useSelector } from "react-redux";
import Playlist from "@/app/features/playlist/domain/entities/playlist.entity";
import Link from "next/link";
import PlaylistCard from "@/app/components/cards/PlaylistCard";
import DeletePlaylistButton from "@/app/components/buttons/DeletePlaylistButton";
import CreatePlaylistButton from "@/app/components/buttons/CreatePlaylistButton";
import CreatePlaylistModal from "@/app/components/modals/CreatePlaylistModal";

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
      <CreatePlaylistButton onClick={openModal} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {playlists.map((playlist: Playlist) => (
            <Link key={playlist.id} href={`/home/playlists/${playlist.id}`}>
              <PlaylistCard playlist={playlist} userId={profile.id}>
                <DeletePlaylistButton
                  onClick={() => deletePlaylist(playlist.id)}
                  label="Delete Playlist"
                />
              </PlaylistCard>
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
