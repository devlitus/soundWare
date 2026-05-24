import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import {
  SonicColors,
  SonicRadius,
  SonicSpacing,
  SonicTypography,
} from "@/constants/sonic";
import type { Playlist } from "@/types/audio";

interface PlaylistHeaderProps {
  playlist: Playlist;
}

export default function PlaylistHeader({ playlist }: PlaylistHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: playlist.coverUrl }}
          style={styles.cover}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.coverOverlay} />
      </View>
      <Text style={styles.title}>{playlist.title}</Text>
      <Text style={styles.description}>{playlist.description}</Text>
      <View style={styles.metadata}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{playlist.author}</Text>
        </View>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.chipText}>{playlist.totalTracks} Tracks</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.chipText}>{playlist.totalDuration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SonicSpacing.marginMobile,
    paddingTop: SonicSpacing.stackLg,
    paddingBottom: SonicSpacing.stackMd,
    alignItems: "center",
  },
  coverContainer: {
    width: 256,
    height: 256,
    borderRadius: SonicRadius.xl,
    overflow: "hidden",
    marginBottom: SonicSpacing.stackMd,
    shadowColor: SonicColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: SonicTypography.headlineLgMobile.fontSize,
    fontWeight: SonicTypography.headlineLgMobile.fontWeight,
    color: SonicColors["on-surface"],
    marginBottom: SonicSpacing.unit,
  },
  description: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors["on-surface-variant"],
    maxWidth: "80%",
    opacity: 0.8,
    textAlign: "center",
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: SonicSpacing.two,
    marginTop: SonicSpacing.stackSm,
  },
  chip: {
    paddingHorizontal: SonicSpacing.two,
    paddingVertical: SonicSpacing.unit,
    borderRadius: SonicRadius.full,
    backgroundColor: SonicColors["surface-container-high"],
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  chipText: {
    fontSize: SonicTypography.labelCaps.fontSize,
    fontWeight: SonicTypography.labelCaps.fontWeight,
    letterSpacing: SonicTypography.labelCaps.letterSpacing,
    color: SonicColors.tertiary,
  },
  separator: {
    color: SonicColors.tertiary,

    fontSize: SonicTypography.labelCaps.fontSize,
  },
});
