/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUniqueId } from 'react-native-device-info';
import { LoginStatus, SessionState, User } from './session.types';
import { axiosInstanceNoAuth } from '../../../services/axiosInstance';
import { LoginResponseDto } from '../../apis/users.api.dto';
import { RootState } from '../..';
import {
  resetUser,
  setPublicKey,
  setUserUUID,
} from '../../reducers/userReducer';
import { resetSettings, setFirstTime } from '../../reducers/settingsReducer';
import { resetWallet } from '../wallets/wallets.slice';
import { emitRefreshWalletSubscription } from '../oneTimeEvents/oneTimeEvents.slice';

const initialState: SessionState = {
  loginStatus: 'idle',
};

export type SimpleCredentials = {
  usernameOrEmail: string;
  password: string;
  newIpVerificationCode?: string;
};

export type SimpleBiometricCredentials = {
  signature: string;
  username: string;
  payload: string;
};

export interface CatchError {
  response: {
    data: {
      statusCode: number;
    };
  };
}

export const loginWithCredentials = createAsyncThunk(
  'session/loginWithCredentials',
  async (credentials: SimpleCredentials, thunkApi) => {
    try {
      const deviceId = await getUniqueId();
      const { fcmToken } = (thunkApi.getState() as RootState).settings;
      const { data } = await axiosInstanceNoAuth.post<LoginResponseDto>(
        'v2/users/login',
        {
          ...credentials,
          deviceId,
          fcmToken,
        }
      );
      return data;
    } catch (error: unknown) {
      const { response } = error as CatchError;
      if (!response) {
        throw error;
      }
      return thunkApi.rejectWithValue(response.data);
    }
  }
);

export const closeSession = createAsyncThunk(
  'session/closeSession',
  async (_, thunkApi) => {
    thunkApi.dispatch(resetUser());
    thunkApi.dispatch(resetSession());
    thunkApi.dispatch(resetSettings());
    thunkApi.dispatch(setFirstTime(false));
    thunkApi.dispatch(resetWallet());
    thunkApi.dispatch(resetSession());
    thunkApi.dispatch(emitRefreshWalletSubscription());
  }
);

export const refreshTokenSession = createAsyncThunk(
  'session/refreshTokenSession',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { data } = await axiosInstanceNoAuth.post('users/auth/refresh', {
        refreshToken: state.session.refreshToken,
      });

      // refresh wallet after a successfully refresh token
      thunkApi.dispatch(emitRefreshWalletSubscription());

      return data;
    } catch (error: unknown) {
      const { response } = error as CatchError;
      if (!response) {
        throw error;
      }
      if (response.data.statusCode === 401) {
        thunkApi.dispatch(closeSession());
      }
      return thunkApi.rejectWithValue(response.data);
    }
  }
);

export const loginWithBiometric = createAsyncThunk(
  'session/loginWithBiometric',
  async (credentials: SimpleBiometricCredentials, thunkApi) => {
    try {
      const { payload, ...other } = credentials;

      const state = thunkApi.getState() as RootState;
      const deviceId = await getUniqueId();
      const { fcmToken } = state.settings;

      const { data } = await axiosInstanceNoAuth.post<LoginResponseDto>(
        'v2/users/login/biometric',
        {
          ...other,
          deviceId,
          fcmToken,
          uuid: payload,
        }
      );

      if (credentials.username !== state.user.lastUsername) {
        thunkApi.dispatch(setUserUUID(null));
        thunkApi.dispatch(setPublicKey(null));
      }

      return data;
    } catch (error: unknown) {
      const { response } = error as CatchError;
      if (!response) {
        throw error;
      }
      return thunkApi.rejectWithValue(response.data);
    }
  }
);

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setSession: (_, action: PayloadAction<SessionState>) => action.payload,
    resetSession: () => initialState,
    setLoginStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithCredentials.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        loginStatus: 'success',
      }))
      .addCase(loginWithCredentials.rejected, (state, action) => ({
        ...state,
        loginStatus: 'failed',
        loginError: action.payload,
      }))
      .addCase(loginWithCredentials.pending, (state, action) => ({
        ...state,
        loginStatus: 'loading',
        loginError: undefined,
        loginData: action.meta.arg,
      }))
      .addCase(loginWithBiometric.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        loginStatus: 'success',
      }))
      .addCase(loginWithBiometric.rejected, (state, action) => ({
        ...state,
        loginStatus: 'failed',
        loginError: action.payload,
      }))
      .addCase(loginWithBiometric.pending, (state, action) => ({
        ...state,
        loginStatus: 'loading',
        loginError: undefined,
        loginData: action.meta.arg,
      }))
      .addCase(refreshTokenSession.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }));
  },
});

export const { setUser, setToken, setRefreshToken, setSession, resetSession } =
  slice.actions;
export default slice.reducer;
