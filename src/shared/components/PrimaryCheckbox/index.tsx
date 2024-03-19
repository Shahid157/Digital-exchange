import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import AnyIcon, { Icons } from '../AnyIcon';
import AppText from '../AppText';

interface Props {
  checked: boolean | undefined;
  setChecked: (val: boolean) => void | undefined;
  title: string;
  loading: boolean;
  disabled: boolean;
  isSmallBal: boolean;
  onCheckColor: string;
  textStyle: StyleProp<TextStyle>;
  viewStyle: StyleProp<ViewStyle>;
  checkBoxStyle: StyleProp<ViewStyle>;
}
function PrimaryCheckbox({
  checked,
  setChecked,
  title,
  loading,
  disabled,
  viewStyle,
  checkBoxStyle,
  isSmallBal,
  onCheckColor,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={() => setChecked(!checked)}
      style={[styles.container, viewStyle]}
    >
      <TouchableOpacity
        disabled={loading || disabled}
        style={[
          styles.checkbox,
          checkBoxStyle,
          { borderWidth: checked ? 0 : 1 },
        ]}
        onPress={() => setChecked(!checked)}
      >
        {checked && (
          <AnyIcon
            disabled
            type={Icons.MaterialCommunityIcons}
            name={isSmallBal ? 'checkbox-marked' : 'check-circle'}
            size={20}
            color={onCheckColor || THEME.COLORS.secondaryYellow}
          />
        )}
      </TouchableOpacity>

      <AppText style={[styles.checkText, textStyle]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: THEME.MARGIN.LOW,
    width: '100%',
  },
  checkText: {
    alignSelf: 'center',
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  checkbox: {
    ...GLOBAL_STYLE.CENTER,
    borderWidth: 1,
    borderRadius: THEME.RADIUS.ROUND,
    borderColor: THEME.COLORS.textGrey,
    marginHorizontal: THEME.MARGIN.LOW,
    width: 20,
    height: 20,
  },
});

// make this component available to the app
export default PrimaryCheckbox;
