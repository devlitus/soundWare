import type { CloudinaryAsset, CloudinaryApiResponse, CloudinaryErrorResponse } from '@/types/cloudinary';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const toBase64 = (str: string): string => {
  const bytes = new TextEncoder().encode(str);
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += CHARS[b1 >> 2];
    result += CHARS[((b1 & 3) << 4) | (b2 >> 4)];
    result += i + 1 < bytes.length ? CHARS[((b2 & 15) << 2) | (b3 >> 6)] : '=';
    result += i + 2 < bytes.length ? CHARS[b3 & 63] : '=';
  }
  return result;
};

const getCredentials = () => {
  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.EXPO_PUBLIC_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials are missing. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME, EXPO_PUBLIC_CLOUDINARY_API_KEY, and EXPO_PUBLIC_CLOUDINARY_API_SECRET in your .env file.');
  }

  return { cloudName, apiKey, apiSecret };
};

const buildAuthHeader = (apiKey: string, apiSecret: string): string => {
  return `Basic ${toBase64(`${apiKey}:${apiSecret}`)}`;
};

const fetchByAssetFolder = async (
  cloudName: string,
  authHeader: string,
  folder: string,
): Promise<CloudinaryAsset[]> => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=${encodeURIComponent(folder)}`;

  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });

  if (response.status >= 400) {
    throw new Error('by_asset_folder failed');
  }

  const data: CloudinaryApiResponse = await response.json();
  return data.resources;
};

const fetchByPrefix = async (
  cloudName: string,
  authHeader: string,
  folder: string,
): Promise<CloudinaryAsset[]> => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video/upload?prefix=${encodeURIComponent(folder)}`;

  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });

  if (!response.ok) {
    const errorBody: CloudinaryErrorResponse = await response.json();
    throw new Error(errorBody.error.message);
  }

  const data: CloudinaryApiResponse = await response.json();
  return data.resources;
};

export const fetchCloudinaryAssets = async (folder: string): Promise<CloudinaryAsset[]> => {
  const { cloudName, apiKey, apiSecret } = getCredentials();
  const authHeader = buildAuthHeader(apiKey, apiSecret);

  try {
    return await fetchByAssetFolder(cloudName, authHeader, folder);
  } catch {
    try {
      return await fetchByPrefix(cloudName, authHeader, folder);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch Cloudinary assets: both by_asset_folder and prefix strategies failed.');
    }
  }
};
