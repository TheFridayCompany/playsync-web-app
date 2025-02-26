import { StreamingPlatforms } from "./streaming-platforms.enum";

export default interface Artist {
  id: string;
  name: string;
  web_urls: Record<StreamingPlatforms, string>;
}
