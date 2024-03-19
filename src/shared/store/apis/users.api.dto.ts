/* eslint-disable import/no-cycle */
import { SessionState } from '../slices/session/session.types';

export type LoginWithCredentialsDto = {
  usernameOrEmail: string;
  password: string;
  deviceId: string;
  newIpVerificationCode?: string;
  fcmToken?: string;
};

export type LoginWithBiometricDto = {
  uuid: string;
  signature: string;
  username: string;
  deviceId: string;
  fcmToken: string;
};

export type CreateUserDto = {
  email: string;
  username: string;
  password: string;
  deviceId: string;
  code: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  fcmToken?: string;
};

export interface LoginResponseDto extends SessionState {}
