import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";

import ActionControls from "@/components/ActionControls";
import PlaylistHeader from "@/components/PlaylistHeader";
import TopAppBar from "@/components/TopAppBar";
import TrackItem from "@/components/TrackItem";
import {
  SonicColors,
  SonicRadius,
  SonicSpacing,
  TopAppBarHeight,
} from "@/constants/sonic";
import { useScrollAnim } from "@/hooks/useScrollAnim";
import { usePlaylistStore } from "@/stores/playlistStore";
import type { Track } from "@/types/audio";

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
              <TrackItem track={track} index={index} />
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
