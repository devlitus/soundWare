import { StyleSheet } from 'react-native';

import { SonicColors, SonicRadius, SonicSpacing, SonicTypography } from '@/constants/sonic';

export const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: SonicSpacing.three,
  },
  indexColumn: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SonicSpacing.two,
  },
  indexText: {
    fontSize: SonicTypography.bodySm.fontSize,
    fontWeight: SonicTypography.bodySm.fontWeight,
    color: SonicColors['on-surface-variant'],
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
    fontVariant: ['tabular-nums'],
    minWidth: 58,
  },
  iconButton: {
    padding: SonicSpacing.one,
    borderRadius: SonicRadius.full,
  },
});
