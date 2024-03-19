import AppConfig from 'shared/utils/Config';
// eslint-disable-next-line import/no-cycle
import { apiUrls } from './axiosInstance';

const appConfig = AppConfig();

export const BS_CONFIG = {
  BASE_URL: appConfig.BASE_URL,
  WS_URL: appConfig.BASE_URL.replace('http', 'ws').replace('https', 'wss'),
  ENV: appConfig.Env,
};

const config = {
  auth: {
    login: apiUrls.login,
    bioMetricLogin: apiUrls.bioMetricLogin,
    biomatricEnable: apiUrls.biomatricEnable,
    deleteBiomatric: apiUrls.deleteBiomatric,
    changepassword: apiUrls.changepassword,
    emailverify: apiUrls.emailverify,
    users: apiUrls.users,
    me: apiUrls.me,
    kycVerification: apiUrls.kycVerification,
    refreshToken: apiUrls.refreshToken,
    twoFaSms: apiUrls.twoFaSms,
    uploadPhoto: apiUrls.uploadPhoto,
    authenticator: apiUrls.twofaAuthenticator,
    changeUserPassword: apiUrls.changeUserPassword,
    checkUserName: apiUrls.checkUserExist,
  },
  authV2: {
    mfaOtp: apiUrls.mfaOtp,
    mFaSms: apiUrls.mfaSmsSetup,
    mFaAuthenticator: apiUrls.mfaAuthenticatorSetup,
    validationCode: apiUrls.validationCode,
    otpVerify: apiUrls.otpVerify,
    emailverify: apiUrls.emailverifyV2,
    changepassword: apiUrls.changepasswordV2,
  },
  marketPlace: {
    getPriceofTokens: apiUrls.getPriceofTokens,
    getCoins: apiUrls.coins,
    getWallets: apiUrls.wallets,
  },
  deposit: {
    minDepositAmount: apiUrls.minDepositAmount,
    estimatedAmount: apiUrls.estimatedAmount,
    createDeposit: apiUrls.createDeposit,
    getPaymentMethods: apiUrls.getPaymentMethods,
    exchangeRate: apiUrls.exchangeRate,
  },
  swap: {
    estimatedSwapAmount: apiUrls.estimatedSwapAmount,
  },
  assetTransfer: {
    sendOTP: apiUrls.twofaOtp,
    sendAssetV2: apiUrls.sendAssetsV2,
    sendAsset: apiUrls.sendAssets,
  },
  tempAdmin: {
    getBalanceStats: apiUrls.tempBalanceStats,
    getBalanceSwaps: apiUrls.tempBalanceSwaps,
  },
};

export default config;
