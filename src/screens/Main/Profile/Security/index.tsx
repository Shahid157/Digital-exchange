import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import Divider from 'shared/components/Dividers';
import SecurityItem from 'shared/components/SecurityItem';
import {
  securityNavLinks,
  securityPasswordVerification,
} from 'shared/constants/AppConstants';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import uuid from 'react-native-uuid';
import { setPublicKey, setUserUUID } from 'shared/store/reducers/userReducer';
import { Icons } from 'shared/components/AnyIcon';
import ProfileItem from 'shared/components/ProfileItem';
import AppLoader from 'shared/components/AppLoader';
import {
  useMfaDeleteBiometricMutation,
  useMfaSetupBiometricMutation,
} from 'shared/store/slices/mfa/mfa-otp.api';
import SecurityBottomSheet from './components/SecurityBottomSheet';
import styles from './styles';

function Security() {
  const { t } = useTranslation(['all']);

  const [open, setOpen] = useState(0);
  const { userUUID } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.session);

  const dispatch = useDispatch();
  const [mfaSetupBio] = useMfaSetupBiometricMutation();
  const [mfaDeleteBio] = useMfaDeleteBiometricMutation();
  const BiomatricStatus = [
    t('Disable', { ns: ['all'] }),
    t('Enable', { ns: ['all'] }),
  ];
  const onPressBiomatricType = () => setOpen(1);
  const [selectedBioMetricStatus, setSelectedBioMetricStatus] = useState(
    userUUID ? BiomatricStatus[1] : BiomatricStatus[0]
  );
  const [loading, setLoading] = useState(false);

  const checkDeviceBiometrics = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    let isSupported = false;
    let type = '';
    await rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        isSupported = true;
        type = 'Biometric';
      } else if (available && biometryType === BiometryTypes.FaceID) {
        isSupported = true;
        type = 'FaceID';
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        isSupported = true;
        type = 'Biometric';
      } else {
        setIsBioMetricSupported(false);
      }
    });
    setIsBioMetricSupported(isSupported);
  };
  useEffect(() => {
    checkDeviceBiometrics();
  }, []);
  const [isBioMetricSupported, setIsBioMetricSupported] = useState(false);

  const onSelectBiomatricStatus = (item: string) => {
    if (item == t('Enable', { ns: ['all'] })) {
      enableBioMetric();
    } else {
      deleteBiomatric(userUUID);
    }
    setOpen(0);
  };

  const verifyBioMetric = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const isBiometricAvailable = await rnBiometrics.isSensorAvailable();
    if (isBiometricAvailable) {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: t('Authenticate with your biometrics', { ns: ['all'] }),
        cancelButtonText: t('Cancel', { ns: ['all'] }),
      });
      if (result.success) {
        return true;
      }
      Toast.show({
        text1: t('Error', { ns: ['all'] }),
        text2: t('Unable to verify biometric. Please try again later.', {
          ns: ['all'],
        }),
        type: 'error',
      });
      return false;
    }
  };

  const enableBioMetric = async () => {
    if (await verifyBioMetric()) {
      const rnBiometrics = new ReactNativeBiometrics();
      rnBiometrics
        .createKeys()
        .then((resultObject) => {
          const { publicKey } = resultObject;
          sendPublicKeyToServer(publicKey, token);
        })
        .catch((err: any) => {
          Toast.show({
            text1: t('Error', { ns: ['all'] }),
            text2: t('Unable to setup biometric. Please try again later.', {
              ns: ['all'],
            }),
            type: 'error',
          });
        });
    }
  };

  const sendPublicKeyToServer = async (publicKey: string) => {
    const UUID = uuid.v4();
    try {
      setLoading(true);
      const payload = {
        key: publicKey,
        uuid: UUID,
      };
      // MFA Biometric Setup API
      await mfaSetupBio(payload).unwrap();
      dispatch(setUserUUID(UUID));
      dispatch(setPublicKey(publicKey));
      setSelectedBioMetricStatus(BiomatricStatus[1]);
      Toast.show({
        text1: t('Success', { ns: ['all'] }),
        text2: t('Biometric added successfully.', {
          ns: ['all'],
        }),
        type: 'success',
      });
    } catch (err: any) {
      const error = err?.data?.message;
      if (error === 'You already have many secret keys') {
        Toast.show({
          text1: t('Failed', { ns: ['all'] }),
          text2: t('You already have many secret keys', { ns: ['all'] }),
          type: 'error',
        });
      } else {
        Toast.show({
          text1: t('Failed', { ns: ['all'] }),
          text2: error,
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBiomatric = async (userUUID: string) => {
    if (await verifyBioMetric()) {
      try {
        setLoading(true);
        const payload = {
          uuid: userUUID,
        };
        // MFA Biometric Delete API
        await mfaDeleteBio(payload).unwrap();
        setSelectedBioMetricStatus(BiomatricStatus[0]);
        dispatch(setUserUUID(null));
        Toast.show({
          text1: t('Success', { ns: ['all'] }),
          text2: t('Biometric removed successfully.', {
            ns: ['all'],
          }),
          type: 'success',
        });
      } catch (err: any) {
        const error = err?.data?.message;
        Toast.show({
          text1: t('Failed', { ns: ['all'] }),
          text2: error,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <AppLoader isVisible />}
      <View style={styles.mainContainer}>
        <AppHeader
          leftIcon="back"
          title={t('Security', { ns: ['all'] })}
          titleStyle={{ color: THEME.COLORS.secondaryYellow }}
        />
        <AppText
          semiBold
          h4
          color={THEME.COLORS.textGrey}
          style={{ marginVertical: RF(5) }}
        >
          {t('Two Factor Authentication (2FA)', { ns: ['all'] })}
        </AppText>
        {securityNavLinks.map((data, index) => (
          <SecurityItem data={data} index={index} />
        ))}

        <Divider />

        <AppText
          semiBold
          h4
          color={THEME.COLORS.textGrey}
          style={{ marginBottom: RF(5) }}
        >
          {t('Additional Features', { ns: ['all'] })}
        </AppText>
        <SecurityItem data={securityPasswordVerification} />

        {isBioMetricSupported && Platform.OS === 'android' && (
          <ProfileItem
            icon="finger-print"
            iconType={Icons.Ionicons}
            title={t('Biometric', { ns: ['all'] })}
            rightText={selectedBioMetricStatus}
            onPress={onPressBiomatricType}
          />
        )}

        <SecurityBottomSheet
          setSheetIndex={setOpen}
          sheetIndex={open}
          onClosePress={() => setOpen(0)}
          BiomatricStatus={BiomatricStatus}
          onSelectBiomatricStatus={onSelectBiomatricStatus}
          selectedBioMetricStatus={selectedBioMetricStatus}
        />
      </View>
    </>
  );
}

export default Security;
