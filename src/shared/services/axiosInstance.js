/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import { emitGoToVerifyKYCNeeded } from 'shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import AppConfig from 'shared/utils/Config';
import { store } from '../store';
import { closeSession, setToken } from '../store/slices/session/session.slice';

const appConfig = AppConfig();

const baseUrl = `${appConfig.BASE_URL}/api`;

const apiUrls = {
  login: '/v2/users/login',
  bioMetricLogin: '/v2/users/login/biometric',
  biomatricEnable: '/mfa/setup/biometric',
  deleteBiomatric: '/mfa/setup/biometric/',
  changepassword: '/users/password_reset/reset',
  changepasswordV2: '/v2/users/password_reset/reset',
  emailverify: '/users/password_reset/send_code',
  emailverifyV2: '/v2/users/password_reset/send_code',
  users: '/users',
  me: '/users/me',
  kycVerification: '/users/me/kyc/verification',
  refreshToken: '/users/auth/refresh',
  getPriceofTokens: '/tokens/prices',
  twoFaSms: '/2fa/sms',
  uploadPhoto: '/users/profile/photo',
  twofaAuthenticator: '/2fa/authenticator',
  coins: '/currencies',
  wallets: '/wallets',
  minDepositAmount: '/transactions/deposits/min_amount',
  estimatedAmount: '/transactions/deposits/estimated_amount',
  createDeposit: '/transactions/deposits',
  getPaymentMethods: '/payment-methods',
  exchangeRate: '/payments/exchange-rate',
  walletCoins: '/wallets',
  swapEstimation: '/wallets/swap/convertion_estimated',
  twofaOtp: '/2fa/otp',
  sendAssets: '/transactions/transfers',
  tempBalanceStats: '/temp/admin/balances/stats',
  tempBalanceSwaps: '/temp/admin/balances/swap_stats',
  changeUserPassword: '/users/change/password',
  checkUserExist: '/users/exist',
  getAllStaking: '/products/staking',
  createEntryStaking: '/products/staking/entries',
  getHistoryStaking: '/products/staking/entries',
  updateStacking: '/products/staking/entries',
  // mfa methods
  mfaOtp: '/mfa/otp',
  mfaSmsSetup: '/mfa/setup/sms',
  mfaAuthenticatorSetup: '/mfa/setup/authenticator',
  otpVerify: '/mfa/otp',
  validationCode: '/v2/users/password_reset/validation_code',
  sendAssetsV2: '/v2/transactions/transfers',
};

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
  baseURL: baseUrl,
});
// Create an instance of axios with the base URL
const axiosInstanceNoAuth = axios.create({
  baseURL: baseUrl,
});
let isRefreshing = false;
let refreshSubscribers = [];
const refreshToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      // Make an API call to your server to refresh the token
      // const refreshTokenVal = await AsyncStorage.getItem("refreshToken");
      const { refreshToken } = store?.getState().session;
      const response = await axiosInstanceNoAuth.post(apiUrls.refreshToken, {
        refreshToken,
      });

      const newToken = response.data.token;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      store?.dispatch(setToken(newToken));
      refreshSubscribers.forEach((subscriber) => subscriber(newToken));
      refreshSubscribers = [];
      return refreshToken;
    } catch (error) {
      store?.dispatch(closeSession());
      throw error;
    } finally {
      isRefreshing = false;
    }
  } else {
    // If the token is already being refreshed, wait and then retry the request
    return new Promise((resolve) => {
      refreshSubscribers.push((token) => {
        resolve(token);
      });
    });
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // You can modify the request config here, such as adding headers or authentication tokens
    // const token = await AsyncStorage.getItem("token");
    const token = store?.getState()?.session?.token;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    // Handle request errors
    Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle response errors
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      if (error.response.status === 401) {
        const newToken = await refreshToken();
        if (!newToken) {
          store?.dispatch(closeSession());
        }
      }
      if (
        error.response.status === 403 &&
        error.response.data.message === 'KYC verification required'
      ) {
        store.dispatch(emitGoToVerifyKYCNeeded());
      }
    } else if (error.request) {
      // The request was made but no response was received
    } else {
      // Something happened in setting up the request that triggered an error
    }

    return Promise.reject(error);
  }
);

export { axiosInstance, apiUrls, axiosInstanceNoAuth };
