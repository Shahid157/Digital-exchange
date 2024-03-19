import { MFAMethods } from '../../../../shared/models/types';

export const getMethodName = (method: MFAMethods) => {
  switch (method) {
    case MFAMethods.email:
      return 'Email';
    case MFAMethods.sms:
      return 'SMS';
    case MFAMethods.authenticator:
      return 'Authenticator';
    default:
      return 'Email';
  }
};

export const getMethodIcon = (method: MFAMethods) => {
  switch (method) {
    case MFAMethods.email:
      return 'envelope';
    case MFAMethods.sms:
      return 'phone';
    case MFAMethods.authenticator:
      return 'google';
    default:
      return 'envelope';
  }
};

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}
