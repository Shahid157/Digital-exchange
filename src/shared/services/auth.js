/* eslint-disable no-useless-catch */
/* eslint-disable no-return-await */
import axios from 'axios';
import { axiosInstance } from './axiosInstance';
import config, { BS_CONFIG } from './apisConfig';

const baseUrl = `${BS_CONFIG.BASE_URL}/api`;

const axiosURLs = axios.create({
  baseURL: baseUrl,
});

// login
export const loginApi = async (payload) =>
  await axiosURLs.post(config.auth.login, payload);
// export const loginApiPatch = async payload => {
//   return await axiosURLs.patch(config.auth.login, payload);
// };
export const loginApiPatch = async (payload, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  return await axiosURLs.patch(config.auth.login, payload, {
    headers,
  });
};
// BIOMETRIC
export const biomatricEnableApi = async (payload, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  return await axiosURLs.post(config.auth.biomatricEnable, payload, {
    headers,
  });
};

export const deleteBiomatricApi = async (userUUID, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  return await axiosURLs.delete(`${config.auth.deleteBiomatric}${userUUID}`, {
    headers,
  });
};

// users
export const usersApi = async (payload) =>
  await axiosURLs.post(config.auth.users, payload);

// changepassword
export const changepasswordApi = async (payload) =>
  await axiosURLs.post(config.auth.changepassword, payload);
export const changepasswordApiV2 = async (payload) =>
  await axiosURLs.post(config.authV2.changepassword, payload);

// email verify
export const emailverifyApi = async (payload) =>
  await axiosURLs.post(config.auth.emailverify, payload);
export const emailverifyApiV2 = async (payload) =>
  await axiosURLs.post(config.authV2.emailverify, payload);
export const otpVerify = async (payload) =>
  await axiosURLs.patch(config.authV2.otpVerify, payload);
export const otpValidation = async (payload) =>
  await axiosURLs.post(config.authV2.validationCode, payload);

// Kyc Verification
export const kycVerificationApi = async (payload) =>
  await axiosInstance.post(config.auth.kycVerification, payload);

// Get My Profile
export const meApi = async () => await axiosInstance.get(config.auth.me);

export const getAllStaking = async () => {
  try {
    const response = await axiosInstance.get(config.staking.getAllStaking);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStakingEntries = async () => {
  try {
    const response = await axiosInstance.get(config.staking.getStakingHistory);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const withdrawStakingEntries = async (payload) => {
  try {
    const response = await axiosInstance.post(
      config.staking.addStakingHistory,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateStakingEntries = async (id) => {
  try {
    const response = await axiosInstance.patch(
      `${config.staking.updateStacking}/staking/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStakingEntries = async (payload) => {
  try {
    const response = await axiosInstance.post(
      config.staking.addStakingHistory,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateStakingpolicy = async (payload) => {
  try {
    const url = `/${payload.idEntry}/policy`;
    const response = await axiosInstance.patch(
      config.staking.updatePolicy + url,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const chekExistUser = async (userName) => {
  const url = `${config.auth.checkUserName}?username=${userName}`;
  const res = await axiosURLs.post(url);
  return res.data.exists;
};

// refresh token
export const refreshAuthTokenApi = async (payload) =>
  await axiosInstance.post(config.auth.refreshToken, payload);

// Send Code on SMS for verification
export const twoFaSmsApi = async (payload) =>
  await axiosInstance.post(config.auth.twoFaSms, payload);

// Verify Code Recevid on SMs
export const twoFaSmsPatchApi = async (payload) =>
  await axiosInstance.patch(config.auth.twoFaSms, payload);

// Remove SMS Verification
export const twoFaSmsDeleteApi = async () =>
  await axiosInstance.delete(config.auth.twoFaSms);

// MFA Methods for SMS Start Here

export const mfaOtp = async (payload) =>
  await axiosInstance.post(config.authV2.mfaOtp, payload);
export const mfaOtpPatch = async (payload) =>
  await axiosInstance.patch(config.authV2.mfaOtp, payload);
export const mFaSmsApi = async (payload) =>
  await axiosInstance.post(config.authV2.mFaSms, payload);

export const mFaSmsPatchApi = async (payload) =>
  await axiosInstance.patch(config.authV2.mFaSms, payload);

export const mFaSmsDeleteApi = async () =>
  await axiosInstance.delete(config.authV2.mFaSms);
// MFA Methods End Here

// MFA Methods for Authenticator Start Here
export const getMfaGoogleAuthQrApi = async () =>
  await axiosInstance.get(config.authV2.mFaAuthenticator);

export const postMfaGoogleAuthQrApi = async (payload) =>
  await axiosInstance.post(config.authV2.mFaAuthenticator, payload);

export const deleteMfaGoogleAuthQrApi = async () =>
  await axiosInstance.delete(config.authV2.mFaAuthenticator);
// MFA Methods End Here

// User Image upload
export const uploadPhotoApi = async (formData) => {
  try {
    const response = await axiosInstance.post(
      config.auth.uploadPhoto,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

// getgoogleAuthQrApi for getting qr
export const getGoogleAuthQrApi = async () =>
  await axiosInstance.get(config.auth.authenticator);

// postGoogleAuthApi for verifying
export const postGoogleAuthQrApi = async (payload) =>
  await axiosInstance.post(config.auth.authenticator, payload);

// deleteGoogleAuthQrApi for deleting
export const deleteGoogleAuthQrApi = async () =>
  await axiosInstance.delete(config.auth.authenticator);

// changeuserpassword
export const changeUserPasswordApi = async (payload) =>
  await axiosInstance.post(config.auth.changeUserPassword, payload);
