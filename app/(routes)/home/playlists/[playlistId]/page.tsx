"use client";

import AddCollaboratorButton from "@/app/components/buttons/AddCollaboratorButton";
import RemoveCollaboratorButton from "@/app/components/buttons/RemoveCollaboratorButton";
import RemoveSongButton from "@/app/components/buttons/RemoveSongButton";
import SongCard from "@/app/components/cards/SongCard";
import AddCollaboratorModal from "@/app/components/modals/AddCollaboratorModal";
import Playlist from "@/app/features/playlist/domain/entities/playlist.entity";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = params?.playlistId as string;
  const {
    fetchPlaylist,
    removeSong,
    fetchCollaborators,
    addCollaborator,
    removeCollaborator,
  } = usePlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { friends } = useSelector((state: any) => state.social);
  const { profile } = useSelector((state: any) => state.profile);

  useEffect(() => {
    if (playlistId) {
      handleFetchCollaborators(playlistId);
      const p = fetchPlaylist(playlistId);
      if (p) setPlaylist(p);
    }
  }, [playlistId]);

  const handleFetchCollaborators = async (playlistId: string) => {
    try {
      const collaborators = await fetchCollaborators(playlistId);
      if (collaborators) setCollaborators(collaborators);
    } catch (e) {
      console.error(e);
    }
  };

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

  const handleAddCollaborator = async (userId: string) => {
    try {
      await addCollaborator(playlistId, userId);
      setCollaborators((prevCollaborators) => [
        ...prevCollaborators,
        friends.find((friend: any) => friend.id === userId) as User,
      ]);
      setIsModalOpen(false); // Close modal after adding
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveCollaborator = async (userId: string) => {
    try {
      await removeCollaborator(playlistId, userId);
      setCollaborators((prevCollaborators) =>
        prevCollaborators.filter((collaborator) => collaborator.id !== userId)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const shouldShowControls =
    (playlist && playlist?.userId === profile.id) ?? false;

  return (
    <div className="flex">
      {/* Playlist Content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Playlist ID: {playlistId}</h1>
        {shouldShowControls && (
          <AddCollaboratorButton onClick={() => setIsModalOpen(true)} />
        )}
        {playlist && (
          <>
            {playlist.songs.map((song) => (
              <SongCard key={song.id} song={song}>
                <RemoveSongButton
                  songId={song.id}
                  onRemove={handleRemoveSong}
                />
              </SongCard>
            ))}
          </>
        )}
      </div>

      {/* Sidebar */}
      {playlist && (
        <Sidebar
          collaborators={collaborators}
          onRemoveCollaborator={handleRemoveCollaborator}
          shouldShowControls={shouldShowControls}
        />
      )}

      {/* Modal to Add Collaborator */}
      <AddCollaboratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCollaborator={handleAddCollaborator}
        friends={friends}
      />
    </div>
  );
};

const Sidebar = ({
  collaborators,
  onRemoveCollaborator,
  shouldShowControls,
}: {
  collaborators: User[];
  onRemoveCollaborator: (userId: string) => void;
  shouldShowControls: boolean;
}) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Collaborators</h2>
      <ul>
        {collaborators.map((collaborator) => (
          <li key={collaborator.id} className="mb-2">
            <div className="flex items-center justify-between">
              <span>{collaborator.username}</span>
              {shouldShowControls && (
                <RemoveCollaboratorButton
                  onClick={() => onRemoveCollaborator(collaborator.id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPage;
