import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { AppState } from 'react-native';
import { useState } from 'react';
import { store } from 'shared/store';
import { setFCMToken } from '../store/reducers/settingsReducer';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
}

interface notificationType {
  userInteraction: boolean;
}

const getFCMToken = async () => {
  try {
    // Register the device for remote messages first
    await messaging().registerDeviceForRemoteMessages();
    const { fcmToken } = store.getState().settings;
    if (!fcmToken) {
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        store?.dispatch(setFCMToken(newFcmToken));
      }
    }
  } catch (e) {
    /* empty */
  }
};

export const NotificatonListener = () => {
  messaging().onTokenRefresh(() => {
    messaging()
      .getToken()
      .then((refreshedToken) => {
        // Handle the refreshed token (e.g., send it to your server)
        store?.dispatch(setFCMToken(refreshedToken));
        // You can patch the new token to your server here
      })
      .catch(() => {
        // do nothing
      });
  });
  messaging().onNotificationOpenedApp(() => {
    // do nothing
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (remoteMessage) {
        // do nothing
      }
    });

  messaging().onMessage(async () => {});
};

export function NotificationHandler() {
  const [flag, setflag] = useState(1);

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister() {
      requestUserPermission();
    },

    onNotification(notification: notificationType) {
      const clicked = notification.userInteraction;
      if (clicked) {
        // do nothing
      } else if (AppState.currentState === 'active') {
        if (flag === 1) {
          setflag(0);
        }
        setTimeout(() => {
          setflag(1);
        }, 500);
      }
    },

    onAction() {
      // do nothing
    },

    onRegistrationError() {
      // do nothing
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
  });
  return null;
}
