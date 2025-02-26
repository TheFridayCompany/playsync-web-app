import { useState } from "react";
import Song from "../../domain/entities/song.entity";
import { container } from "@/app/common/di/container";
import ISongsService from "../../domain/interfaces/songs.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to search for songs based on a search term
  const songSearch = async (searchTerm: string) => {
    console.log("song search method called");
    setLoading(true);
    setError(null);

    try {
      const songsService = container.get<ISongsService>(SYMBOLS.ISongsService);
      const songs = await songsService.search(searchTerm);
      setSongs(songs); // Assume data.songs is an array of songs
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    loading,
    error,
    songSearch,
  };
};
