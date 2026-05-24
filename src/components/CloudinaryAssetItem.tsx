import { Pressable, Text, View } from 'react-native';

import { listItemStyles } from '@/constants/listItemStyles';
import type { CloudinaryAsset } from '@/types/cloudinary';
import { formatDuration } from '@/utils/formatDuration';
import { formatFileSize } from '@/utils/formatFileSize';

interface CloudinaryAssetItemProps {
  asset: CloudinaryAsset;
  onPress?: () => void;
}

const extractTitleFromPublicId = (publicId: string): string => {
  const segments = publicId.split("/");
  const lastSegment = segments[segments.length - 1] ?? publicId;
  const withoutExtension = lastSegment.replace(/\.[^.]+$/, "");
  return withoutExtension.replace(/[-_]/g, " ");
};

export default function CloudinaryAssetItem({
  asset,
  onPress,
}: CloudinaryAssetItemProps) {
  const title = extractTitleFromPublicId(asset.public_id);
  const subtitleParts: string[] = [];

  if (asset.format) {
    subtitleParts.push(asset.format.toUpperCase());
  }
  if (asset.bytes) {
    subtitleParts.push(formatFileSize(asset.bytes));
  }

  const subtitle = subtitleParts.join(" · ");

  return (
    <Pressable onPress={onPress} style={listItemStyles.container}>
      <View style={listItemStyles.metadata}>
        <Text style={listItemStyles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={listItemStyles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      <View style={listItemStyles.actions}>
        <Text style={listItemStyles.duration}>{formatDuration(asset.duration)}</Text>
      </View>
    </Pressable>
  );
}
