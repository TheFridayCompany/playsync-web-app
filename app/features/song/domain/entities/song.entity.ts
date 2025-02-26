import Artist from "./artist.entity";
import { StreamingPlatforms } from "./streaming-platforms.enum";

export default interface Song {
  id: string;
  name: string;
  duration_ms: number;
  web_urls: Record<StreamingPlatforms, string>;
  artists: Artist[];
}
