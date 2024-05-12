import { hideAsync } from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

import { styles } from '../styles';

export function HomeScreen() {
  const setUser = useUserStore((s) => s.setUser);

  const token = useSecureStore((s) => s.tokens.token);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!token) {
        return;
      }

      const [userData, userAvatar] = await Promise.all([
        lkClient.getUserData(token),
        lkClient.getUserAvatar(token),
      ]);

      if (userData.isErr() || userAvatar.isErr()) {
        showMessage({ message: 'Ошибка при загрузке данных', type: 'warning' });
        return;
      }

      const {
        name,
        surname,
        patronymic,
        guid_person: guid,
        group,
        course,
        specialization,
        specialty,
        specialty_code: specialtyCode,
      } = userData.value;

      setUser({
        fullName: `${surname} ${name} ${patronymic}`.trim(),
        guid,
        group,
        avatar: userAvatar.value.user.avatar,
        course,
        specialty,
        specialtyCode,
        specialization,
      });
    };

    void getUserInfo();
  }, [token]);

  return (
    <SafeAreaView style={styles.container} onLayout={hideAsync}>
      <Text>Hello world</Text>
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
