import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import AnyIcon, { Icons } from '../AnyIcon';

interface Props {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  leftIcon?: string;
  rightIcon?: string;
  rightImage?: string;
  rightIconType?: any;
  rightIconColor?: string;
  onPressRightIcon?: () => void;
  leftIconPress?: () => void;
  hideDivider?: boolean;
}
function AppHeader(props: Props) {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        { borderBottomWidth: props?.hideDivider ? 0 : props?.title ? 1 : 1.5 },
        props?.headerStyle,
      ]}
    >
      <View>
        {props?.leftIcon == 'back' && (
          <TouchableOpacity
            onPress={
              props?.leftIconPress ? props?.leftIconPress : navigation.goBack
            }
            style={styles.backView}
          >
            <AnyIcon
              disabled
              type={Icons.AntDesign}
              name="arrowleft"
              size={22}
              color="white"
            />
          </TouchableOpacity>
        )}

        {props?.title && (
          <Text style={[styles.titleStyling, props?.titleStyle]}>
            {props?.title}
          </Text>
        )}
      </View>
      {props?.rightImage ? (
        <TouchableOpacity
          style={{
            // backgroundColor: "#191C1B",Í
            top: 20,
            right: 10,
            padding: RF(5),
            borderRadius: THEME.RADIUS.SMALLBOX,
            alignItems: 'center',
          }}
          onPress={props?.onPressRightIcon}
        >
          <FastImage
            source={props?.rightImage as any}
            style={styles.rightImage}
            resizeMode={FastImage.resizeMode.cover}
            tintColor={props?.rightIconColor}
          />
        </TouchableOpacity>
      ) : (
        <AnyIcon
          onPress={props?.onPressRightIcon}
          type={props?.rightIconType}
          name={props?.rightIcon}
          size={20}
          style={{ top: 20, right: 10 }}
          color={
            props?.rightIconColor
              ? props?.rightIconColor
              : THEME.COLORS.secondaryYellow
          }
        />
      )}
    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    padding: RF(10),
    marginBottom: RF(5),
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: THEME.COLORS.textGrey,
  },
  backView: {
    height: RF(20),
    width: RF(20),
    alignItems: 'center',
    justifyContent: 'center',
    right: RF(2),
  },
  rightImage: {
    height: RF(20),
    width: RF(20),
  },
  titleStyling: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    color: THEME.COLORS.white,
    marginTop: RF(10),
  },
});
