import { SymbolView, type AndroidSymbol, type SFSymbol } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  SonicColors,
  SonicRadius,
  SonicSpacing,
  SonicTypography,
} from "@/constants/sonic";

interface LibraryItemProps {
  title: string;
  subtitle: string;
  iconSymbol: { ios: SFSymbol; android: AndroidSymbol; web: AndroidSymbol };
  iconTintColor: string;
  iconBackgroundColor: string;
  useGradientBg?: boolean;
  onPress: () => void;
}

export default function LibraryItem({
  title,
  subtitle,
  iconSymbol,
  iconTintColor,
  iconBackgroundColor,
  onPress,
}: LibraryItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        {/* <SymbolView name={iconSymbol} size={24} tintColor={iconTintColor} /> */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <SymbolView
        name={{
          ios: "chevron.right",
          android: "chevron_right",
          web: "chevron_right",
        }}
        size={20}
        tintColor={SonicColors["on-surface-variant"]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    backgroundColor: `${SonicColors["surface-container"]}80`,
    borderRadius: SonicRadius.md,
    paddingHorizontal: SonicSpacing.three,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: SonicTypography.bodyLg.fontSize,
    fontWeight: SonicTypography.bodyLg.fontWeight,
    lineHeight: SonicTypography.bodyLg.lineHeight,
    color: SonicColors["on-surface"],
  },
  subtitle: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    lineHeight: SonicTypography.bodySm.lineHeight,
    color: SonicColors["on-surface-variant"],
  },
});
