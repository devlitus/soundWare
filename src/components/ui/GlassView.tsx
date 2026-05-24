import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

interface GlassViewProps {
  children: ReactNode;
  style?: ViewStyle;
  borderColor?: string;
}

export default function GlassView({
  children,
  style,
  borderColor = 'rgba(255,255,255,0.1)',
}: GlassViewProps) {
  return <View style={[styles.container, { borderColor }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(19,19,19,0.6)',
    backfaceVisibility: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
});
