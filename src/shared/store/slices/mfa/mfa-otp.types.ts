// eslint-disable-next-line no-shadow
export enum TransportTypes {
  Sms = 'Sms',
  Email = 'Email',
  Authenticator = 'Authenticator',
}
export type MfaOTP = {
  transport: TransportTypes;
  type: string;
};
export type MfaOTPPatch = {
  transport: TransportTypes;
  code: string;
};
export type MfaSetupSms = {
  phone: string;
};
export type MfaSmsPatch = {
  phone: string;
  code: string;
};

export type MfaSetupBiometric = {
  key: string;
  uuid: string | number[];
};

export type MfaBiometricDelete = {
  uuid: string;
};
export type MfaAuthPost = {
  code: string;
};
export type MfaAuthDataResponse = {
  result: {
    qrCode: string;
    secretKey: string;
  };
};
