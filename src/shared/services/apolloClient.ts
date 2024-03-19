/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  ApolloLink,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { store } from 'shared/store';
import { emitGoToVerifyKYCNeeded } from 'shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, CachePersistor } from 'apollo3-cache-persist';
import { refreshTokenSession } from '../store/slices/session/session.slice';
import { BS_CONFIG } from './apisConfig';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = new HttpLink({
  uri: `${BS_CONFIG.BASE_URL}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${BS_CONFIG.WS_URL}/graphql`,
    retryAttempts: 15,
    shouldRetry: () => true,
  })
);

const authLink = setContext(async (_, { headers }) => {
  const { token } = store.getState().session;
  if (!token) {
    return {
      headers: {
        ...headers,
      },
    };
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink) // Use the authLink here to include the Authorization header
);

// Error handling middleware for HttpLink
const errorMiddlewareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    if (response.errors) {
      for (const error of response.errors) {
        // Check for token expiration error
        const payload = error.extensions.originalError as any;
        if (payload.message === 'Unauthorized') {
          store.dispatch(refreshTokenSession());
        }

        if (payload.message === 'KYC verification required') {
          store.dispatch(emitGoToVerifyKYCNeeded());
        }
      }
    }
    return response;
  })
);

const cache = new InMemoryCache();

async function initializeApolloClient() {
  const SCHEMA_VERSION = `${BS_CONFIG.ENV}-1`; // Must be a string.
  const SCHEMA_VERSION_KEY = 'apollo-schema-version';
  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  const persistor = new CachePersistor({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
    debug: false,
  });

  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore();
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge();
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  const client = new ApolloClient({
    link: ApolloLink.from([errorMiddlewareLink, splitLink]),
    cache,
  });

  return client;
}

export default initializeApolloClient;
