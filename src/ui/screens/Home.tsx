import { useEffect } from 'react';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';

import { useNotifications } from '../notifications';
import { styles } from '../styles';

export function HomeScreen() {
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);

  const { requestNotifyPermissions, scheduleNotification } = useNotifications();

  useEffect(() => {
    void requestNotifyPermissions();
    void scheduleNotification({
      content: { title: 'Test', body: 'Some body msg', data: { test: true } },
      trigger: { seconds: 5 },
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello home</Text>
      <Button
        mode="elevated"
        onPress={() => {
          setIsLoggedIn(false);
        }}
      >
        Tap me
      </Button>
    </SafeAreaView>
  );
}
