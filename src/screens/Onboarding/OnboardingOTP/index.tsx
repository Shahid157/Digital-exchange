import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ICONS } from 'assets/images/icons';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'shared/components/AppText';
import OnboardingButton from 'shared/components/OnboardingButton';
import ProgressBar from 'shared/components/ProgressBar';
import { COLORS } from 'shared/constants/theme';
import { GenericNavigation } from 'shared/models/types';
import {
  ISO8601dateFormate,
  getNormalizedError,
  toast,
} from 'shared/services/helper.service';
import { RootState } from 'shared/store';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import ROUTE_NAMES from 'routes/RouteNames';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { getUniqueId } from 'react-native-device-info';
import AppLoader from 'shared/components/AppLoader';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { setOtpSentTime } from '../../../shared/store/reducers/userReducer';
import {
  useCreateUserMutation,
  useSendCreateUserVerificationCodeMutation,
} from '../../../shared/store/apis/users.api';
import VerificationText from './components/VerificationText';
import useCountDown from '../../Main/MFASwitcher/lib/useCountDown';

const initialExpirationSeconds = 300;

function OnboardingOTP(props: GenericNavigation) {
  const { email, password, username, firstName, lastName, dob }: any =
    props?.route?.params;

  const { fcmToken } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const [otp, setOTP] = useState('');
  const { t } = useTranslation(['all']);

  const [createUser, createUserResponse] = useCreateUserMutation();
  const [sendCode, sendCodeResponse] =
    useSendCreateUserVerificationCodeMutation();
  const [countDown, setCountDown] = useCountDown(initialExpirationSeconds);
  const countDownStr = !countDown
    ? null
    : moment.utc(countDown * 1000).format('mm:ss');

  const loading = createUserResponse.isLoading || sendCodeResponse.isLoading;

  const handleOnSubmit = async () => {
    const uuid = await getUniqueId();
    createUser({
      email,
      username,
      password,
      deviceId: uuid,
      code: otp,
      firstName,
      lastName,
      dateOfBirth: ISO8601dateFormate(dob).toString(),
      fcmToken,
    });
  };

  const handleOnResendCode = async () => {
    sendCode({
      email,
      username,
    });
  };

  // Handling Send code response
  useEffect(() => {
    const { isError, isLoading, isSuccess, error } = sendCodeResponse;
    if (isLoading) return;

    if (isError) {
      const errorText = getNormalizedError(error);
      toast(t('failedToSendCode'), t(errorText), 'error');
      return;
    }

    if (isSuccess) {
      dispatch(setOtpSentTime(new Date()));
      setCountDown(initialExpirationSeconds);
      toast(t('OTP Sent to Your Email'), '', 'success');
    }
  }, [sendCodeResponse]);

  // Handling Create user response
  useEffect(() => {
    const { isError, data, isLoading } = createUserResponse;
    if (isLoading) return;

    if (isError) {
      const error = getNormalizedError(data);
      toast(t('Failed'), error, 'error');
      return;
    }

    if (createUserResponse.isSuccess) {
      props?.navigation?.navigate(ROUTE_NAMES.ALMOST_DONE, {
        result: createUserResponse.data,
      });
    }
  }, [createUserResponse]);

  useEffect(() => {
    handleOnResendCode();
  }, []);

  return (
    <>
      {loading && <AppLoader isVisible />}

      <View style={GLOBAL_STYLE.MAIN}>
        <FastImage
          source={ICONS.APP_LOGO}
          style={{ alignSelf: 'center', width: RF(140), height: RF(140) }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <ProgressBar
          progressBarStyle={{ margin: THEME.MARGIN.NORMAL }}
          percentage={80}
        />

        <AppText medium h1>
          {t('Verify Your Email')}
        </AppText>

        <AppText
          style={{ marginVertical: THEME.MARGIN.MID_LOW }}
          medium
          color={THEME.COLORS.textGrey}
        >
          {t("Enter the code you've received in:")}
        </AppText>

        <AppText medium color={THEME.COLORS.white}>
          {email}
        </AppText>

        <OTPInputView
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.codeInputStyle}
          codeInputHighlightStyle={{
            borderColor: THEME.COLORS.primary,
          }}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOTP}
          placeholderTextColor={COLORS.primary}
          style={{
            height: RF(90),
          }}
        />

        <VerificationText
          expiresIn={countDownStr}
          handleOnResendCode={handleOnResendCode}
        />

        <View style={{ flex: 1 }} />

        <OnboardingButton
          disabled={Boolean(!(otp?.length == 6))}
          onPress={handleOnSubmit}
          loading={loading}
          title={t('Next')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  codeInputStyle: {
    padding: 0,
    paddingTop: 5,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderColor: THEME.COLORS.textExtraLight,
    borderRadius: THEME.RADIUS.SMALLBOX,
    color: THEME.COLORS.primary,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
});

export default OnboardingOTP;
