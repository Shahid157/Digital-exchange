import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { ScrollView } from 'react-native-gesture-handler';
import SecondaryButton from 'shared/components/SecondaryButton';
import { useBackHandler } from '@react-native-community/hooks';
import { ProfileBottomSheetProps } from '../types';

const ProfileBottomSheet: React.FC<ProfileBottomSheetProps> = ({
  ImagePickerOptions,
  selectImage,
  sheetIndex,
  setSheetIndex,
}) => {
  const { t } = useTranslation(['all']);
  const imagePickerSnapPoints = useMemo(() => [0.1, '40%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  useBackHandler(() => {
    if (sheetIndex == 1) {
      setSheetIndex(0);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      onClose={() => setSheetIndex(0)}
      index={sheetIndex}
      snapPoints={imagePickerSnapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: THEME.COLORS.iconGrey,
      }}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.inputGrey }}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <View style={styles.bottomHeader}>
          <AppText h3 style={{ fontFamily: THEME.FONTS.TYPE.MEDIUM }}>
            {t('Change Profile', { ns: ['all'] })}
          </AppText>
          <AnyIcon
            onPress={() => setSheetIndex(0)}
            type={Icons.Entypo}
            name="cross"
            size={25}
            color={THEME.COLORS.textGrey}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: RF(5) }}
        >
          {ImagePickerOptions.map((i: any, index: any) => {
            let iconType;
            let iconName;
            switch (i.value) {
              case 'camera':
                iconType = Icons.Feather;
                iconName = 'camera';
                break;
              case 'gallery':
                iconType = Icons.AntDesign;
                iconName = 'picture';
                break;
              case 'profile':
                iconType = Icons.Ionicons;
                iconName = 'person-circle-outline';
                break;
            }
            return (
              <SecondaryButton
                key={index}
                leftIcon={iconName}
                leftIconType={iconType}
                leftIconColor={THEME.COLORS.secondaryYellow}
                onPress={() => selectImage(i.value)}
                title={i.label}
                buttonStyle={[
                  styles.button,
                  { marginBottom: THEME.MARGIN.MID_LOW, marginVertical: 0 },
                ]}
                textStyle={{
                  fontSize: THEME.FONTS.SIZE.XSMALL,
                  fontFamily: THEME.FONTS.TYPE.REGULAR,
                }}
              />
            );
          })}
          <View style={{ height: 70 }} />
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default ProfileBottomSheet;

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
});
