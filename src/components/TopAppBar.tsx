import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  SonicColors,
  SonicRadius,
  SonicSpacing,
  SonicTypography,
  TopAppBarHeight,
} from '@/constants/sonic';

interface TopAppBarProps {
  isScrolled: boolean;
}

export default function TopAppBar({ isScrolled }: TopAppBarProps) {
  const insets = useSafeAreaInsets();
  const bgOpacity = useSharedValue(0);

  useEffect(() => {
    bgOpacity.value = withTiming(isScrolled ? 1 : 0, { duration: 300 });
  }, [isScrolled, bgOpacity]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <Animated.View style={[StyleSheet.absoluteFill, styles.darkOverlay, overlayStyle]} />
      <SymbolView
        name={{ ios: 'line.3.horizontal', android: 'menu', web: 'menu' }}
        size={24}
        weight="regular"
        tintColor={SonicColors['on-surface-variant']}
      />
      <Text style={styles.title}>SoundWave</Text>
      <View style={styles.moreButton}>
        <SymbolView
          name={{ ios: 'ellipsis', android: 'more_vert', web: 'more_vert' }}
          size={20}
          weight="regular"
          tintColor={SonicColors.primary}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: TopAppBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SonicSpacing.marginMobile,
  },
  darkOverlay: {
    backgroundColor: 'rgba(19,19,19,0.88)',
  },
  title: {
    fontSize: SonicTypography.headlineLgMobile.fontSize,
    fontWeight: SonicTypography.headlineLgMobile.fontWeight,
    color: SonicColors.primary,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: SonicRadius.full,
    backgroundColor: SonicColors['surface-container-highest'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
