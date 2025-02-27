import React from "react";
import Playlist, {
  PlaylistVisibility,
} from "../../domain/entities/playlist.entity";

interface PlaylistListProps {
  playlists: Playlist[];
  userId: string;
  onDelete: (playlistId: string) => void; // Adding onDelete callback to PlaylistListProps
}

interface PlaylistCardProps {
  playlist: Playlist;
  userId: string;
  onDelete: (playlistId: string) => void; // Passing onDelete function to PlaylistCardProps
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  userId,
  onDelete,
}) => {
  console.log(JSON.stringify(playlist.userId));
  console.log(userId);
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      onDelete(playlist.id); // Call onDelete with playlist id
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 w-full max-w-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {playlist.name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-md ${
            playlist.visibility === PlaylistVisibility.PUBLIC
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {playlist.visibility}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {playlist.description}
      </p>
      <div className="mt-3 text-xs text-gray-500">
        Created on: {new Date(playlist.createdAt).toLocaleDateString()}
      </div>

      {/* Conditional render of the delete button */}

      {playlist.userId === userId && (
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-black rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Playlist
          </button>
        </div>
      )}
    </div>
  );
};

const PlaylistList: React.FC<PlaylistListProps> = ({
  playlists,
  userId,
  onDelete,
}) => {
  return (
    <>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          userId={userId}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export { PlaylistCard, PlaylistList };
