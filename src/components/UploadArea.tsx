import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import {
  SonicColors,
  SonicRadius,
  SonicSpacing,
  SonicTypography,
} from '@/constants/sonic';

export default function UploadArea() {
  return (
    <View style={styles.container}>
      <SymbolView
        name={{ ios: 'icloud.and.arrow.up', android: 'cloud_upload', web: 'cloud_upload' }}
        size={40}
        tintColor={SonicColors.primary}
      />
      <Text style={styles.title}>Toca para seleccionar o arrastra tus archivos</Text>
      <Text style={styles.subtitle}>Soporta WAV, FLAC, MP3 (Max 50MB)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 192,
    borderRadius: SonicRadius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: SonicColors['outline-variant'],
    backgroundColor: `${SonicColors['surface-container-low']}80`,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SonicSpacing.two,
  },
  title: {
    fontSize: SonicTypography.titleMd.fontSize,
    fontWeight: SonicTypography.titleMd.fontWeight,
    lineHeight: SonicTypography.titleMd.lineHeight,
    color: SonicColors['on-surface'],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    lineHeight: SonicTypography.bodySm.lineHeight,
    color: SonicColors['on-surface-variant'],
    textAlign: 'center',
  },
});
