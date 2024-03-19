import React, { useState } from 'react';
import { View } from 'react-native';
import { Portal } from '@gorhom/portal';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import EmailOTPBottomSheet from './components/EmailOTPBottomSheet';
import { GenericNavigation } from '../../types';

function EmailVerificationOTP(props?: GenericNavigation) {
  const email = props?.route?.params?.email;
  const [open, setOpen] = useState(0);
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['all']);

  const onVerify = () => {
    try {
      setLoading(true);
      setOpen(1);
      setLoading(false);
    } catch (e) {}
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader
          title={t('Email Verification', { ns: ['all'] })}
          leftIcon="back"
        />
        <View style={{ marginVertical: THEME.MARGIN.LOW }}>
          <AppText style={styles.description}>
            {t('Enter the Code received on your Email', { ns: ['all'] })}
          </AppText>
          <AppText style={styles.description}>{email}</AppText>
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
            height: RF(90),
          }}
        />
        <View style={{ flex: 1 }} />
        <PrimaryButton
          onPress={onVerify}
          loading={loading}
          title={t('Verify', { ns: ['all'] })}
          disabled={Boolean(!(otp?.length == 6))}
          buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
        />
      </View>
      <Portal>
        <EmailOTPBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          navigation={navigation}
          loading={loading}
          onPress={() => {
            setOpen(0);
            props?.navigation?.goBack();
          }}
        />
      </Portal>
    </>
  );
}

export default EmailVerificationOTP;
