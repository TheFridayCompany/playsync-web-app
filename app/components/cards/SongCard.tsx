import Artist from "@/app/features/song/domain/entities/artist.entity";
import Song from "@/app/features/song/domain/entities/song.entity";
import { StreamingPlatforms } from "@/app/features/song/domain/entities/streaming-platforms.enum";
import { ReactNode } from "react";

interface SongCardProps {
  song: Song;
  children?: ReactNode;
}

const SongCard: React.FC<SongCardProps> = ({ song, children }) => {
  const formatDuration = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-sm">
      {/* Injected Children (e.g., Options Button) */}
      {children && <div className="absolute top-3 right-3">{children}</div>}

      <h3 className="text-xl font-semibold text-gray-900">{song.name}</h3>
      <div className="text-sm text-gray-600">
        <p>Duration: {formatDuration(song.duration_ms)}</p>
        <div className="mt-2">
          <strong>Artists:</strong>
          <ul className="list-disc pl-5">
            {song.artists.map((artist: Artist) => (
              <li key={artist.id} className="text-sm text-gray-600">
                {artist.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <strong>Available on:</strong>
        <div className="space-x-2 mt-1">
          {Object.keys(song.web_urls).map((platform) => (
            <a
              key={platform}
              href={song.web_urls[platform as StreamingPlatforms]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
