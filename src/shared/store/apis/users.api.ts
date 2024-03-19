import { createApi } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from '../../utils/RTKBaseQueryWithReauth';
import { CreateUserDto, LoginResponseDto } from './users.api.dto';

export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    userExists: builder.query<{ exists: boolean }, string>({
      query: (usernameOrEmail: string) => ({
        url: `/users/exist`,
        params: { username: usernameOrEmail },
      }),
    }),
    createUser: builder.mutation<LoginResponseDto, CreateUserDto>({
      query: (createUserDto) => ({
        url: `/users`,
        method: 'POST',
        body: createUserDto,
      }),
    }),
    sendCreateUserVerificationCode: builder.mutation<
      void,
      { email: string; username: string }
    >({
      query: (body) => ({
        url: `/users/registration/send_code`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLazyUserExistsQuery,
  useCreateUserMutation,
  useSendCreateUserVerificationCodeMutation,
} = usersApi;
