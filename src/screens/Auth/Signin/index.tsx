import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import {
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from 'shared/store';
import ReactNativeBiometrics from 'react-native-biometrics';
import styles from './styles';
import { emailverifyApiV2 } from '../../../shared/services/auth';
import { GenericNavigation } from '../../../shared/models/types';
import ROUTE_NAMES from '../../../routes/RouteNames';
import {
  getNormalizedError,
  toast,
} from '../../../shared/services/helper.service';
import { GLOBAL_STYLE, THEME } from '../../../shared/theme';
import { ICONS } from '../../../assets/images/icons';
import { RF } from '../../../shared/theme/responsive';
import AppText from '../../../shared/components/AppText';
import AppInput from '../../../shared/components/AppInput';
import { Icons } from '../../../shared/components/AnyIcon';
import { COLORS } from '../../../shared/constants/theme';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SigninBottomSheet from './components/SigninBottomSheet';
import {
  SimpleBiometricCredentials,
  SimpleCredentials,
  loginWithBiometric,
  loginWithCredentials,
} from '../../../shared/store/slices/session/session.slice';
import { useAppDispatch } from '../../../shared/hooks/redux';

interface LoginData {
  usernameOrEmail: string;
  password: string;
  deviceId: string;
  fcmToken: string;
}

function SignIn(props: GenericNavigation) {
  const { lastUsername, userUUID } = useSelector(
    (state: RootState) => state.user
  );
  const { loginStatus, loginError, loginData } = useSelector(
    (state: RootState) => state.session
  );

  const initialValues: LoginData = {
    usernameOrEmail: lastUsername || '',
    password: '',
    deviceId: '',
    fcmToken: '',
  };

  const [sheetIndex, setSheetIndex] = useState(0);
  const [forgotEmail, setForgotEmail] = useState('');
  const [sheetHeight, setSheetHeight] = useState('35%');
  const [handlePassword, setHandlePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const isLoading = loginStatus === 'loading' || loading;

  const toggleEye = () => setHandlePassword(!handlePassword);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation(['all']);
  const Languages = ['ENG', 'ESP'];
  const [language, setLanguage] = useState(Languages[1]);

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

  const onSelectLanguage = (item: string) => {
    setLanguage(item);
    switchLanguage(item);
  };

  const switchLanguage = async (lang: string) => {
    if (lang === 'ENG') {
      i18n.changeLanguage('en');
      AsyncStorage.setItem('language', 'en');
    } else {
      i18n.changeLanguage('es');
      AsyncStorage.setItem('language', 'es');
    }
  };

  const handleLoingWithBiometric = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const keyExistsResponse = await rnBiometrics.biometricKeysExist();
      if (!keyExistsResponse.keysExist) {
        toast(
          'Error',
          t('No biometric keys found. Please login with credentials'),
          'error'
        );
        return;
      }

      const response = await rnBiometrics.createSignature({
        promptMessage: t('sign_in'),
        cancelButtonText: t('Cancel'),
        payload: userUUID,
      });

      const { success, signature } = response;
      if (!success || !signature) {
        toast(
          'Error',
          t('Unable to login using biometric. Please try again later.'),
          'error'
        );
        return;
      }

      dispatch(
        loginWithBiometric({
          signature,
          username: lastUsername,
          payload: userUUID,
        })
      );
    } catch (e) {
      toast(
        t('Error'),
        t('Unable to login using biometric. Please try again later.'),
        'error'
      );
    }
  };

  const handleLoginWithCredentials = async (values: LoginData) => {
    dispatch(
      loginWithCredentials({
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
      })
    );
  };

  const handleLoginError = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    data?: SimpleCredentials | SimpleBiometricCredentials
  ) => {
    if (
      error.statusCode === 403 &&
      error.message === 'ip is not in white list' &&
      data &&
      'password' in data
    ) {
      props?.navigation?.navigate(ROUTE_NAMES.LOGIN_OTP_VERIFY, {
        email: error.email,
        password: data.password,
        usernameOrEmail: data.usernameOrEmail,
      });
    } else if (error.statusCode === 401) {
      toast(t('Failed'), t('Incorrect Credentials'), 'error');
    } else {
      const err = getNormalizedError(error);
      toast(t('Failed'), err, 'error');
    }
  };

  const onPressSignup = () => {
    props?.navigation?.navigate(ROUTE_NAMES.TERMS_AND_CONDITIONS);
  };
  const forgotPassword = async () => {
    try {
      setLoading(true);

      const response = await emailverifyApiV2({
        email: forgotEmail,
      });

      if (response?.status !== 201) {
        toast(t('Error'), t('failedToSendCode'), 'error');
        return;
      }

      toast(t('Successful'), t('codeSentSuccessfully'), 'success');
      setSheetIndex(0);
      props?.navigation?.navigate(ROUTE_NAMES.OTP_VERIFICATION, {
        email: forgotEmail,
      });
    } catch (error) {
      toast(t('Error'), t('An error occurred while sending the code'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const loginVSS = Yup.object().shape({
    usernameOrEmail: Yup.string()
      .min(5, t('Username must be at least 5 characters long'))
      .trim()
      .required(t('Enter Username or Email')),
    password: Yup.string().required(t('Enter Your Password')),
  });

  useEffect(() => {
    if (loginStatus === 'loading') return;

    if (loginError) {
      handleLoginError(loginError, loginData);
    }
  }, [loginStatus, loginError, loginData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          if (storedLanguage === 'es') {
            setLanguage('ESP');
          } else {
            setLanguage('ENG');
          }
        }
      } catch (error) {}
    };
    getLanguage();
  }, []);

  return (
    <>
      <Animatable.View
        style={GLOBAL_STYLE.MAIN}
        animation="fadeInUpBig"
        duration={1000}
      >
        <View style={styles.langContainer}>
          {Languages.map((i: string) => (
            <TouchableOpacity
              key={i}
              onPress={() => onSelectLanguage(i)}
              style={[
                styles.langButton,
                {
                  backgroundColor:
                    language == i ? THEME.COLORS.secondaryYellow : 'black',
                },
              ]}
            >
              <AppText
                style={{ color: language == i ? 'black' : THEME.COLORS.white }}
              >
                {i}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <FastImage
          source={ICONS.APP_LOGO}
          style={{ alignSelf: 'center', width: RF(150), height: RF(150) }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <Formik
          initialValues={initialValues}
          onSubmit={handleLoginWithCredentials}
          validationSchema={loginVSS}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <>
              <Animatable.View
                animation="fadeInUp"
                duration={1000}
                delay={1000}
              >
                <AppText
                  secondaryTitle
                  medium
                  style={{
                    marginVertical: THEME.MARGIN.MID_LOW,
                  }}
                >
                  {t('sign_in')}
                </AppText>

                <AppInput
                  ref={usernameRef} // Set the ref for the username input field
                  onFocus={() => setisFocused(true)}
                  onBlur={() => setisFocused(false)}
                  inputStyle={isFocused ? styles.inputActive : null}
                  label={t('UsernameSignUp')}
                  autoCapitalize="none"
                  placeholder={t('enter_username')}
                  leftIconType={Icons.Feather}
                  leftIconColor={THEME.COLORS.primary}
                  onChangeText={handleChange('usernameOrEmail')}
                  value={values.usernameOrEmail}
                  error={
                    errors.usernameOrEmail &&
                    touched.usernameOrEmail &&
                    errors.usernameOrEmail
                  }
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />

                <AppInput
                  inputStyle={isFocused2 ? styles.inputActive : null}
                  onFocus={() => setisFocused2(true)}
                  onBlur={() => setisFocused2(false)}
                  label={t('password')}
                  placeholder={t('enter_password')}
                  leftIconType={Icons.Feather}
                  leftIconColor={THEME.COLORS.primary}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password && touched.password && errors.password}
                  secureTextEntry={handlePassword}
                  eye={handlePassword ? 'eye-off' : 'eye'}
                  onPressIcon={toggleEye}
                  onSubmitEditing={handleSubmit} // Submit the form when "OK" or "Return" is pressed on the password input field
                />
                <AppText
                  onPress={() => setSheetIndex(1)}
                  style={{
                    alignSelf: 'flex-end',
                    textDecorationLine: 'underline',
                  }}
                  color={COLORS.white}
                >
                  {t('forgot_password')}
                </AppText>
              </Animatable.View>

              <View style={{ flex: 1 }} />

              <Animatable.View
                style={{
                  marginBottom: THEME.MARGIN.NORMAL,
                }}
                animation="fadeInUp"
                duration={1000}
              >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <PrimaryButton
                    style={{ flex: 1 }}
                    onPress={handleSubmit}
                    loading={isLoading}
                    title={t('sign_in')}
                  />

                  {lastUsername && userUUID && Platform.OS === 'android' && (
                    <PrimaryButton
                      iconStyle={{ marginRight: 0 }}
                      icon="fingerprint"
                      disabled={isLoading}
                      style={styles.primaryButton}
                      onPress={handleLoingWithBiometric}
                      title={t('')}
                    />
                  )}
                </View>
                <AppText
                  medium
                  color={THEME.COLORS.white}
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {t('dont_have_account')}{' '}
                  <AppText
                    style={{ textDecorationLine: 'underline' }}
                    medium
                    color={THEME.COLORS.primary}
                    onPress={onPressSignup}
                  >
                    {t('sign_up')}
                  </AppText>
                </AppText>
              </Animatable.View>
            </>
          )}
        </Formik>
      </Animatable.View>

      <SigninBottomSheet
        sheetIndex={sheetIndex}
        setSheetIndex={setSheetIndex}
        loading={isLoading}
        sheetHeight={sheetHeight}
        value={forgotEmail}
        onChangeText={(text) => setForgotEmail(text.toLowerCase())}
        onPress={forgotPassword}
      />
    </>
  );
}

export default SignIn;
