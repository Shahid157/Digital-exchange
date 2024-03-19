import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { MFAMethods } from 'shared/models/types';
import { useMfaOTPMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import { TransportTypes } from 'shared/store/slices/mfa/mfa-otp.types';
import AppText from '../../../../shared/components/AppText';
import { THEME } from '../../../../shared/theme';
import { capitalize } from '../lib/utils';
import { sendOTP } from '../../../../shared/services/wallet.services';
import { SIXTY_SECONDS } from '../lib/consts';
import useCountDown from '../lib/useCountDown';

export interface RequestOptCodeSectionProps {
  isMFA: boolean;
  activeMethod: MFAMethods;
}

export default function RequestOptCodeSection({
  isMFA,
  activeMethod,
}: RequestOptCodeSectionProps) {
  const { t } = useTranslation(['all']);

  const canRequestOtp = activeMethod !== MFAMethods.authenticator;
  const [loading, setLoading] = useState(false);
  const [countDown, setSeconds] = useCountDown();
  const [mfaOTPRequest, mfaOTPResult] = useMfaOTPMutation();
  const countDownStr = !countDown
    ? null
    : moment.utc(countDown * 1000).format('mm:ss');

  const toast = (text1: string, text2: string, type: string) => {
    Toast.show({
      text1: t(text1),
      text2: t(text2),
      type,
    });
  };

  useEffect(() => {
    if (mfaOTPResult.isSuccess) {
      toast('Successful', 'codeSentSuccessfully', 'success');
      setSeconds(SIXTY_SECONDS);
    }
    if (mfaOTPResult.isError) {
      toast('Error', 'An error occurred while sending the code', 'error');
    }
  }, [mfaOTPResult]);

  const handleOnRequestOtpCode = async () => {
    try {
      setLoading(true);
      const response = await sendOTP({
        transport: capitalize(activeMethod),
      });
      if (response?.status !== 201) {
        throw new Error('Failed to send code');
      }
      toast('Successful', 'Code sent successfully', 'success');
      setSeconds(SIXTY_SECONDS);
    } catch (error) {
      toast('Error', 'An error occurred while sending the code', 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleOnRequestOtpCodeForWithdraw = () => {
    setLoading(true);
    const payload = {
      transport: capitalize(activeMethod) as TransportTypes,
      type: 'Default',
    };
    // MFA OTP Request API
    mfaOTPRequest(payload);
  };

  if (!canRequestOtp) {
    return null;
  }

  return (
    <View style={styles.root}>
      {countDownStr && (
        <AppText>
          {t('Resend Code in')} {countDownStr}
        </AppText>
      )}
      {!countDownStr && (
        <TouchableOpacity
          onPress={
            !isMFA ? handleOnRequestOtpCode : handleOnRequestOtpCodeForWithdraw
          }
          disabled={loading || Boolean(countDown)}
        >
          <AppText
            style={styles.sendCodeLinkButton}
            color={THEME.COLORS.secondaryYellow}
          >
            {t('Send Code')}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  sendCodeLinkButton: {
    textDecorationLine: 'underline',
    textDecorationColor: THEME.COLORS.secondaryYellow,
  },
});
