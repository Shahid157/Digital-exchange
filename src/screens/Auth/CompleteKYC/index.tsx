import React, { useEffect, useState } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ICONS } from 'assets/images/icons';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GenericNavigation } from 'shared/models/types';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import AppLoader from 'shared/components/AppLoader';
import { RootState } from 'shared/store';
import { MetaMapRNSdk } from 'react-native-metamap-sdk';
import { kycVerificationApi, meApi } from 'shared/services/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getNormalizedError } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import { KycVerificationStatusEnum } from 'shared/types';
import { setUser } from '../../../shared/store/slices/session/session.slice';

function CompleteKYC(props: GenericNavigation) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.session);
  const signupFlow: any = props?.route?.params?.signupFlow;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['all']);

  useEffect(() => {
    if (!NativeModules?.MetaMapRNSdk) return;

    const MetaMapVerifyResult = new NativeEventEmitter(
      NativeModules?.MetaMapRNSdk
    );
    MetaMapVerifyResult.addListener('verificationSuccess', async (data) => {
      const payload = {
        verificationId: `${data?.verificationId}`,
      };

      try {
        const res = await kycVerificationApi(payload);
        // get me api called to update user info
        const meResponse = await meApi();
        if (meResponse.status == 200 || meResponse.status == 201) {
          dispatch(setUser(meResponse.data));
          setLoading(false);
          Toast.show({
            text1: t('Successful', { ns: ['all'] }),
            text2: t('Verification request submitted', { ns: ['all'] }),
            type: 'success',
          });
          props?.navigation?.goBack();
        }
      } catch (error: any) {
        // Handle error
        setLoading(false);
        const err = getNormalizedError(error);
      }
    });
    MetaMapVerifyResult.addListener('verificationCanceled', (data) => {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: t('Verification Canceled', { ns: ['all'] }),
        type: 'error',
      });
      setLoading(false);
    });
    return () => {
      // Clean up the event listeners when the component unmounts
      MetaMapVerifyResult.removeAllListeners('verificationSuccess');
      MetaMapVerifyResult.removeAllListeners('verificationCanceled');
    };
  }, []);

  // redirect to preview view when the KYC status is verified
  useEffect(() => {
    if (user?.kycVerification.status !== KycVerificationStatusEnum.VERIFIED)
      return;
    props?.navigation?.goBack();
  }, [user?.kycVerification.status]);

  const handleMetaMapClickButton = () => {
    setLoading(true);
    // set 3 params clientId (cant be null), flowId, metadata
    const yourMetadata = { userId: user?._id };
    MetaMapRNSdk.showFlow(
      '64891f4176e69f001a1b807f',
      '64891f412f54d0001bc60d0a',
      yourMetadata
    );
  };

  const doItLater = async () => {
    if (!signupFlow) {
      props?.navigation?.goBack();
    } else {
      setLoading(false);
    }
  };

  // title to show with different KYS status
  const titleMessageToShow = (): string => {
    const status = user?.kycVerification.status;
    if (
      status === KycVerificationStatusEnum.DELETED ||
      status === KycVerificationStatusEnum.NON_VERIFIED
    )
      return t('Complete Your KYC', { ns: ['all'] });
    if (status === KycVerificationStatusEnum.REJECTED)
      return t('KYC verification rejected, talk to support team', {
        ns: ['all'],
      });
    if (status === KycVerificationStatusEnum.REVIEW_NEEDED)
      return t('Your KYC verification is in progress', { ns: ['all'] });
    if (status === KycVerificationStatusEnum.VERIFIED)
      return t('Your KYC verification is done', { ns: ['all'] });
    return t('No status', { ns: ['all'] });
  };

  const showContinueButton = (): boolean => {
    const status = user?.kycVerification.status;
    if (
      status === KycVerificationStatusEnum.DELETED ||
      status === KycVerificationStatusEnum.NON_VERIFIED
    )
      return true;
    if (status === KycVerificationStatusEnum.REJECTED) return false;
    if (status === KycVerificationStatusEnum.REVIEW_NEEDED) return false;
    if (status === KycVerificationStatusEnum.VERIFIED) return false;
    return true;
  };

  return (
    <>
      {loading ? (
        <AppLoader isVisible />
      ) : (
        <View style={GLOBAL_STYLE.MAIN}>
          <FastImage
            source={ICONS.APP_LOGO}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />
          <FastImage
            source={ICONS.KYC}
            style={styles.kyc}
            resizeMode={FastImage.resizeMode.contain}
          />
          <AppText medium secondaryTitle style={styles.mainText}>
            {titleMessageToShow()}
          </AppText>
          <AppText medium h4 color={THEME.COLORS.white}>
            {t(
              'To keep you and everyone safe on our platform, it is important to verify your identity.',
              { ns: ['all'] }
            )}
            {`\n`}
            {`\n`}
            {t(
              'Unverified accounts will have access to limited features. You won’t be able to withdraw funds, request payments, trade or stake etc. until you are verified.',
              { ns: ['all'] }
            )}
          </AppText>
          <AppText
            medium
            h4
            color={THEME.COLORS.primary}
            style={styles.alertText}
          >
            {t('For verification, we might ask atleast one of these things:', {
              ns: ['all'],
            })}
          </AppText>
          <AppText
            medium
            h4
            color={THEME.COLORS.white}
            style={styles.pointsText}
          >
            {t('• Driver’s License / Government-issued photo ID', {
              ns: ['all'],
            })}
            {`\n`} {t('• Passport', { ns: ['all'] })}
            {`\n`} {t('• Social security number', { ns: ['all'] })} {`\n`}{' '}
            {t('• PAN card • Voter ID Card', { ns: ['all'] })}
          </AppText>

          <AppText medium h4 color={THEME.COLORS.white} style={styles.noteText}>
            {t('Note: it might take 1 Business day(s)', { ns: ['all'] })}
          </AppText>

          <View style={{ flex: 0.5 }} />
          {showContinueButton() && (
            <PrimaryButton
              title={t('Continue', { ns: ['all'] })}
              onPress={handleMetaMapClickButton}
            />
          )}
          <TouchableOpacity onPress={doItLater}>
            <AppText
              semiBold
              h3
              color={THEME.COLORS.textGrey}
              style={styles.doItLaterButton}
            >
              {t('Do it Later', { ns: ['all'] })}
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginVertical: THEME.MARGIN.LOW,
    alignSelf: 'center',
    width: RF(150),

    height: RF(80),
  },
  kyc: {
    width: RF(150),
    height: RF(150),
  },
  mainText: { marginVertical: THEME.MARGIN.MID_LOW },
  alertText: { marginVertical: THEME.MARGIN.MID_LOW },
  pointsText: { marginVertical: THEME.MARGIN.LOW },
  noteText: { marginVertical: THEME.MARGIN.LOW },
  doItLaterButton: { alignSelf: 'center', textDecorationLine: 'underline' },
});
export default CompleteKYC;
