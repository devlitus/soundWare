import { create } from 'zustand';

import type { Playlist, Track } from '@/types/audio';

const TRACKS_MOCK: Track[] = [
  {
    id: 'track-1',
    title: 'Midnight City Lights',
    artist: 'Neon Vectors',
    duration: '4:12',
    durationSeconds: 252,
    isOffline: false,
  },
  {
    id: 'track-2',
    title: 'Digital Horizon',
    artist: 'Synthwave Collective',
    duration: '3:45',
    durationSeconds: 225,
    isOffline: false,
  },
  {
    id: 'track-3',
    title: 'Quantum Groove',
    artist: 'The Algorithms',
    duration: '5:02',
    durationSeconds: 302,
    isOffline: false,
  },
  {
    id: 'track-4',
    title: 'Resonance',
    artist: 'Audio Architect',
    duration: '4:28',
    durationSeconds: 268,
    isOffline: false,
  },
  {
    id: 'track-5',
    title: 'Offline Track',
    artist: 'Cloud Sync Failed',
    duration: '4:12',
    durationSeconds: 252,
    isOffline: true,
  },
];

const PLAYLIST_MOCK: Playlist = {
  id: 'playlist-1',
  title: 'Late Night Vibes',
  description:
    'Curated for deep focus and after-hours energy. Synthwave, chillout, and deep house.',
  author: 'SoundWave Official',
  coverUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQmPPPPbeMwaKly5-OQTCZ_y6ZF6lJWiMqdeq0tC1VbHfz_CFsA5sMGu93mQ7FO_pybc4Kkh2UH5WQNL6aPN0iXkJKvUV9jRDUrzKh9mMxkZY4hA2bJDk6LCaKkaLpZyA7AdMh1tU-01h2SB8MJH9os3F-V9jyqOrZvxCCHC_bt7AguiNcWHAWacUfy5I5rPzHDFOA2Kb0Wj5ZAAxPP1p2-JtUgXKTLvOZLGDoFCzQUTxTUpMAfM27-nVOQx_1jAU2oqOQOYvwL0YE',
  tracks: TRACKS_MOCK,
  totalTracks: 24,
  totalDuration: '1h 45m',
};

interface PlaylistStore {
  playlist: Playlist;
  favoriteTrackIds: Set<string>;
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
}

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlist: PLAYLIST_MOCK,
  favoriteTrackIds: new Set<string>(['track-1']),
  toggleFavorite: (trackId: string) =>
    set((s) => {
      const next = new Set(s.favoriteTrackIds);
      if (next.has(trackId)) {
        next.delete(trackId);
      } else {
        next.add(trackId);
      }
      return { favoriteTrackIds: next };
    }),
  isFavorite: (trackId: string) => get().favoriteTrackIds.has(trackId),
}));
