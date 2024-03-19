import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
// eslint-disable-next-line import/no-cycle
import {
  closeSession,
  setSession,
} from '../store/slices/session/session.slice';
import { BS_CONFIG } from '../services/apisConfig';
import { SessionState } from '../store/slices/session/session.types';
import { RootState } from '../store';

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${BS_CONFIG.BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).session;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// eslint-disable-next-line import/prefer-default-export
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const { refreshToken } = (api.getState() as RootState).session;
    if (!refreshToken) {
      api.dispatch(closeSession());
      return result;
    }

    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: `${BS_CONFIG.BASE_URL}/api/users/auth/refresh`,
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(setSession(refreshResult.data as SessionState));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(closeSession());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
