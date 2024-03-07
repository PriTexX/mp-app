import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';

import { useNotifications } from '../notifications';
import { styles } from '../styles';

export function HomeScreen() {
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);

  const { requestNotifyPermissions } = useNotifications();

  useEffect(() => {
    void requestNotifyPermissions();
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

export function TestScreen() {
  return (
    <View>
      <Text>Hello test</Text>
    </View>
  );
}
