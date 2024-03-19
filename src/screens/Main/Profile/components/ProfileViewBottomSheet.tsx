import React, { useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import FastImage from 'react-native-fast-image';
import { IMAGES } from 'assets/images';
import { ProfileViewBottomSheetProps } from '../types';

const ProfileViewBottomSheet: React.FC<ProfileViewBottomSheetProps> = ({
  sheetIndex,
  setSheetIndex,
  userInfo,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '100%'], []);

  useBackHandler(() => {
    if (sheetIndex == 1) {
      setSheetIndex(0);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      onClose={() => setSheetIndex(0)}
      index={sheetIndex}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: THEME.COLORS.iconGrey,
      }}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.inputGrey }}
    >
      <View style={{ flex: 1, padding: THEME.PADDING.LOW }}>
        <View
          style={{
            alignItems: 'flex-end',
            top: RF(14),
            padding: THEME.PADDING.NORMAL,
          }}
        >
          <AnyIcon
            onPress={() => setSheetIndex(0)}
            type={Icons.AntDesign}
            name="closecircleo"
            size={22}
            color="#DCDCDC"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            marginBottom: RF(50),
          }}
        >
          <FastImage
            source={
              userInfo?.profile?.photo
                ? { uri: userInfo?.profile?.photo }
                : IMAGES.defaultImage
            }
            resizeMode={
              !userInfo?.profile?.photo ? FastImage.resizeMode.cover : undefined
            }
            style={styles.showProfilePic}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ProfileViewBottomSheet;

const styles = StyleSheet.create({
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
    marginBottom: RF(16),
  },
  button: {
    height: RF(50),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.secondaryBackground,
    shadowOpacity: 0,
    marginBottom: 0,
  },
  showProfilePic: {
    height: RF(300),
    width: RF(300),
    borderRadius: THEME.RADIUS.MAX,
    alignSelf: 'center',
    backgroundColor: THEME.COLORS.secondaryYellow,
  },
});
