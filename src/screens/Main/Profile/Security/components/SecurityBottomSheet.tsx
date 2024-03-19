import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import SecondaryButton from 'shared/components/SecondaryButton';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { useBackHandler } from '@react-native-community/hooks';
import { SecurityBottomSheetProps } from '../../types';

const SecurityBottomSheet: React.FC<SecurityBottomSheetProps> = ({
  onClosePress,
  BiomatricStatus,
  selectedBioMetricStatus,
  onSelectBiomatricStatus,
  sheetIndex,
  setSheetIndex,
}) => {
  const { t } = useTranslation(['all']);
  const biomatricSnapPoints = useMemo(() => [0.1, '40%'], []);

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
      onClose={() => setSheetIndex(0)}
      index={sheetIndex}
      snapPoints={biomatricSnapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: THEME.COLORS.secondaryBackground,
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.primary }}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <View style={styles.bottomHeader}>
          <AppText h3>{t('Choose an Option', { ns: ['all'] })}</AppText>
          <AnyIcon
            onPress={onClosePress}
            type={Icons.Entypo}
            name="cross"
            size={25}
            color={THEME.COLORS.textGrey}
          />
        </View>

        <ScrollView>
          {BiomatricStatus.map((status: string, index: any) => (
            <SecondaryButton
              disabled={status == selectedBioMetricStatus}
              key={index}
              onPress={() => onSelectBiomatricStatus(status)}
              title={status}
              buttonStyle={[
                styles.button,
                selectedBioMetricStatus == status && {
                  borderWidth: 1,
                  borderColor: THEME.COLORS.secondaryYellow,
                  backgroundColor: 'black',
                },
              ]}
              textStyle={{
                fontSize: THEME.FONTS.SIZE.XSMALL,
                fontFamily: THEME.FONTS.TYPE.REGULAR,
              }}
            />
          ))}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default SecurityBottomSheet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
  },
  button: {
    height: RF(60),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.iconGrey,
    shadowOpacity: 0,
  },
});
