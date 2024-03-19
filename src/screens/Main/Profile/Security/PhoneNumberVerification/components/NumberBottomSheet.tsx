import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import PhoneInput from 'react-native-phone-number-input';
import PrimaryButton from 'shared/components/PrimaryButton';
import { useBackHandler } from '@react-native-community/hooks';
import { NumberBottomSheetProps } from 'screens/Main/Profile/types';

const NumberBottomSheet: React.FC<NumberBottomSheetProps> = ({
  crossHandlerPress,
  onNextPress,
  phoneNumberSnapPoint,
  defaultValue,
  loading,
  onChangeText,
  onChangeFormattedText,
  phoneInputRef,
  sheetIndex,
  setSheetIndex,
  navigation,
}) => {
  const { t } = useTranslation(['all']);

  useBackHandler(() => {
    if (sheetIndex == 1) {
      navigation.goBack();
      setSheetIndex(0);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      onClose={() => setSheetIndex(0)}
      index={sheetIndex}
      snapPoints={phoneNumberSnapPoint}
      backgroundStyle={{
        backgroundColor: THEME.COLORS.secondaryBackground,
      }}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.iconGrey }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ padding: THEME.PADDING.NORMAL, flex: 1 }}>
          <View style={styles.bottomHeader}>
            <AppText h3>
              {t('Phone Number Verification', { ns: ['all'] })}
            </AppText>
            <AnyIcon
              onPress={crossHandlerPress}
              type={Icons.Entypo}
              name="cross"
              size={25}
              color={THEME.COLORS.textGrey}
            />
          </View>

          <PhoneInput
            filterProps={{
              placeholder: t('Enter country name', { ns: ['all'] }),
            }}
            containerStyle={styles.phoneInput}
            textInputStyle={{
              backgroundColor: THEME.COLORS.BLACK_TRANS,
              color: THEME.COLORS.white,
            }}
            codeTextStyle={{
              backgroundColor: THEME.COLORS.BLACK_TRANS,
              color: THEME.COLORS.white,
            }}
            flagButtonStyle={{
              width: '35%',
              backgroundColor: THEME.COLORS.BLACK_TRANS,
              marginRight: 10,
              borderRadius: THEME.RADIUS.BOX,
              borderWidth: 0.8,
              borderColor: THEME.COLORS.secondaryYellow,
              height: 50,
            }}
            textContainerStyle={{
              backgroundColor: THEME.COLORS.BLACK_TRANS,
              borderRadius: THEME.RADIUS.BOX,
              borderWidth: 0.8,
              borderColor: THEME.COLORS.secondaryYellow,
              height: 50,
              width: '100%',
            }}
            textInputProps={{
              style: { color: THEME.COLORS.white, height: 50 },
              placeholder: t('Enter Phone', { ns: ['all'] }),
              placeholderTextColor: THEME.COLORS.textGrey,
            }}
            ref={phoneInputRef}
            defaultValue={defaultValue}
            defaultCode="MX"
            layout="second"
            onChangeText={onChangeText}
            onChangeFormattedText={onChangeFormattedText}
            placeholder={t('Enter country name')}
            withDarkTheme
            withShadow
            countryPickerProps={t('Enter country name')}
          />

          <PrimaryButton
            onPress={onNextPress}
            loading={loading}
            title={t('Next', { ns: ['all'] })}
            buttonStyle={{ marginVertical: '8%', width: '85%' }}
          />
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default NumberBottomSheet;

const styles = StyleSheet.create({
  phoneInput: {
    alignSelf: 'center',
    width: '100%',
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: THEME?.COLORS.BLACK_TRANS,
  },
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
    marginBottom: '8%',
  },
});
