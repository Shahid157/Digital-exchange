import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../../theme';
import AppConfig from '../../utils/Config';

const appConfig = AppConfig();

export default function DebugLabel() {
  if (appConfig.Env === 'production') return null;

  return (
    <View pointerEvents="none" style={styles.container}>
      <Text style={styles.text}>debug</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 100,
    right: -20,
    top: 40,
    backgroundColor: THEME.COLORS.PRIMARY_TRANS,
    transform: [{ rotate: '45deg' }],
  },
  text: {
    width: '100%',
    textAlign: 'center',
  },
});
