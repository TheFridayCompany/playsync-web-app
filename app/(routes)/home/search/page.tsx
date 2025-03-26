"use client";
import { useState } from "react";
import { useSongs } from "@/app/features/song/presentation/hooks/useSongs";
import usePlaylists from "@/app/features/playlist/presentation/hooks/usePlaylists";
import SongCard from "@/app/components/cards/SongCard";
import AddSongToPlaylistButton from "@/app/components/buttons/AddSongButton";
import AddToPlaylistModal from "@/app/components/modals/AddToPlaylistModal";
import Song from "@/app/features/song/domain/entities/song.entity";
import SongSearchInput from "@/app/components/inputs/SongSearchInput";

export default function Search() {
  const { songSearch, songs, loading } = useSongs();
  const { addSong } = usePlaylists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleAddSongToPlaylistButtonClick = (song: Song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <SongSearchInput onSearch={songSearch} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {songs.map((song) => (
            <SongCard key={song.id} song={song}>
              <AddSongToPlaylistButton
                onClick={() => handleAddSongToPlaylistButtonClick(song)}
              />
            </SongCard>
          ))}
        </div>
      )}

      {isModalOpen && selectedSong && (
        <AddToPlaylistModal
          onClose={() => setIsModalOpen(false)}
          songId={selectedSong.id}
          onAddToPlaylist={addSong}
        />
      )}
    </div>
  );
}
