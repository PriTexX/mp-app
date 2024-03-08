import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LkClient } from 'src/clients/lk';
import { useUserStore } from 'src/store/useUserStore';

import { styles } from '../styles';

import type { LoginStackScreenProps } from '../navigation/login-nav';
import type { RNTextInput } from '../types';

const lkClient = new LkClient();

export function LoginScreen() {
  const { navigate } = useNavigation<LoginStackScreenProps['navigation']>();
  const { colors } = useTheme();
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);
  const setUser = useUserStore((s) => s.setUser);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef<RNTextInput>(null);

  const lkLogin = async () => {
    const resp = await lkClient.login(login, password);

    if (resp.isErr()) {
      showMessage({ message: 'Неверный логин или пароль', type: 'danger' });
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
      <Surface
        style={{
          padding: 30,
          borderRadius: 6,
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{ width: 250 }}
          label="Логин"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          placeholder="i.i.ivanov"
          value={login}
          onChangeText={(t) => setLogin(t)}
        />
        <TextInput
          style={{ width: 250 }}
          ref={passwordInputRef}
          secureTextEntry={true}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType="done"
          label="Пароль"
          value={password}
          onChangeText={(p) => setPassword(p)}
        />
      </Surface>

      <View
        style={{
          width: 260,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          style={{ width: 100 }}
          mode="elevated"
          onPress={async () => {
            Keyboard.dismiss();
            await lkLogin();
          }}
        >
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
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello new login</Text>
      <Button
        onPress={() => {
          setIsLoggedIn(true);
        }}
      >
        Login
      </Button>
    </SafeAreaView>
  );
}
