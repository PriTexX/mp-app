import { useNavigation } from '@react-navigation/native';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useRef, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

import { styles } from '../styles';

import type { LoginStackScreenProps } from '../navigation/login-nav';
import type { RNTextInput } from '../types';

const lkClient = new LkClient();

export function LoginScreen() {
  const { navigate } = useNavigation<LoginStackScreenProps['navigation']>();
  const { colors } = useTheme();

  const [isError, setIsError] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef<RNTextInput>(null);

  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);
  const setUser = useUserStore((s) => s.setUser);
  const setSecureTokens = useSecureStore((s) => s.setTokens);

  const [isPasswordSecured, setIsPasswordSecured] = useState(true);

  const lkLogin = async () => {
    const resp = await lkClient.login(login, password);

    if (resp.isErr()) {
      setIsError(true);
      showMessage({ message: 'Неверный логин или пароль', type: 'danger' });
      return;
    }

    await preventAutoHideAsync();
    setIsLoggedIn(true);

    const { token, jwt, jwt_refresh: jwtRefresh } = resp.value;
    setSecureTokens({ token, jwt, jwtRefresh });

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: colors.background,
        }}
        onLayout={hideAsync}
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
            error={isError}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            placeholder="i.i.ivanov"
            value={login}
            onChangeText={(t) => setLogin(t)}
            right={<TextInput.Icon icon="login" />}
          />
          <TextInput
            style={{ width: 250 }}
            error={isError}
            ref={passwordInputRef}
            secureTextEntry={isPasswordSecured}
            onSubmitEditing={async () => {
              Keyboard.dismiss;
              await lkLogin();
            }}
            returnKeyType="done"
            label="Пароль"
            placeholder="Stud123456!"
            value={password}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setIsPasswordSecured(!isPasswordSecured)}
              />
            }
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
    </TouchableWithoutFeedback>
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
