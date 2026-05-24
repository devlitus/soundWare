import { create } from 'zustand';
import type { CloudinaryAsset } from '@/types/cloudinary';
import { fetchCloudinaryAssets } from '@/utils/cloudinary';

interface CloudinaryStore {
  assets: CloudinaryAsset[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  fetchAssets: (folder: string) => Promise<void>;
}

export const useCloudinaryStore = create<CloudinaryStore>((set) => ({
  assets: [],
  isLoading: false,
  error: null,
  totalCount: 0,

  fetchAssets: async (folder: string) => {
    set({ isLoading: true, error: null });
    try {
      const assets = await fetchCloudinaryAssets(folder);
      assets.forEach((a) => {
        console.log(`[Cloudinary] ${a.public_id} | resource_type=${a.resource_type} | duration=${a.duration} | type=${typeof a.duration}`);
      });
      set({
        assets,
        isLoading: false,
        totalCount: assets.length,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error fetching Cloudinary assets';
      set({
        isLoading: false,
        error: message,
      });
    }
  },
}));
