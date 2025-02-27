"use client";

import { useParams } from "next/navigation";

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = params?.playlistId;

  return (
    <div>
      <h1>Playlist ID: {playlistId}</h1>
    </div>
  );
};

export default PlaylistPage;
