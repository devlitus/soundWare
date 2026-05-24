import { StyleSheet } from 'react-native';

import { SonicColors, SonicSpacing, SonicTypography } from '@/constants/sonic';

export const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: SonicSpacing.three,
  },
  metadata: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: SonicTypography.titleMd.fontSize,
    fontWeight: SonicTypography.titleMd.fontWeight,
    color: SonicColors['on-surface'],
  },
  subtitle: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors['on-surface-variant'],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SonicSpacing.three,
  },
  duration: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors['on-surface-variant'],
  },
});
