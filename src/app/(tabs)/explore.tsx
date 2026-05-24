import { StyleSheet, Text, View } from 'react-native';

import { SonicColors, SonicTypography } from '@/constants/sonic';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SonicColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {

    fontSize: SonicTypography.headlineLgMobile.fontSize,
    fontWeight: SonicTypography.headlineLgMobile.fontWeight,
    color: SonicColors['on-surface'],
  },
});
