import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import GradientButton from '@/components/ui/GradientButton';
import { SonicColors, SonicRadius, SonicSpacing } from '@/constants/sonic';
import { usePlaybackStore } from '@/stores/playbackStore';

interface ActionControlsProps {
  onShuffleToggle?: () => void;
}

export default function ActionControls({ onShuffleToggle }: ActionControlsProps) {
  const isShuffled = usePlaybackStore((s) => s.isShuffled);
  const isPlaying = usePlaybackStore((s) => s.isPlaying);

  const handleShuffle = () => {
    usePlaybackStore.getState().toggleShuffle();
    onShuffleToggle?.();
  };

  const handlePlayPause = () => {
    usePlaybackStore.getState().togglePlayPause();
  };

  return (
    <View style={styles.container}>
      <GradientButton
        bordered
        style={styles.smallButton}
        onPress={() => {}}>
        <SymbolView
          name={{
            ios: 'arrow.down.circle',
            android: 'download',
            web: 'download',
          }}
          size={28}
          weight="regular"
          tintColor={SonicColors['on-surface-variant']}
        />
      </GradientButton>

      <GradientButton
        size="large"
        circular
        glow
        onPress={handlePlayPause}>
        <SymbolView
          name={{
            ios: isPlaying ? 'pause.fill' : 'play.fill',
            android: isPlaying ? 'pause' : 'play_arrow',
            web: isPlaying ? 'pause' : 'play_arrow',
          }}
          size={36}
          weight="bold"
          tintColor={SonicColors['on-primary']}
        />
      </GradientButton>

      <GradientButton
        bordered
        style={[
          styles.smallButton,
          isShuffled && styles.shuffleActive,
        ]}
        onPress={handleShuffle}>
        <SymbolView
          name={{
            ios: 'shuffle',
            android: 'shuffle',
            web: 'shuffle',
          }}
          size={24}
          weight="regular"
          tintColor={
            isShuffled
              ? SonicColors.primary
              : SonicColors['on-surface-variant']
          }
        />
      </GradientButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SonicSpacing.marginMobile,
    gap: SonicSpacing.stackLg,
    marginBottom: SonicSpacing.stackLg,
  },
  smallButton: {
    width: 48,
    height: 48,
    borderRadius: SonicRadius.full,
  },
  shuffleActive: {
    borderColor: `${SonicColors.primary}55`,
  },
});
