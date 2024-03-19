/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

interface Props {
  iconName: string;
  title: string;
  description: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

function DashboardButtons(props: Props) {
  return (
    <View style={[styles.container, props.styles]}>
      <TouchableOpacity onPress={props?.onPress} style={styles.subContainer}>
        <View style={styles.top}>
          <FastImage source={props.iconName} style={styles.icon} />

          <AppText medium>{props?.title}</AppText>
        </View>
        <View style={styles.bottom}>
          <AppText h6 color={THEME.COLORS.textGrey}>
            {props?.description}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default DashboardButtons;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: RF(100),
    backgroundColor: 'rgba(33, 33, 33, 1)',
    borderRadius: THEME.RADIUS.BOX,
    padding: RF(10),
    marginHorizontal: THEME.MARGIN.VERYLOW,
    justifyContent: 'center',
    maxWidth: RF(200, 150),
  },
  subContainer: {
    height: RF(100),
  },
  top: {
    flex: 0.5,

    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: RF(25),
    height: RF(25),
    marginRight: THEME.MARGIN.LOW,
  },
  bottom: { flex: 0.4, justifyContent: 'center' },
});
