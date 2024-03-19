import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

interface Props {
  onPress: () => void;
}
function Swapper({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonPress}>
      <AnyIcon
        disabled
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        name="swap-vertical-circle"
        type={Icons.MaterialCommunityIcons}
        size={34}
        color="#979797"
      />
    </TouchableOpacity>
  );
}

export default Swapper;
const styles = StyleSheet.create({
  buttonPress: {
    width: RF(30),
    height: RF(30),
    borderRadius: THEME.RADIUS.OVAL,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: RF(14),
  },
});
