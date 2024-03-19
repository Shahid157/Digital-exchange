import { ApolloClient, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { PortalProvider } from "@gorhom/portal";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import React, { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "routes/Routes";
import initializeApolloClient from "shared/services/apolloClient";
import { persistor, store } from "shared/store";
import PushNotification, { Importance } from "react-native-push-notification";
import {
  LocalNotification,
  NotificationHandler,
  NotificatonListener,
  requestUserPermission,
} from "shared/utils/pushNotificationsHelper";

PushNotification.createChannel(
  {
    channelId: "channel_id",
    channelName: "Testing Channel",
    importance: Importance.HIGH,
  },
  () => { }
);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  LocalNotification(remoteMessage);
});

const App = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const initClient = async () => {
      const apolloClient = await initializeApolloClient();
      setClient(apolloClient);
      SplashScreen.hide();
    };
    initClient();
  }, []);

  useEffect(() => {
    requestUserPermission();
    NotificatonListener();
  }, []);

  if (!client) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Routes />
              <NotificationHandler />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
