export interface CloudinaryAsset {
  asset_id: string;
  public_id: string;
  folder: string;
  filename: string;
  format: string;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number | null;
  height: number | null;
  url: string;
  secure_url: string;
  duration?: number;
  audio?: {
    codec: string;
    bit_rate: string;
    frequency: number;
    channels: number;
    channel_layout: string;
  };
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface CloudinaryApiResponse {
  resources: CloudinaryAsset[];
  next_cursor: string | null;
  total_count: number;
  rate_limit_allowed?: number;
  rate_limit_remaining?: number;
  rate_limit_reset_at?: string;
}

export interface CloudinaryErrorResponse {
  error: {
    message: string;
    http_code?: number;
  };
}
