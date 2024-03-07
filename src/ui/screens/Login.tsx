import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LkClient } from 'src/clients/lk';
import { useUserStore } from 'src/store/useUserStore';

import { styles } from '../styles';

import type { LoginStackScreenProps } from '../navigation/login';

const lkClient = new LkClient();

export function LoginScreen() {
  const { navigate } = useNavigation<LoginStackScreenProps['navigation']>();
  const { colors } = useTheme();
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);
  const setUser = useUserStore((s) => s.setUser);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const lkLogin = async () => {
    const resp = await lkClient.login(login, password);

    if (resp.isErr()) {
      console.log('wrong password');
      return;
    }

    setUser({ fullName: 'Zhopa', token: resp.value.token });
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          width: 'auto',
          height: 'auto',
          backgroundColor: colors.primaryContainer,
          padding: 15,
          borderRadius: 5,
          gap: 20,
        }}
      >
        <TextInput
          style={{ width: 250 }}
          label="Логин"
          placeholder="i.i.ivanov"
          value={login}
          onChangeText={(t) => setLogin(t)}
        />
        <TextInput
          style={{ width: 250 }}
          secureTextEntry={true}
          label="Пароль"
          value={password}
          onChangeText={(p) => setPassword(p)}
        />
      </View>

      <View
        style={{
          width: 260,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button style={{ width: 100 }} mode="elevated" onPress={lkLogin}>
          Login
        </Button>
        <Button style={{ width: 100 }} onPress={() => navigate('new-login')}>
          Move
        </Button>
      </View>
    </SafeAreaView>
  );
}

export function NewLoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello new login</Text>
    </SafeAreaView>
  );
}
