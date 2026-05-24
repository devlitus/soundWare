import { Stack, useSegments } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomNavBar from "@/components/BottomNavBar";
import { BottomNavHeight, SonicColors, SonicSpacing } from "@/constants/sonic";
import type { TabName } from "@/types/navigation";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const currentTab: TabName = (
    segments[0] === "(tabs)" && segments[1] ? segments[1] : "player"
  ) as TabName;

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.content,
          {
            paddingBottom:
              BottomNavHeight + insets.bottom + SonicSpacing.stackMd,
          },
        ]}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="library" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="playlists" />
        </Stack>
      </View>
      <BottomNavBar activeTab={currentTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SonicColors.background,
  },
  content: {
    flex: 1,
  },
});
