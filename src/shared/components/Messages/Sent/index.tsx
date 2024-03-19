import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { FONTS } from '../../../constants/theme';
import { GlobalStyleSheet } from '../../../constants/styleSheet';

interface Props {
  message: string;
  duration: string;
}
function Sent({ message, duration }: Props) {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          ...styles.caret,
          borderTopColor: THEME.COLORS.white,
          borderLeftColor: THEME.COLORS.white,
        }}
      />
      <View
        style={{
          ...styles.content,
          backgroundColor: THEME.COLORS.white,
          ...GlobalStyleSheet.shadow,
        }}
      >
        <Text style={{ ...styles.message, color: THEME.COLORS.primary }}>
          {message}
        </Text>
        <Text
          style={[styles.duration, { color: THEME.COLORS.secondaryYellow }]}
        >
          {duration}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    ...FONTS.fontSm,
    paddingLeft: 20,
  },
  container: {
    width: '75%',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 8,
  },
  content: {
    padding: 15,
    borderRadius: THEME.RADIUS.BOX,
    borderTopRightRadius: 0,
  },
  caret: {
    borderWidth: 6,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    right: -12,
  },
  duration: {
    ...FONTS.font,
    fontSize: 11,
    opacity: 0.5,
    position: 'absolute',
    bottom: 0,
    left: 8,
  },
});

export default Sent;
