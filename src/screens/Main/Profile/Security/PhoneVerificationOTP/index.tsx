import React, { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import { Portal } from '@gorhom/portal';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ROUTE_NAMES from 'routes/RouteNames';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { meApi, mFaSmsPatchApi } from 'shared/services/auth';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useMfaSmsPatchMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import OTPBottomSheet from './components/OTPBottomSheet';
import AppHeader from '../../../../../shared/components/AppHeader';
import styles from './styles';
import { GenericNavigation } from '../../types';
import { setUser } from '../../../../../shared/store/slices/session/session.slice';

function PhoneVerificationOTP(props?: GenericNavigation) {
  const phone: string = props?.route?.params?.phone;
  const [open, setOpen] = useState(0);
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation(['all']);
  const [mfaSmsPatch, mfaSmsResult] = useMfaSmsPatchMutation();
  const isLoading = mfaSmsResult?.isLoading;

  const handleBackPress = () => true;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (mfaSmsResult.isSuccess) {
      onVerifySuccess();
    }
    if (mfaSmsResult.isError) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Invalid Code', { ns: ['all'] }),
        type: 'error',
      });
    }
  }, [mfaSmsResult]);

  const onBottomSheetClose = () => {
    setOpen(0);
    props?.navigation?.goBack();
  };

  const onVerify = () => {
    const payload = {
      phone,
      code: otp,
    };
    // Call postGoogleAuthQrApi
    mfaSmsPatch(payload);
  };

  const onVerifySuccess = async () => {
    try {
      const meResponse = await meApi();
      if (meResponse.status == 200 || meResponse.status == 201) {
        dispatch(setUser(meResponse.data));
        setOpen(1);
      }
    } catch (e) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Invalid Code', { ns: ['all'] }),
        type: 'error',
      });
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader
          title={t('Phone Verification', { ns: ['all'] })}
          leftIcon="back"
          leftIconPress={() =>
            props?.navigation?.navigate(ROUTE_NAMES.SECURITY)
          }
        />
        <View style={{ marginVertical: THEME.MARGIN.LOW }}>
          <AppText
            h2
            semiBold
            color={THEME.COLORS.secondaryYellow}
            style={{ marginBottom: RF(10) }}
          >
            {t('Enter the Code', { ns: ['all'] })}
          </AppText>

          <AppText>
            {t('Enter the Code received on your Phone Number', { ns: ['all'] })}
          </AppText>
          <AppText
            semiBold
            color={THEME.COLORS.secondaryYellow}
            style={{ marginTop: RF(10) }}
          >
            "{phone}"
          </AppText>
        </View>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpField}
          codeInputHighlightStyle={{
            borderColor: THEME.COLORS.secondaryYellow,
          }}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOTP}
          placeholderTextColor={THEME.COLORS.secondaryYellow}
          style={styles.otpInput}
        />
        <View style={{ flex: 0.9 }} />
        <PrimaryButton
          onPress={onVerify}
          loading={isLoading}
          title={t('Verify', { ns: ['all'] })}
          disabled={Boolean(!(otp?.length == 4))}
          buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
        />
      </View>
      <Portal>
        <OTPBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          loading={isLoading}
          navigation={navigation}
          onBottomSheetClose={onBottomSheetClose}
        />
      </Portal>
    </>
  );
}

export default PhoneVerificationOTP;
