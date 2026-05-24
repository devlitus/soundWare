export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSeconds: number;
  isOffline: boolean;
  coverUrl?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  author: string;
  coverUrl: string;
  tracks: Track[];
  totalTracks: number;
  totalDuration: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTrackId: string | null;
  progress: number;
  isShuffled: boolean;
}
