import { useNavigation } from '@react-navigation/native';
import { hideAsync } from 'expo-splash-screen';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
  ActivityIndicator,
  Button,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

import { styles } from '../styles';

import type { LoginStackScreenProps } from '../navigation/login-nav';
import type { RNTextInput } from '../types';

export function LoginScreen() {
  const { navigate } = useNavigation<LoginStackScreenProps['navigation']>();
  const { colors } = useTheme();

  const [isError, setIsError] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef<RNTextInput>(null);

  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);
  const setSecureTokens = useSecureStore((s) => s.setTokens);

  const [activityAnimating, setActivityAnimating] = useState(false);

  const [isPasswordSecured, setIsPasswordSecured] = useState(true);

  const lkLogin = useCallback(async () => {
    Keyboard.dismiss();
    setActivityAnimating(true);
    const resp = await lkClient.login(login, password);

    if (resp.isErr()) {
      setActivityAnimating(false);
      setIsError(true);
      showMessage({ message: 'Неверный логин или пароль', type: 'danger' });
      return;
    }

    setIsLoggedIn(true);

    const { token, jwt, jwt_refresh: jwtRefresh } = resp.value;
    setSecureTokens({ token, jwt, jwtRefresh });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
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
            onSubmitEditing={passwordInputRef.current?.focus}
            placeholder="i.i.ivanov"
            value={login}
            onChangeText={setLogin}
            right={
              <TextInput.Icon
                icon="login"
                onPress={() => setActivityAnimating(!activityAnimating)}
              />
            }
          />
          <TextInput
            style={{ width: 250 }}
            error={isError}
            ref={passwordInputRef}
            secureTextEntry={isPasswordSecured}
            onSubmitEditing={lkLogin}
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
            onChangeText={setPassword}
          />
          <ActivityIndicator
            animating={activityAnimating}
            style={{ display: activityAnimating ? 'flex' : 'none' }}
          />
        </Surface>

        <View
          style={{
            width: 260,
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
