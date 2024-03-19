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
import PrimaryButton from 'shared/components/PrimaryButton';
import { useBackHandler } from '@react-native-community/hooks';
import { LanguageBottomSheetProps } from '../types';

const LanguageBottomSheet: React.FC<LanguageBottomSheetProps> = ({
  handleLoading,
  onLanguageSheetClose,
  LanguagesData,
  onSelectLanguage,
  language,
  switchLanguagePress,
  sheetIndex,
  setSheetIndex,
}) => {
  const { t } = useTranslation(['all']);
  const languageSnapPoints = useMemo(() => [0.1, '42%'], []);

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
      snapPoints={languageSnapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: THEME.COLORS.secondaryBackground,
        borderRadius: THEME.RADIUS.MEDIUM,
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.sheetGrey }}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <View style={styles.bottomHeader}>
          <AppText h3 style={{ fontFamily: THEME.FONTS.TYPE.MEDIUM }}>
            {t('Language', { ns: ['all'] })}
          </AppText>
          <AnyIcon
            onPress={onLanguageSheetClose}
            type={Icons.Entypo}
            name="cross"
            size={25}
            color={THEME.COLORS.textGrey}
          />
        </View>

        <ScrollView>
          {LanguagesData.map((i: string, index: any) => (
            <SecondaryButton
              key={index}
              onPress={() => onSelectLanguage(i)}
              title={i}
              buttonStyle={[
                styles.button,
                language == i && {
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
          <PrimaryButton
            loading={handleLoading}
            onPress={switchLanguagePress}
            buttonStyle={styles.confirmBtn}
            title={t('Confirm', { ns: ['all'] })}
          />
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  confirmBtn: {
    marginHorizontal: THEME.MARGIN.LOW,
    borderRadius: THEME.RADIUS.BOX,
    marginTop: RF(18),
  },
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
