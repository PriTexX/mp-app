import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, NewLoginScreen } from '../features/Login';

import type { StackScreenProps } from '@react-navigation/stack';

export type LoginStackParamList = {
  login: undefined;
  'new-login': undefined;
};

export type LoginStackScreenProps = StackScreenProps<LoginStackParamList>;

const Stack = createStackNavigator<LoginStackParamList>();

export function LoginNav() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="new-login" component={NewLoginScreen} />
    </Stack.Navigator>
  );
}
