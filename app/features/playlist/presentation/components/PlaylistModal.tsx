import { FC, useEffect } from "react";
import Playlist from "../../domain/entities/playlist.entity";
import { useSelector } from "react-redux";

interface PlaylistModalProps {
  onClose: () => void;
  onAddToPlaylist: (songId: string, playlistId: string) => void;
  songId: string;
}

const PlaylistModal: FC<PlaylistModalProps> = ({
  onClose,
  onAddToPlaylist,
  songId,
}) => {
  const { playlists } = useSelector((state: any) => state.playlists);
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-96 p-5 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Select a Playlist
        </h2>

        {/* Playlist Selection */}
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {playlists.map((playlist: Playlist) => (
            <li
              key={playlist.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
            >
              <span className="text-sm text-black">{playlist.name}</span>
              <button
                onClick={() => {
                  onAddToPlaylist(playlist.id, songId);
                  onClose();
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistModal;
