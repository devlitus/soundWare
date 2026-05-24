import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  BottomNavHeight,
  SonicColors,
  SonicRadius,
  SonicSpacing,
  SonicTypography,
} from "@/constants/sonic";
import type { TabName } from "@/types/navigation";

const TABS = [
  {
    name: "player",
    label: "Player",
    icon: {
      ios: "play.circle",
      android: "play_circle",
      web: "play_circle",
    },
  },
  {
    name: "library",
    label: "Library",
    icon: {
      ios: "music.note.list",
      android: "library_music",
      web: "library_music",
    },
  },
  {
    name: "explore",
    label: "Explore",
    icon: {
      ios: "globe",
      android: "explore",
      web: "explore",
    },
  },
  {
    name: "playlists",
    label: "Playlists",
    icon: {
      ios: "music.note",
      android: "queue_music",
      web: "queue_music",
    },
  },
] as const;

interface BottomNavBarProps {
  activeTab: TabName;
}

export default function BottomNavBar({ activeTab }: BottomNavBarProps) {
  const handlePress = (tab: TabName) => {
    const path = tab === "player" ? "/" : `/${tab}`;
    router.replace(`/(tabs)${path}` as never);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.name === activeTab;
        return (
          <Pressable
            key={tab.name}
            onPress={() => handlePress(tab.name)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <View>
              <SymbolView
                name={tab.icon}
                size={24}
                weight={isActive ? "bold" : "regular"}
                tintColor={
                  isActive
                    ? SonicColors.primary
                    : `${SonicColors["on-surface-variant"]}B3`
                }
              />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: BottomNavHeight,
    backgroundColor: `${SonicColors["surface-container-low"]}E6`,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: SonicSpacing.three,
    paddingBottom: SonicSpacing.two,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 30,
    zIndex: 50,
  },
  tab: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    gap: SonicSpacing.unit,
  },
  activeTab: {},
  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SonicRadius.full,
  },
  // activeIconWrapper: {
  //   width: 48,
  //   height: 20,
  // },
  label: {
    fontSize: SonicTypography.labelCaps.fontSize,
    fontWeight: SonicTypography.labelCaps.fontWeight,
    letterSpacing: SonicTypography.labelCaps.letterSpacing,
    color: `${SonicColors["on-surface-variant"]}B3`,
  },
  activeLabel: {
    color: SonicColors.primary,
    fontWeight: "800",
  },
});
