import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Portal } from '@gorhom/portal';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { meApi } from 'shared/services/auth';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useMfaPostAuthenticatorMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import AuthOTPBottomSheet from './components/AuthOTPBottomSheet';
import styles from './styles';
import { GenericNavigation } from '../../types';
import { setUser } from '../../../../../shared/store/slices/session/session.slice';

function AuthenticatorOTP(props?: GenericNavigation) {
  const [otp, setOTP] = useState('');
  const [open, setOpen] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation(['all']);
  const [mfaPostAuthRequest, mfaPostAuthResult] =
    useMfaPostAuthenticatorMutation();
  const isLoading = mfaPostAuthResult?.isLoading;

  useEffect(() => {
    if (mfaPostAuthResult.isSuccess) {
      onSuccessVerify();
    }
    if (mfaPostAuthResult.isError) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Invalid Code', { ns: ['all'] }),
        type: 'error',
      });
    }
  }, [mfaPostAuthResult]);

  const onSuccessVerify = async () => {
    try {
      const meResponse = await meApi();
      if (meResponse.status == 200 || meResponse.status == 201) {
        dispatch(setUser(meResponse.data));
        setOpen(1);
      }
    } catch (error) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Invalid Code', { ns: ['all'] }),
        type: 'error',
      });
    }
  };

  const onVerify = () => {
    const payload = {
      code: otp,
    };
    // Call postGoogleAuthQrApi
    mfaPostAuthRequest(payload);
  };

  const goBackTwoScreens = () => {
    props?.navigation?.goBack();
    props?.navigation?.goBack();
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader
          title={t('Authenticator App Verification', { ns: ['all'] })}
          leftIcon="back"
        />
        <View style={{ marginVertical: THEME.MARGIN.LOW }}>
          <View style={styles.numberBullet}>
            <AnyIcon
              type={Icons.MaterialCommunityIcons}
              name="numeric-3-circle"
              size={30}
              color={THEME.COLORS.secondaryYellow}
              style={{ marginRight: THEME.MARGIN.LOW }}
            />
            <AppText semiBold color={THEME.COLORS.secondaryYellow}>
              {t('Enter Code', { ns: ['all'] })}
            </AppText>
          </View>
          <AppText style={styles.description}>
            {t('Enter the Code received in GA', { ns: ['all'] })}
          </AppText>
        </View>
        <OTPInputView
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpField}
          codeInputHighlightStyle={{
            borderColor: THEME.COLORS.secondaryYellow,
          }}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOTP}
          placeholderTextColor={THEME.COLORS.secondaryYellow}
          style={{
            // width: "90%",
            height: RF(90),
          }}
        />
        <View style={{ flex: 1 }} />
        <PrimaryButton
          onPress={onVerify}
          loading={isLoading}
          title={t('Verify', { ns: ['all'] })}
          disabled={Boolean(!(otp?.length == 6))}
          buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
        />
      </View>
      <Portal>
        <AuthOTPBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          navigation={navigation}
          loading={isLoading}
          onPress={() => {
            setOpen(0);
            goBackTwoScreens();
          }}
        />
      </Portal>
    </>
  );
}

export default AuthenticatorOTP;
