/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { store } from 'shared/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { kycVerificationApi, meApi } from './auth';
import { getNormalizedError } from './helper.service';
import { setUser } from '../store/slices/session/session.slice';

export const fetchKycVerificationData = async (
  getError: any,
  setLoading?: any
) => {
  if (!NativeModules?.MetaMapRNSdk) {
    return;
  }
  const MetaMapVerifyResult = new NativeEventEmitter(
    NativeModules?.MetaMapRNSdk
  );
  MetaMapVerifyResult.addListener('verificationSuccess', async (data) => {
    const payload = {
      verificationId: `${data?.verificationId}`,
    };

    try {
      await kycVerificationApi(payload);
      // Handle successful response
      // get me api called to update user info
      const meResponse = await meApi();
      if (meResponse.status === 200 || meResponse.status === 201) {
        store?.dispatch(setUser(meResponse.data));
        setLoading(false);
        Toast.show({
          text1: 'Successful',
          text2: 'Verification request submitted',
          type: 'success',
        });
      }
    } catch (error) {
      // Handle error
      setLoading(false);
      getError(error);
    }
  });
  MetaMapVerifyResult.addListener('verificationCanceled', () => {
    Toast.show({
      text1: 'Failed',
      text2: 'Verification Canceled',
      type: 'error',
    });
    setLoading(false);
  });
  return () => {
    // Clean up the event listeners when the component unmounts
    MetaMapVerifyResult.removeAllListeners('verificationSuccess');
    MetaMapVerifyResult.removeAllListeners('verificationCanceled');
  };
};

export const updateUserInfo = async () => {
  try {
    // get me api called to update user info
    const meResponse = await meApi();
    if (meResponse.status === 200 || meResponse.status === 201) {
      store?.dispatch(setUser(meResponse.data));
    }
  } catch (error) {
    // Handle error
    getNormalizedError(error);
  }
};
