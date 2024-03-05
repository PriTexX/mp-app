import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { createContext, useContext, useEffect } from 'react';

import type { RootStackScreenProps } from './navigation/root';
import type { ReactNode } from 'react';

type NotificationsContextData = {
  requestNotifyPermissions: () => Promise<void>;
  scheduleNotification: (
    props: Notifications.NotificationRequestInput,
  ) => Promise<string>;
};

const NotificationsContext = createContext({} as NotificationsContextData);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

type NotificationsContextProviderProps = {
  children: ReactNode;
};

async function requestNotifyPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Not granted');
  }
}

async function scheduleNotification(
  props: Notifications.NotificationRequestInput,
) {
  return Notifications.scheduleNotificationAsync(props);
}

async function handleNotificationResponse(
  message: Notifications.NotificationResponse,
  navigate: RootStackScreenProps['navigation']['navigate'],
) {
  navigate('test');
}

export function NotificationsContextProvider({
  children,
}: NotificationsContextProviderProps) {
  const { navigate } = useNavigation<RootStackScreenProps['navigation']>();

  const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ data }: { data: any }) =>
      handleNotificationResponse(data.notification, navigate),
  );

  useEffect(() => {
    void Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    return () => {
      void Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    };
  });

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (lastNotificationResponse) {
      void handleNotificationResponse(lastNotificationResponse, navigate);
    }
  }, [lastNotificationResponse]);

  return (
    <NotificationsContext.Provider
      value={{ requestNotifyPermissions, scheduleNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
