import { useState } from "react";
import Song from "../../domain/entities/song.entity";
import { SongCard } from "./SongsList";
import PlaylistModal from "@/app/features/playlist/presentation/components/PlaylistModal";

interface EnhancedSongCardProps {
  song: Song;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
}

const EnhancedSongCard: React.FC<EnhancedSongCardProps> = ({
  song,
  onAddToPlaylist,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SongCard song={song}>
        {/* Options Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <p>options</p>
        </button>
      </SongCard>

      {/* Playlist Modal */}
      {isModalOpen && (
        <PlaylistModal
          onClose={() => setIsModalOpen(false)}
          songId={song.id}
          onAddToPlaylist={onAddToPlaylist}
        />
      )}
    </>
  );
};

export default EnhancedSongCard;
