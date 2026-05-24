import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { SonicColors, SonicRadius } from '@/constants/sonic';

interface GradientButtonProps {
  children: ReactNode;
  size?: 'normal' | 'large';
  circular?: boolean;
  glow?: boolean;
  bordered?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function GradientButton({
  children,
  size = 'normal',
  circular = false,
  glow = false,
  bordered = false,
  onPress,
  style,
}: GradientButtonProps) {
  const dimensions = size === 'large' ? 72 : 48;
  const borderRadius = circular ? dimensions / 2 : SonicRadius.default;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        {
          width: dimensions,
          height: dimensions,
          borderRadius,
          overflow: 'hidden' as const,
        },
        glow && styles.glowShadow,
        pressed && styles.pressed,
        bordered && styles.bordered,
        style,
      ]}>
      {!bordered && (
        <LinearGradient
          colors={[SonicColors.primary, SonicColors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={styles.inner}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {},
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.95 }],
  },
  glowShadow: {
    shadowColor: SonicColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
  bordered: {
    borderWidth: 1,
    borderColor: `${SonicColors.primary}33`,
  },
});
