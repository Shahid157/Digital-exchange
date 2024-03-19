import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';
import { cleanSingle } from 'react-native-image-crop-picker';
import styles from './styles';
import AppHeader from '../../../shared/components/AppHeader';
import AppText from '../../../shared/components/AppText';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { THEME } from '../../../shared/theme';
import { useAppSelector } from '../../../shared/hooks/redux';
import { GenericNavigation, MFAMethods } from '../../../shared/models/types';
import RequestOptCodeSection from './components/RequestOtpCodeSection';
import { capitalize, getMethodName } from './lib/utils';
import MFABottomSheet from './components/MFABottomSheet';
import { toast } from '../../../shared/services/helper.service';

/**
 *
 * Two Factor Authentication Switcher, react component that handles the otp code verification internally. As required
 * prop you must pass a callback function to handle the otp code entered called {onOptEntered}.
 * this should be passed though the route params as shown in the example below.
 *
 * @example
 * navigation.navigate(ROUTE_NAMES.OPT_SWITCHER, {
 *  onOptEntered: (otp: string, method: TwoFactorAutenticationEnum) => {
 *   // handle otp code entered
 *  }
 * })
 *
 * @note Currently this component do not handle the validation of the OTP code entered, this should be done by the parent component.
 *
 * @returns
 */
export default function MFASwitcher(props: GenericNavigation) {
  const isMFA = props?.route?.params?.isMFA;

  const { t } = useTranslation(['all']);
  const user = useAppSelector((state) => state.session.user);
  const navigation = useNavigation();

  if (!user) {
    navigation.goBack();
    return;
  }

  const methods = user.twoFactorAuthenticationMethods;
  const [activeMethod, setActiveMethod] = useState<MFAMethods>(
    methods.find((method) => method.default)?.type || MFAMethods.email
  );

  const [otp, setOTP] = useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnSwitchMethod = () => {
    setBottomSheetOpen(true);
  };

  const handleChangeMethod = (method: MFAMethods) => {
    setActiveMethod(method);
    setBottomSheetOpen(false);
    setOTP('');
  };

  const handleOnOtpEntered = async () => {
    try {
      setLoading(true);
      await props.route?.params?.onOptEntered(otp, capitalize(activeMethod));
    } catch (e: any) {
      setOTP('');
      if (e?.response?.data?.message == 'code not found') {
        toast(t('Error'), t('Invalid Code'), 'error');
      } else {
        toast(
          t('Error'),
          t('An error occurred while sending the code'),
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader title={t('Security Verifications')} leftIcon="back" />
        <View style={{ marginVertical: THEME.MARGIN.LOW }}>
          <View style={styles.numberBullet}>
            <AppText semiBold>
              {t('authentication_via', {
                method: t(getMethodName(activeMethod)),
              })}
            </AppText>
          </View>
          <RequestOptCodeSection isMFA activeMethod={activeMethod} />
        </View>

        <OTPInputView
          code={otp}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpField}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOTP}
          placeholderTextColor={THEME.COLORS.secondaryYellow}
          style={{
            ...styles.otpInputViewStyle,
            display: activeMethod === 'sms' ? 'flex' : 'none',
          }}
        />

        <OTPInputView
          code={otp}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpField}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOTP}
          placeholderTextColor={THEME.COLORS.secondaryYellow}
          style={{
            ...styles.otpInputViewStyle,
            display: activeMethod === 'sms' ? 'none' : 'flex',
          }}
        />

        {methods?.length > 1 && (
          <TouchableOpacity onPress={handleOnSwitchMethod}>
            <AppText h5 style={styles.sendCodeLinkButton}>
              {t('switch_to_another_auth_method')}
            </AppText>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.submitContainer}>
        <PrimaryButton
          loading={loading}
          title={t('Submit')}
          disabled={
            activeMethod === 'sms' ? otp?.length !== 4 : otp?.length !== 6
          }
          onPress={handleOnOtpEntered}
          buttonStyle={styles.codeOtpSumitStyle}
        />
      </View>

      <MFABottomSheet
        open={bottomSheetOpen}
        setOpen={setBottomSheetOpen}
        methods={methods.filter((it) => it.type !== activeMethod)}
        onChangeMethodType={handleChangeMethod}
      />
    </>
  );
}
