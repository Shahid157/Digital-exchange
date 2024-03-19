import { createApi } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from 'shared/utils/RTKBaseQueryWithReauth';
import {
  MfaOTP,
  MfaOTPPatch,
  MfaSetupSms,
  MfaSmsPatch,
  MfaSetupBiometric,
  MfaBiometricDelete,
  MfaAuthDataResponse,
  MfaAuthPost,
} from './mfa-otp.types';

export const mfaMethodApi = createApi({
  reducerPath: 'mfaApi',
  tagTypes: ['mfa-otp', 'mfa-sms', 'mfa-authenticator', 'mfa-biometric'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    mfaOTP: builder.mutation<void, MfaOTP>({
      invalidatesTags: ['mfa-otp'],
      query: (body) => ({
        body,
        url: `/mfa/otp`,
        method: 'POST',
      }),
    }),
    mfaOTPPatch: builder.mutation<void, MfaOTPPatch>({
      invalidatesTags: ['mfa-otp'],
      query: (body) => ({
        url: `/mfa/otp`,
        method: 'PATCH',
        body,
      }),
    }),
    mfaSetupSms: builder.mutation<void, MfaSetupSms>({
      invalidatesTags: ['mfa-sms'],
      query: (body) => ({
        url: `/mfa/setup/sms`,
        method: 'POST',
        body,
      }),
    }),
    mfaSmsPatch: builder.mutation<void, MfaSmsPatch>({
      invalidatesTags: ['mfa-sms'],
      query: (body) => ({
        url: `/mfa/setup/sms`,
        method: 'PATCH',
        body,
      }),
    }),
    mfaSmsDelete: builder.mutation<void, void>({
      invalidatesTags: ['mfa-sms'],
      query: () => ({
        url: `/mfa/setup/sms`,
        method: 'DELETE',
      }),
    }),
    mfaGetAuthenticator: builder.query<MfaAuthDataResponse, void>({
      providesTags: ['mfa-authenticator'],
      query: () => ({
        url: `/mfa/setup/authenticator`,
        method: 'GET',
      }),
    }),
    mfaPostAuthenticator: builder.mutation<void, MfaAuthPost>({
      invalidatesTags: ['mfa-authenticator'],
      query: (body) => ({
        url: `/mfa/setup/authenticator`,
        method: 'POST',
        body,
      }),
    }),
    mfaDeleteAuthenticator: builder.mutation<void, void>({
      invalidatesTags: ['mfa-authenticator'],
      query: () => ({
        url: `/mfa/setup/authenticator`,
        method: 'DELETE',
      }),
    }),
    mfaSetupBiometric: builder.mutation<void, MfaSetupBiometric>({
      invalidatesTags: ['mfa-biometric'],
      query: (body) => ({
        url: `/mfa/setup/biometric`,
        method: 'POST',
        body,
      }),
    }),
    mfaDeleteBiometric: builder.mutation<void, MfaBiometricDelete>({
      invalidatesTags: ['mfa-biometric'],
      query: (uuid) => ({
        url: `/mfa/setup/biometric/${uuid}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useMfaOTPMutation,
  useMfaOTPPatchMutation,
  useMfaSetupSmsMutation,
  useMfaSmsPatchMutation,
  useMfaSmsDeleteMutation,
  useMfaGetAuthenticatorQuery,
  useMfaPostAuthenticatorMutation,
  useMfaDeleteAuthenticatorMutation,
  useMfaSetupBiometricMutation,
  useMfaDeleteBiometricMutation,
} = mfaMethodApi;
