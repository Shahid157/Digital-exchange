/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-cycle */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import { notificationApi } from 'shared/store/slices/notifications/notification.api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import settingsReducer from './reducers/settingsReducer';
import userReducer from './reducers/userReducer';
import currenciesSlice from './slices/currencies/currencies.slice';
import walletsSlice from './slices/wallets/wallets.slice';
import oneTimeEventsSlice from './slices/oneTimeEvents/oneTimeEvents.slice';
import signUpSlice from './slices/userSignUp/userSignUp.Slice';
import stakingsSlice from './slices/stakings/stakings.slice';
import { stakingsApi } from './slices/stakings/stakings.api';
import { aztcDepositsApi } from './slices/aztc-deposits/aztc-deposits.api';
import { aztcWithdrawApi } from './slices/aztc-withdraw/aztc-withdraw.api';
import { mfaMethodApi } from './slices/mfa/mfa-otp.api';
import { usersApi } from './apis/users.api';
import sessionSlice from './slices/session/session.slice';
import { aztcSwapApi } from './slices/aztc-swap/aztc-swap.api';

const reducers = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  currencies: currenciesSlice,
  wallets: walletsSlice,
  oneTimeEvents: oneTimeEventsSlice,
  userSignUp: signUpSlice,
  stakings: stakingsSlice,
  session: sessionSlice,
  [stakingsApi.reducerPath]: stakingsApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [aztcDepositsApi.reducerPath]: aztcDepositsApi.reducer,
  [aztcWithdrawApi.reducerPath]: aztcWithdrawApi.reducer,
  [aztcSwapApi.reducerPath]: aztcSwapApi.reducer,
  [mfaMethodApi.reducerPath]: mfaMethodApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'settings', 'session', 'currencies', 'wallets'],
    transforms: [
      createTransform((state, key) => {
        if (key === 'session') {
          return {
            ...state,
            loginStatus: undefined,
            loginError: undefined,
            loginData: undefined,
          };
        }
        return state;
      }),
    ],
  },
  reducers
);

const middlewares = [ReduxThunk];

if (__DEV__) {
  // eslint-disable-next-line global-require
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(middlewares)
      .concat(notificationApi.middleware)
      .concat(mfaMethodApi.middleware)
      .concat(stakingsApi.middleware)
      .concat(aztcDepositsApi.middleware)
      .concat(aztcWithdrawApi.middleware)
      .concat(aztcSwapApi.middleware)
      .concat(usersApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
