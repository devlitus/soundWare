import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";

import { listItemStyles } from "@/constants/listItemStyles";
import { SonicColors } from "@/constants/sonic";
import type { CloudinaryAsset } from "@/types/cloudinary";
import { formatDuration } from "@/utils/formatDuration";
import { formatFileSize } from "@/utils/formatFileSize";

interface CloudinaryAssetItemProps {
  asset: CloudinaryAsset;
  onPress?: () => void;
  index?: number;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onMore?: () => void;
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
  index,
  isFavorite,
  onFavorite,
  onMore,
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
      {index !== undefined && (
        <View style={listItemStyles.indexColumn}>
          <Text style={listItemStyles.indexText}>{index + 1}</Text>
        </View>
      )}

      <View style={listItemStyles.metadata}>
        <Text style={listItemStyles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={listItemStyles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      <View style={listItemStyles.actions}>
        {asset.resource_type !== "image" && asset.duration != null && (
          <Text style={listItemStyles.duration}>
            {formatDuration(asset.duration)}
          </Text>
        )}
        <Pressable onPress={onMore} style={listItemStyles.iconButton}>
          <SymbolView
            name={{
              ios: "ellipsis",
              android: "more_vert",
              web: "more_vert",
            }}
            size={20}
            weight="regular"
            tintColor={SonicColors["on-surface-variant"]}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
