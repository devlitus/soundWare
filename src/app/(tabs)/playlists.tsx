import { SymbolView } from 'expo-symbols';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import ActionControls from "@/components/ActionControls";
import PlaylistHeader from "@/components/PlaylistHeader";
import TopAppBar from "@/components/TopAppBar";
import { listItemStyles } from "@/constants/listItemStyles";
import {
  SonicColors,
  SonicRadius,
  SonicSpacing,
  TopAppBarHeight,
} from "@/constants/sonic";
import { useScrollAnim } from "@/hooks/useScrollAnim";
import { usePlaybackStore } from "@/stores/playbackStore";
import { usePlaylistStore } from "@/stores/playlistStore";
import type { Track } from "@/types/audio";

interface TrackRowProps {
  track: Track;
  index: number;
}

function TrackRow({ track, index }: TrackRowProps) {
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
        isActive && localStyles.activeTrack,
        track.isOffline && localStyles.offlineTrack,
      ]}>
      <View style={listItemStyles.indexColumn}>
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
          <Text style={listItemStyles.indexText}>{index + 1}</Text>
        )}
      </View>

      <View style={listItemStyles.metadata}>
        <Text
          style={[
            listItemStyles.title,
            isActive && localStyles.activeText,
          ]}
          numberOfLines={1}>
          {track.title}
        </Text>
        <Text
          style={[
            listItemStyles.subtitle,
            isActive && localStyles.activeSubText,
          ]}
          numberOfLines={1}>
          {track.artist}
        </Text>
      </View>

      <View style={listItemStyles.actions}>
        <Text style={listItemStyles.duration}>{track.duration}</Text>
        <Pressable onPress={handleFavorite} style={listItemStyles.iconButton}>
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
        <Pressable style={listItemStyles.iconButton}>
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

export default function PlaylistsScreen() {
  const { isScrolled, handleScroll } = useScrollAnim();
  const playlist = usePlaylistStore((s) => s.playlist);

  return (
    <View style={styles.container}>
      <TopAppBar isScrolled={isScrolled} />
      <LinearGradient
        colors={["rgba(208,188,255,0.15)", "#131313"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.heroGradient}
        pointerEvents="none"
      />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PlaylistHeader playlist={playlist} />
        <ActionControls />
        <View style={styles.trackContainer}>
          {playlist.tracks.map((track: Track, index: number) => (
            <View key={track.id}>
              {index > 0 && <View style={styles.trackSeparator} />}
              <TrackRow track={track} index={index} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SonicColors.background,
  },
  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    zIndex: 0,
  },
  scrollContent: {
    paddingTop: TopAppBarHeight,
    paddingBottom: SonicSpacing.stackLg,
  },
  trackContainer: {
    marginHorizontal: SonicSpacing.two,
    backgroundColor: `${SonicColors["surface-container"]}80`,
    borderRadius: SonicRadius.xl,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  trackSeparator: {
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
});

const localStyles = StyleSheet.create({
  activeTrack: {
    backgroundColor: `rgba(${parseInt(SonicColors.primary.slice(1, 3), 16)},${parseInt(SonicColors.primary.slice(3, 5), 16)},${parseInt(SonicColors.primary.slice(5, 7), 16)},0.1)`,
    borderLeftWidth: 4,
    borderLeftColor: SonicColors.primary,
  },
  offlineTrack: {
    opacity: 0.6,
  },
  activeText: {
    color: SonicColors.primary,
  },
  activeSubText: {
    color: `${SonicColors.primary}99`,
  },
});
