import { StyleSheet, View } from 'react-native';

import { SonicColors } from '@/constants/sonic';

interface ProgressBarProps {
  progress: number;
  showThumb?: boolean;
}

export default function ProgressBar({
  progress,
  showThumb = false,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { flex: clampedProgress }]} />
      <View
        style={[
          styles.thumb,
          { opacity: showThumb ? 1 : 0 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fill: {
    height: '100%',
    backgroundColor: SonicColors.primary,
    borderRadius: 2,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    right: -4,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SonicColors.primary,
    shadowColor: SonicColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
});
