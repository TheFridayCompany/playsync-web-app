// PlaylistCard.tsx
import Playlist, {
  PlaylistVisibility,
} from "@/app/features/playlist/domain/entities/playlist.entity";

interface PlaylistCardProps {
  playlist: Playlist;
  userId: string;
  children?: React.ReactNode;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  userId,
  children,
}) => {
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

      {/* Only show delete button if the current user is the owner of the playlist */}
      {playlist.userId === userId && <>{children}</>}
    </div>
  );
};

export default PlaylistCard;
