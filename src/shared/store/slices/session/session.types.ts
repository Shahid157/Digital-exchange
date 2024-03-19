import { UserMfaMethod } from '../../../models/types';
// eslint-disable-next-line import/no-cycle
import { SimpleBiometricCredentials, SimpleCredentials } from './session.slice';

export type LoginStatus = 'success' | 'failed' | 'loading' | 'idle';

export interface User {
  _id: string;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    photo: string;
  };
  kycVerification: {
    kycVerificationId: string | null;
    status: string;
  };
  twoFactorAuthenticationMethods: UserMfaMethod[];
  lastLogin: string;
  tempAdmin: boolean;
}

export interface SessionState {
  user?: User;
  token?: string;
  refreshToken?: string;
  deviceId?: string;
  loginStatus: LoginStatus;
  loginError?: unknown;
  loginData?: SimpleBiometricCredentials | SimpleCredentials;
}
