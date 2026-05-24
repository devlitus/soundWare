import { Audio, createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { create } from 'zustand';

import type { CloudinaryAsset } from '@/types/cloudinary';

interface PlaybackStore {
  currentTrackId: string | null;
  currentAsset: CloudinaryAsset | null;
  isPlaying: boolean;
  progress: number;
  isShuffled: boolean;
  selectAsset: (asset: CloudinaryAsset) => Promise<void>;
  play: (trackId?: string) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlayPause: (trackId?: string) => Promise<void>;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  setProgress: (progress: number) => void;
}

let player: AudioPlayer | null = null;
let progressInterval: ReturnType<typeof setInterval> | null = null;

const startProgressPolling = () => {
  stopProgressPolling();
  progressInterval = setInterval(() => {
    if (player && player.isLoaded && player.duration > 0) {
      usePlaybackStore.setState({ progress: player.currentTime / player.duration });
    }
  }, 250);
};

const stopProgressPolling = () => {
  if (progressInterval !== null) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

export const usePlaybackStore = create<PlaybackStore>((set, get) => ({
  currentTrackId: null,
  currentAsset: null,
  isPlaying: false,
  progress: 0,
  isShuffled: false,
  selectAsset: async (asset: CloudinaryAsset) => {
    stopProgressPolling();
    if (player) {
      player.remove();
      player = null;
    }
    set({
      currentAsset: asset,
      currentTrackId: asset.asset_id,
      isPlaying: false,
      progress: 0,
    });
  },
  play: async (trackId?: string) => {
    if (trackId) {
      set({ currentTrackId: trackId, isPlaying: true, progress: 0 });
      return;
    }
    const { currentAsset } = get();
    if (!currentAsset) return;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: 'doNotMix',
      });
    } catch {}

    if (!player) {
      player = createAudioPlayer(currentAsset.secure_url);
    } else {
      player.replace(currentAsset.secure_url);
    }

    player.play();
    startProgressPolling();
    set({ isPlaying: true, progress: 0 });
  },
  pause: async () => {
    player?.pause();
    stopProgressPolling();
    set({ isPlaying: false });
  },
  resume: async () => {
    player?.play();
    startProgressPolling();
    set({ isPlaying: true });
  },
  togglePlayPause: async (trackId?: string) => {
    if (trackId) {
      set({ currentTrackId: trackId, isPlaying: true, progress: 0 });
      return;
    }
    const { currentAsset, isPlaying } = get();
    if (!currentAsset) return;

    if (!player || !player.isLoaded) {
      await get().play();
      return;
    }

    if (isPlaying) {
      await get().pause();
    } else {
      await get().resume();
    }
  },
  next: () =>
    set((s) => ({
      currentTrackId: s.currentTrackId,
      isPlaying: true,
      progress: 0,
    })),
  prev: () =>
    set((s) => ({
      currentTrackId: s.currentTrackId,
      isPlaying: true,
      progress: 0,
    })),
  toggleShuffle: () => set((s) => ({ isShuffled: !s.isShuffled })),
  setProgress: (progress: number) => set({ progress }),
}));
