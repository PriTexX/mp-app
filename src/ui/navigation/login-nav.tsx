import { createStackNavigator } from '@react-navigation/stack';

import { KnowYourLoginScreen } from '../features/KnowYourLogin';
import { LoginScreen } from '../features/Login';

import type { StackScreenProps } from '@react-navigation/stack';

export type LoginStackParamList = {
  login: undefined;
  'know-your-login': undefined;
};

export type LoginStackScreenProps = StackScreenProps<LoginStackParamList>;

const Stack = createStackNavigator<LoginStackParamList>();

export function LoginNav() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{ title: 'Вход' }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="know-your-login"
        options={{ title: 'Узнать свой логин' }}
        component={KnowYourLoginScreen}
      />
    </Stack.Navigator>
  );
}
