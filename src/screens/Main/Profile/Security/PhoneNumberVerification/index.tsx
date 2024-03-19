import React, { useState, useRef, useMemo, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import AppText from 'shared/components/AppText';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { THEME } from 'shared/theme';
import { GenericNavigation } from 'shared/models/types';
import ROUTE_NAMES from 'routes/RouteNames';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { phoneRegex } from 'shared/validations/authValidations';
import { RF } from 'shared/theme/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import { Portal } from '@gorhom/portal';
import { meApi } from 'shared/services/auth';
import { getNormalizedError } from 'shared/services/helper.service';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import {
  useMfaSetupSmsMutation,
  useMfaSmsDeleteMutation,
} from 'shared/store/slices/mfa/mfa-otp.api';
import VerificationBottomSheet from './components/VerificationBottomSheet';
import NumberBottomSheet from './components/NumberBottomSheet';
import styles from './styles';
import { setUser } from '../../../../../shared/store/slices/session/session.slice';

function PhoneNumberVerification(props?: GenericNavigation) {
  const [phone, setPhone] = useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);
  const [open, setOpen] = useState(1);
  const [openSheet, setOpenSheet] = useState(0);
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sheetHeight, setSheetHeight] = useState('40%');
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.session);
  const { t } = useTranslation(['all']);
  const [mfaSmsSetupRequest, mfaSmsSetupResult] = useMfaSetupSmsMutation();
  const [mfaSmsDelete, mfaSmsDeleteResult] = useMfaSmsDeleteMutation();
  const hasAuthenticator = user?.twoFactorAuthenticationMethods.some(
    (method: any) => method.type === 'sms'
  );
  let keyObject = null;
  if (hasAuthenticator) {
    for (const method of user!.twoFactorAuthenticationMethods) {
      if (method.type === 'sms') {
        keyObject = method.payload.phone;
        break;
      }
    }
  }
  const dispatch = useDispatch();
  const phoneNumberSnapPoint = useMemo(() => [0.1, sheetHeight], [sheetHeight]);

  const crossHandler = () => {
    props?.navigation?.goBack(), setOpen(0);
  };

  const onCancel = () => setOpenSheet(0);

  useEffect(() => {
    if (mfaSmsSetupResult.isSuccess) {
      setLoading(false);
      Toast.show({
        text1: t('Successful', { ns: ['all'] }),
        text2: t('Code Sent Successfully', { ns: ['all'] }),
        type: 'success',
        position: 'top',
      });
      setOpen(0);
      props?.navigation?.navigate(ROUTE_NAMES.PHONE_VERIFICATON_OTP, {
        phone,
      });
    }
    if (mfaSmsSetupResult.isError) {
      setLoading(false);
      // @ts-ignore
      const message = mfaSmsSetupResult?.error?.data?.message;
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: message,
        type: 'error',
        position: 'top',
      });
    }
  }, [mfaSmsSetupResult]);

  useEffect(() => {
    if (mfaSmsDeleteResult.isSuccess) {
      setOpenSheet(0);
      onMfaSmsDeleteSuccess();
    }
    if (mfaSmsDeleteResult.isError) {
      setLoading(false);
      // @ts-ignore
      const message = mfaSmsDeleteResult?.error?.data?.message;
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: message,
        type: 'error',
        position: 'top',
      });
    }
  }, [mfaSmsDeleteResult]);

  const onNext = () => {
    if (!phone) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Enter Phone Number First', { ns: ['all'] }),
        type: 'error',
      });
    } else if (!phoneRegex.test(phone)) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Invalid Phone Number', { ns: ['all'] }),
        type: 'error',
      });
    } else {
      setLoading(true);
      const payload = {
        phone,
      };
      // MFA phone number SMS setup API
      mfaSmsSetupRequest(payload);
    }
  };

  const onMfaSmsDeleteSuccess = async () => {
    try {
      const meResponse = await meApi();
      if (meResponse.status == 200 || meResponse.status == 201) {
        Toast.show({
          text1: t('Successful', { ns: ['all'] }),
          text2: t('SMS Verification Removed!', { ns: ['all'] }),
          type: 'success',
        });
        dispatch(setUser(meResponse.data));
        setLoading(false);
        setOpen(0);
        props?.navigation?.goBack();
      }
    } catch (e) {
      const error = getNormalizedError(e);
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: error,
        type: 'error',
        position: 'top',
      });
      setLoading(false);
    }
  };
  const deleteSmsVerification = () => {
    mfaSmsDelete();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setSheetHeight('70%');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setSheetHeight('40%');
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader title={t('Phone Verification')} leftIcon="back" />
        {hasAuthenticator ? (
          <View
            // onPress={() => navigation.navigate(props?.data.navigate)}
            style={stylesMain.mainContainer}
          >
            <AnyIcon
              type={Icons.Entypo}
              size={18}
              color={THEME.COLORS.primary}
              name="megaphone"
              onPress={() => {
                setOpenSheet(1);
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 30,
              }}
            >
              <AppText h4>{keyObject}</AppText>
              <AppText h6>{t('configured')}</AppText>
            </View>
            <AnyIcon
              type={Icons.Feather}
              size={18}
              color={THEME.COLORS.lightGrey}
              name="trash"
              onPress={() => {
                setOpenSheet(1);
              }}
            />
          </View>
        ) : (
          <>
            <AppText color={THEME.COLORS.textGrey}>
              {t(
                'We’ll send a code to verify this Phone. Make sure it is registered on Whatsapp.'
              )}
            </AppText>

            <View style={{ flex: 1 }} />

            <NumberBottomSheet
              sheetIndex={open}
              setSheetIndex={setOpen}
              navigation={navigation}
              phoneNumberSnapPoint={phoneNumberSnapPoint}
              crossHandlerPress={crossHandler}
              phoneInputRef={phoneInput}
              defaultValue={phone}
              onChangeText={(text: any) => {
                setPhone(text);
              }}
              onChangeFormattedText={(text) => {
                setPhone(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
              }}
              onNextPress={onNext}
              loading={loading}
            />
          </>
        )}
      </View>
      <Portal>
        <VerificationBottomSheet
          sheetIndex={openSheet}
          setSheetIndex={setOpenSheet}
          onCancelPress={onCancel}
          deleteSmsVerificationPress={deleteSmsVerification}
        />
      </Portal>
    </>
  );
}

export default PhoneNumberVerification;
const stylesMain = StyleSheet.create({
  mainContainer: {
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginVertical: RF(5),
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),
  },
  cancelButton: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    width: '40%',
  },
  confirmButton: {
    width: '40%',
    marginLeft: THEME.MARGIN.LOW,
  },
});
