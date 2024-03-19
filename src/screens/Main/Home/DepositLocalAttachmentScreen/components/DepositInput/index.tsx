import React, { forwardRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import NewIcon from 'react-native-vector-icons/Feather';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { COINS } from 'assets/images/coins';
import AppText from '../../../../../../shared/components/AppText';
import AnyIcon, { Icons } from '../../../../../../shared/components/AnyIcon';

interface Props extends TextInputProps {
  coin: {
    ticker: string;
  };
  inputStyle?: StyleProp<ViewStyle>;
  error?: string | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  onPressIcon?: () => void;
  eye?: string;
  iconColor?: string;
  label?: string;
  leftIcon?: string;
  leftIconType?: any;
  leftIconColor?: any;
  iconType?: any;
  onPressLeftIcon?: () => any;
  showRightText?: boolean;
  onPressRightText?: () => void;
  rightText?: string;
  onPress?: () => void;
  hideDivider?: boolean;
  hideChevron?: boolean;
  parentContainerStyle?: StyleProp<ViewStyle>;
  name?: string;
  required?: boolean;
  coinDisable?: boolean;
  isSpecial?: boolean;
}

function DepositInput(props: Props, ref: any) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={props.parentContainerStyle}
      onPress={props.onPress && props.onPress}
    >
      <View
        style={
          props.isSpecial
            ? [styles.mainContainerSpecial]
            : [styles.mainContainer]
        }
      >
        {props.label && (
          <AppText style={[styles.label, props.labelStyle]}>
            {props.label}{' '}
            {props?.required && <AppText children="*" color="red" />}
          </AppText>
        )}
        <View style={[styles.container, props.inputStyle]}>
          <TouchableOpacity
            disabled={props?.coinDisable}
            style={[
              styles.leftIconContainer,
              { borderRightWidth: !props?.hideDivider ? 0.5 : 0 },
            ]}
          >
            <FastImage
              source={COINS.MXN}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.contain}
            />

            <AppText
              style={{ marginRight: props?.hideChevron ? THEME.MARGIN.LOW : 0 }}
            >
              {props?.coin?.ticker?.toUpperCase()}
            </AppText>
            {!props?.hideChevron && (
              <AnyIcon
                type={Icons.Entypo}
                name="chevron-small-down"
                size={18}
                color="grey"
                style={{ alignSelf: 'center' }}
                onPress={props.onPressLeftIcon}
              />
            )}
          </TouchableOpacity>

          <View
            style={{ flex: 1 }}
            pointerEvents={props?.onPress ? 'none' : 'auto'}
          >
            <TextInput
              ref={ref}
              name={props.name}
              keyboardType="decimal-pad"
              cursorColor={THEME.COLORS.white}
              {...props}
              placeholder={`0.00 ${props?.coin?.ticker?.toUpperCase()}`}
              placeholderTextColor={THEME.COLORS.textGrey}
              style={
                props.isSpecial
                  ? [styles.inputContainerSpecial]
                  : [
                      styles.inputContainer,
                      props.textInputStyle,
                      { marginLeft: props?.leftIcon && 3 },
                    ]
              }
            />
          </View>
          {props.icon ? (
            <AnyIcon
              onPress={props.onPressIcon}
              style={styles.icon}
              name={props.icon}
              type={props?.iconType}
              size={20}
              color={props.iconColor ? props.iconColor : THEME.COLORS.inputGrey}
            />
          ) : (
            <NewIcon
              onPress={props.onPressIcon}
              style={styles.icon} // @ts-ignore
              name={props.eye}
              size={20}
              color={THEME.COLORS.primary}
            />
          )}
          {props?.showRightText && (
            <TouchableOpacity
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={props?.onPressRightText}
            >
              <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                {props?.rightText}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default forwardRef(DepositInput);

const styles = StyleSheet.create({
  mainContainer: {
    // alignItems: "center",
    width: '100%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: THEME.COLORS.secondaryYellow,
    marginVertical: THEME.MARGIN.LOW,
    paddingLeft: THEME.PADDING.LOW,
    backgroundColor: 'rgba(25, 28, 27, 1)',
    borderRadius: THEME.RADIUS.BOX,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    shadowColor: THEME.COLORS.secondaryYellow,
  },
  logo: {
    alignSelf: 'center',
    width: RF(25),

    height: RF(25),
    marginRight: THEME.MARGIN.LOW,
  },
  mainContainerSpecial: {
    // alignItems: "center",
    width: '100%',
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.LOW,
    backgroundColor: 'rgba(99, 101, 103, 1)',
    borderRadius: THEME.RADIUS.BOX,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    shadowColor: THEME.COLORS.primaryBackground,
  },

  container: {
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: RF(50),

    backgroundColor: 'rgba(25, 28, 27, 1)',
    borderRadius: THEME.RADIUS.BOX,
  },
  image: {
    width: RF(25),
    height: RF(25),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  imageSpecial: {
    width: RF(25),
    height: RF(25),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: THEME.MARGIN.LOW,
    marginLeft: THEME.MARGIN.MID_LOW,
    alignSelf: 'center',
  },
  errorView: {
    marginVertical: THEME.MARGIN.VERYLOW,
    marginLeft: THEME.MARGIN.LOW,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    color: 'white',
    height: '100%',
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XSMALL,
    paddingLeft: THEME.PADDING.VERYLOW,
  },
  inputContainerSpecial: {
    flex: 1,
    color: 'white',
    height: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XSMALL,
    paddingLeft: THEME.PADDING.VERYLOW,
  },
  maxButton: {
    width: RF(52),
    height: '100%',
    borderRadius: THEME.RADIUS.SMALLBOX,
    overflow: 'hidden',
  },
  label: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    color: THEME.COLORS.textGrey,

    marginTop: RF(10),
  },
  leftIconContainer: {
    flexDirection: 'row',
    marginRight: RF(5),
    paddingRight: RF(5),
    borderRightWidth: 1,
    borderColor: THEME.COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    // paddingHorizontal: THEME.SPACING.SPACING_8,
  },
});
