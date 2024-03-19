import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RF } from 'shared/theme/responsive';
import AppText from '../AppText';

interface Props {
  checked: boolean | undefined;
  setChecked: (val: boolean) => void | undefined;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  isSmallBal?: boolean;
  onCheckColor?: string;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  checkBoxStyle?: StyleProp<ViewStyle>;
}
function PrimaryCheckboxV2({
  checked,
  setChecked,
  title,
  loading,
  disabled,
  viewStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={() => setChecked(!checked)}
      style={[styles.container, viewStyle]}
    >
      <Icon
        disabled
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={24}
        color={checked ? THEME.COLORS.secondaryYellow : THEME.COLORS.white}
      />

      <AppText style={[styles.checkText, textStyle]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: THEME.MARGIN.LOW,
    marginHorizontal: THEME.MARGIN.LOW,
  },
  checkText: {
    alignSelf: 'center',
    fontSize: RF(11),
    color: THEME.COLORS.white,
    marginLeft: THEME.MARGIN.LOW,
    width: '90%',
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  checkbox: {
    ...GLOBAL_STYLE.CENTER,
  },
});

// make this component available to the app
export default PrimaryCheckboxV2;
