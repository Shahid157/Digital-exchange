import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet, Platform } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import UsernameInput from 'shared/components/UsernameInput';
import SecondaryButton from 'shared/components/SecondaryButton';

interface SigninBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  loading?: boolean;
  sheetHeight?: any;
  value?: string;
  onChangeText?: (text: any) => void;
  onPress?: () => void;
}

const SigninBottomSheet: React.FC<SigninBottomSheetProps> = ({
  sheetIndex,
  setSheetIndex,
  loading,
  sheetHeight,
  value,
  onChangeText,
  onPress,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, sheetHeight], [sheetHeight]);

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
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: '#191C1B',
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: THEME.COLORS.sheetGrey,
      }}
    >
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          paddingHorizontal: THEME.PADDING.NORMAL,
        }}
      >
        <View style={styles.container}>
          <AppText
            h1
            semiBold
            style={{
              alignSelf: 'center',
            }}
          >
            {t('Enter Email')}
          </AppText>
          <AnyIcon
            onPress={() => setSheetIndex(0)}
            name="cross"
            type={Icons.Entypo}
            size={25}
            color={THEME.COLORS.textGrey}
          />
        </View>

        <UsernameInput
          placeholder={t('Email')}
          value={value}
          inputMode="email"
          autoCapitalize="none"
          onChangeText={onChangeText}
          showRightText
          inputStyle={{
            borderColor: THEME.COLORS.secondaryYellow,
            marginVertical: RF(30),
            paddingLeft: RF(10),
          }}
        />
        <SecondaryButton
          onPress={onPress}
          small
          loading={loading}
          title={t('Next', { ns: ['all'] })}
          buttonStyle={styles.button}
          textStyle={{
            color: 'black',
            fontFamily: THEME.FONTS.TYPE.BOLD,
          }}
        />
      </KeyboardAwareScrollView>
    </BottomSheet>
  );
};

export default SigninBottomSheet;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.white,
    paddingVertical: RF(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: THEME.COLORS.secondaryYellow,
    width: '85%',
    height: '18%',
    borderRadius: THEME.RADIUS.BOX,
  },
});
