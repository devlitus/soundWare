import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import CloudinaryAssetItem from '@/components/CloudinaryAssetItem';
import UploadArea from '@/components/UploadArea';
import {
  BottomNavHeight,
  MiniPlayerInset,
  SonicColors,
  SonicSpacing,
  SonicTypography,
  TopAppBarHeight,
} from '@/constants/sonic';
import { useCloudinaryStore } from '@/stores/cloudinaryStore';
import { usePlaybackStore } from '@/stores/playbackStore';

export default function LibraryScreen() {
  const assets = useCloudinaryStore((s) => s.assets);
  const isLoading = useCloudinaryStore((s) => s.isLoading);
  const error = useCloudinaryStore((s) => s.error);
  const selectAsset = usePlaybackStore((s) => s.selectAsset);
  const fetchAssets = useCloudinaryStore((s) => s.fetchAssets);

  useEffect(() => {
    fetchAssets("podcast");
  }, [fetchAssets]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <UploadArea />

      <Text style={styles.heading}>Tu Biblioteca</Text>
      {isLoading && (
        <ActivityIndicator size="small" color={SonicColors.primary} />
      )}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {assets.length > 0 && (
        <View style={styles.list}>
          {assets.map((asset) => (
            <CloudinaryAssetItem key={asset.asset_id} asset={asset} onPress={() => selectAsset(asset)} />
          ))}
        </View>
      )}
      {assets.length === 0 && !isLoading && !error && (
        <Text style={styles.emptyText}>No hay podcasts disponibles</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SonicColors.background,
  },
  contentContainer: {
    paddingTop: TopAppBarHeight,
    paddingBottom: MiniPlayerInset + BottomNavHeight + SonicSpacing.three,
    paddingHorizontal: SonicSpacing.marginMobile,
    gap: SonicSpacing.three,
  },
  heading: {
    fontSize: SonicTypography.headlineLgMobile.fontSize,
    fontWeight: SonicTypography.headlineLgMobile.fontWeight,
    lineHeight: SonicTypography.headlineLgMobile.lineHeight,
    color: SonicColors['on-surface'],
  },
  list: {
    gap: SonicSpacing.two,
  },
  errorText: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors.error,
  },
  emptyText: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors['on-surface-variant'],
  },
});
