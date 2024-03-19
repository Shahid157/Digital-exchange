import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';

interface Props {
  icon: string;
  iconType: string;
  title: string;
  rightText: string;
  rightIcon: boolean;
  profileIcon: boolean;
  onPress: () => void;
}
function ProfileItem({
  icon,
  iconType,
  title,
  rightText,
  rightIcon,
  profileIcon,
  onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      {profileIcon ? (
        <FastImage
          source={ICONS.PROFILE}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.profileIconStyle]}
          tintColor={THEME.COLORS.secondaryYellow}
        />
      ) : (
        <AnyIcon
          type={iconType}
          size={20}
          color={THEME.COLORS.secondaryYellow}
          name={icon}
          style={{
            marginRight: RF(10),
          }}
        />
      )}

      <AppText
        h4
        style={{
          flex: 1,
        }}
      >
        {title}
      </AppText>

      {title === 'Security' && (
        <AnyIcon
          type={Icons.AntDesign}
          size={18}
          color={THEME.COLORS.errorRed}
          name="warning"
          style={{
            marginRight: RF(10),
          }}
        />
      )}
      {rightText && (
        <AppText
          color={THEME.COLORS.textGrey}
          style={{
            marginRight: RF(10),
          }}
        >
          {rightText}
        </AppText>
      )}
      {rightIcon ? (
        <AnyIcon
          type={Icons.Feather}
          size={18}
          color={THEME.COLORS.textExtraLight}
          name="chevron-right"
        />
      ) : null}
    </TouchableOpacity>
  );
}

export default ProfileItem;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: THEME.RADIUS.BOX,
    marginVertical: RF(5),
    backgroundColor: THEME.COLORS.secondaryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),
  },
  profileIconStyle: {
    height: RF(20),
    width: RF(20),
    marginRight: RF(7),
  },
});
