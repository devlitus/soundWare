import { SymbolView } from 'expo-symbols';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { SonicColors, SonicRadius, SonicSpacing, SonicTypography } from '@/constants/sonic';
import { listItemStyles } from '@/constants/listItemStyles';
import type { Track } from '@/types/audio';
import { usePlaybackStore } from '@/stores/playbackStore';
import { usePlaylistStore } from '@/stores/playlistStore';

interface TrackItemProps {
  track: Track;
  index: number;
}

export default function TrackItem({ track, index }: TrackItemProps) {
  const currentTrackId = usePlaybackStore((s) => s.currentTrackId);
  const isActive = currentTrackId === track.id;
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      pulseOpacity.value = withRepeat(withTiming(0.4, { duration: 800 }), -1, true);
    } else {
      pulseOpacity.value = 1;
    }
  }, [isActive, pulseOpacity]);

  const pulseStyle = useAnimatedStyle(() => ({ opacity: pulseOpacity.value }));

  const handlePress = () => {
    usePlaybackStore.getState().togglePlayPause(track.id);
  };

  const handleFavorite = () => {
    usePlaylistStore.getState().toggleFavorite(track.id);
  };

  const isFavorite = usePlaylistStore.getState().isFavorite(track.id);

  return (
    <Pressable
      onPress={handlePress}
      style={[
        listItemStyles.container,
        isActive && styles.activeTrack,
        track.isOffline && styles.offlineTrack,
      ]}>
      <View style={styles.indexColumn}>
        {isActive ? (
          <Animated.View style={pulseStyle}>
            <SymbolView
              name={{
                ios: 'waveform',
                android: 'equalizer',
                web: 'equalizer',
              }}
              size={20}
              weight="bold"
              tintColor={SonicColors.primary}
            />
          </Animated.View>
        ) : track.isOffline ? (
          <SymbolView
            name={{
              ios: 'icloud.slash',
              android: 'cloud_off',
              web: 'cloud_off',
            }}
            size={20}
            weight="regular"
            tintColor={SonicColors['on-surface-variant']}
          />
        ) : (
          <Text style={styles.indexText}>{index + 1}</Text>
        )}
      </View>

      <View style={listItemStyles.metadata}>
        <Text
          style={[
            listItemStyles.title,
            isActive && styles.activeText,
          ]}
          numberOfLines={1}>
          {track.title}
        </Text>
        <Text
          style={[
            listItemStyles.subtitle,
            isActive && styles.activeSubText,
          ]}
          numberOfLines={1}>
          {track.artist}
        </Text>
      </View>

      <View style={listItemStyles.actions}>
        <Text style={listItemStyles.duration}>{track.duration}</Text>
        <Pressable onPress={handleFavorite} style={styles.iconButton}>
          <SymbolView
            name={{
              ios: 'heart.fill',
              android: 'favorite',
              web: 'favorite',
            }}
            size={18}
            weight={isFavorite ? 'bold' : 'regular'}
            tintColor={
              isFavorite
                ? SonicColors.primary
                : SonicColors['on-surface-variant']
            }
          />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <SymbolView
            name={{
              ios: 'ellipsis',
              android: 'more_vert',
              web: 'more_vert',
            }}
            size={20}
            weight="regular"
            tintColor={SonicColors['on-surface-variant']}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activeTrack: {
    backgroundColor: `rgba(${parseInt(SonicColors.primary.slice(1, 3), 16)},${parseInt(SonicColors.primary.slice(3, 5), 16)},${parseInt(SonicColors.primary.slice(5, 7), 16)},0.1)`,
    borderLeftWidth: 4,
    borderLeftColor: SonicColors.primary,
  },
  offlineTrack: {
    opacity: 0.6,
  },
  indexColumn: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SonicSpacing.two,
  },
  indexText: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors['on-surface-variant'],
  },
  activeText: {
    color: SonicColors.primary,
  },
  activeSubText: {
    color: `${SonicColors.primary}99`,
  },
  iconButton: {
    padding: SonicSpacing.one,
    borderRadius: SonicRadius.full,
  },
});
