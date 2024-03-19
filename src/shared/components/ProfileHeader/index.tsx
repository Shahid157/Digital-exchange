import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IMAGES } from 'assets/images';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import ROUTE_NAMES from 'routes/RouteNames';
import AppText from 'shared/components/AppText';
import { RootState } from 'shared/store';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import AnyIcon, { Icons } from '../AnyIcon';

function ProfileHeader() {
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.session);
  const profileName = `${user?.profile?.firstName} ${user?.profile?.lastName}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate(ROUTE_NAMES.PROFILE as never);
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <FastImage
          source={
            user?.profile?.photo
              ? { uri: user?.profile?.photo }
              : IMAGES.defaultImage
          }
          resizeMode={
            !user?.profile?.photo ? FastImage.resizeMode.contain : undefined
          }
          style={styles.profilePic}
        />
        <AppText h3 medium>
          {profileName}
        </AppText>
      </TouchableOpacity>
      <AnyIcon
        onPress={() => {
          navigation?.navigate(ROUTE_NAMES.NOTIFICATIONS as never);
        }}
        type={Icons.Fontisto}
        name="bell"
        size={20}
        color={THEME.COLORS.secondaryYellow}
      />
    </View>
  );
}

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(Platform.OS === 'ios' ? 60 : 60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RF(10),
    zIndex: 9999,
  },
  profilePic: {
    height: RF(40),
    width: RF(40),
    marginRight: RF(10),
    borderRadius: THEME.RADIUS.INTERMEDIATE,
    borderWidth: 2,
    borderColor: THEME.COLORS.secondaryYellow,
    backgroundColor: THEME.COLORS.secondaryYellow,
  },
});
