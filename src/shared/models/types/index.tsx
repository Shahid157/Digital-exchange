/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { NavigationProp, RouteProp } from '@react-navigation/core';
import { KycVerificationStatusEnum } from 'shared/types';

export interface GenericNavigation {
  navigation?: NavigationProp<any>;
  route?: RouteProp<any, any>;
}

export enum MFAMethods {
  email = 'email',
  sms = 'sms',
  authenticator = 'authenticator',
}

export interface UserMfaMethod {
  type: MFAMethods;
  payload: Record<string, any>;
  readOnly: boolean;
  default: boolean;
}

export interface UserInfo {
  username: string;
  email: string;
  dob: string;
  phoneNumber: string;
  profile: {
    firstName: string;
    lastName: string;
    photo: string;
  };
  user?: {
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  kycVerification: {
    kycVerificationId: string | null;
    status: KycVerificationStatusEnum;
  };
  twoFactorAuthenticationMethods: UserMfaMethod[];
  [key: string]: any;
}

export interface UserState {
  onboardingPercentage: number | null;
  otpSentTime: null | any;
  portfolioHideSmallBalance: boolean;
  homeHideSmallBalance: boolean;
  tranferModal: boolean;
  lastUsername: any | null;
  userUUID: any | null;
  publicKey: any | null;
}
export interface SettingState {
  language: string;
  faceId: boolean;
  fcmToken: string;
  biometryEnabled: boolean;
  firstTime: boolean;
  darkMode: boolean;
  showBalances: boolean;
  showTotalBal: boolean;
  pinEnabled: boolean;
  currentCurrencyRate: number;
}
