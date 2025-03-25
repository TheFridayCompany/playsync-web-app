"use client";

import Playlist from "@/app/features/playlist/domain/entities/playlist.entity";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import { SongCard } from "@/app/features/song/presentation/components/SongsList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Sidebar component to display collaborators
const Sidebar = ({ collaborators }: { collaborators: User[] }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Collaborators</h2>
      <ul>
        {collaborators.map((collaborator) => (
          <li key={collaborator.id} className="mb-2">
            <div className="flex items-center">
              <span>{collaborator.username}</span>
              {/* TODO: implement remove collaborator */}
              <button className="text-red-500 ml-2">Remove collaborator</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Modal component to add collaborator
const AddCollaboratorModal = ({
  isOpen,
  onClose,
  onAddCollaborator,
  friends,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddCollaborator: (userId: string) => void;
  friends: User[];
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Add Collaborator
        </h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex justify-between items-center mb-2"
            >
              <span className="text-black">{friend.username}</span>
              <button
                onClick={() => onAddCollaborator(friend.id)}
                className="text-blue-500"
              >
                Add as collaborator
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 text-red-500 font-semibold">
          Close
        </button>
      </div>
    </div>
  );
};

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = params?.playlistId as string;
  const { fetchPlaylist, removeSong, fetchCollaborators } = usePlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { friends } = useSelector((state: any) => state.social);

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
      // await addCollaborator(playlistId, userId);
      // setCollaborators((prevCollaborators) => [
      //   ...prevCollaborators,
      //   friends.find((friend) => friend.id === userId) as User,
      // ]);
      setIsModalOpen(false); // Close modal after adding
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex">
      {/* Playlist Content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Playlist ID: {playlistId}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add collaborator
        </button>
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

      {/* Sidebar */}
      <Sidebar collaborators={collaborators} />

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

export default PlaylistPage;
