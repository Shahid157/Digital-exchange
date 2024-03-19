import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppHeader from 'shared/components/AppHeader';
import AppInput from 'shared/components/AppInput';
import AppLoader from 'shared/components/AppLoader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import PrimaryCheckbox from 'shared/components/PrimaryCheckbox';
import {
  checkPasswordStrength,
  getNormalizedError,
  validatePassword,
} from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import { useNavigation } from '@react-navigation/native';
import { changeUserPasswordApi } from 'shared/services/auth';
import styles from './styles';
import PasswordVerificationBottomSheet from './components/PasswordVerificationBottomSheet';

function PasswordVerification() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isFocusedCurrent, setIsFocusedCurrent] = useState(false);
  const [isFocusedNew, setIsFocusedNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 'Weak',
    color: 'orange',
  });
  const [handleCurrentPassword, setHandleCurrentPassword] = useState(true);
  const [handleNewPassword, setHandleNewPassword] = useState(true);
  const toggleEyeCurrPass = () =>
    setHandleCurrentPassword(!handleCurrentPassword);
  const toggleEyeNewPass = () => setHandleNewPassword(!handleNewPassword);
  const { t } = useTranslation(['all']);
  const navigation = useNavigation();

  useEffect(() => {
    setValidationErrors(validatePassword(newPassword));
    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  }, [newPassword]);

  const onConfirm = async () => {
    try {
      if (currentPassword === newPassword) {
        Toast.show({
          text1: t('Failed'),
          text2: t('cannotUseOldPassword'),
          type: 'error',
        });
        return;
      }
      navigation.navigate(ROUTE_NAMES.OPT_SWITCHER, {
        onOptEntered,
      });
    } catch (error) {
      const err = getNormalizedError(error);
      Toast.show({
        text1: t('Failed'),
        text2: err,
        type: 'error',
      });
    }
  };

  const onOptEntered = async (code: string, transport: string) => {
    try {
      const payload = {
        newPassword,
        password: currentPassword,
        code,
        transport,
      };

      setLoading(true);
      const response = await changeUserPasswordApi(payload);
      setLoading(false);
      setNewPassword('');
      setCurrentPassword('');
      setOpen(1);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      Toast.show({
        text1: t('Failed'),
        text2: err,
        type: 'error',
      });
    }
  };

  return (
    <>
      {loading ? (
        <AppLoader isVisible />
      ) : (
        <View style={styles.mainContainer}>
          <AppHeader
            title={t('Change Password')}
            leftIcon="back"
            titleStyle={{ color: THEME.COLORS.secondaryYellow }}
          />
          <AppText
            style={{ marginVertical: THEME.MARGIN.MID_LOW }}
            medium
            color={THEME.COLORS.textGrey}
          >
            {t('Current Password')}
          </AppText>
          <AppInput
            onFocus={() => setIsFocusedCurrent(true)}
            onBlur={() => setIsFocusedCurrent(false)}
            inputStyle={[styles.input]}
            autoCapitalize="none"
            placeholder={t('Input password')}
            onChangeText={setCurrentPassword}
            value={currentPassword}
            secureTextEntry={handleCurrentPassword}
            eye={handleCurrentPassword ? 'eye-off' : 'eye'}
            onPressIcon={toggleEyeCurrPass}
          />
          <AppText
            style={{ marginVertical: THEME.MARGIN.MID_LOW }}
            medium
            color={THEME.COLORS.textGrey}
          >
            {t('New Password')}
          </AppText>
          <AppInput
            onFocus={() => setIsFocusedNew(true)}
            onBlur={() => setIsFocusedNew(false)}
            inputStyle={[styles.input]}
            autoCapitalize="none"
            placeholder={t('Input password')}
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={handleNewPassword}
            eye={handleNewPassword ? 'eye-off' : 'eye'}
            onPressIcon={toggleEyeNewPass}
          />
          <AppText
            style={{ alignSelf: 'flex-end', marginRight: THEME.MARGIN.LOW }}
          >
            {t('Password Strength:')}{' '}
            <AppText style={{ color: passwordStrength?.color }}>
              {t(passwordStrength?.strength)}
            </AppText>
          </AppText>
          <View style={{ marginVertical: THEME.MARGIN.NORMAL }}>
            {validationErrors.map((item: any, index) => (
              <PrimaryCheckbox
                key={item?.id}
                disabled
                title={t(item?.error)}
                checked={Boolean(item?.checked)}
                onCheckColor={THEME.COLORS.primary}
              />
            ))}
          </View>
          <View style={{ flex: 1 }} />
          <PrimaryButton
            disabled={
              validationErrors.some((error: any) => !error?.checked) ||
              !currentPassword
            }
            onPress={onConfirm}
            title={t('Confirm')}
          />

          <PasswordVerificationBottomSheet
            sheetIndex={open}
            setSheetIndex={setOpen}
          />
        </View>
      )}
    </>
  );
}

export default PasswordVerification;
