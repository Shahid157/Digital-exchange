import { createApi } from '@reduxjs/toolkit/query/react';
import { Notification, UpdateNotificationsStatus } from './notification.types';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from '../../../utils/RTKBaseQueryWithReauth';

export const notificationApi = createApi({
  reducerPath: 'notificationsApi',
  tagTypes: ['Notifications'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    notifications: builder.query<Notification[], string>({
      providesTags: ['Notifications'],
      query: () => ({
        url: '/notifications',
      }),
    }),
    updateNotificationsStatus: builder.mutation<
      void,
      UpdateNotificationsStatus
    >({
      invalidatesTags: ['Notifications'],
      query: (body) => ({
        body,
        method: 'PATCH',
        url: '/notifications',
      }),
    }),
  }),
});

export const { useNotificationsQuery, useUpdateNotificationsStatusMutation } =
  notificationApi;
