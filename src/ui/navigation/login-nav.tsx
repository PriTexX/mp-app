import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { LoginScreen, NewLoginScreen } from '../screens';

import type { StackScreenProps } from '@react-navigation/stack';

export type LoginStackParamList = {
  login: undefined;
  'new-login': undefined;
};

export type LoginStackScreenProps = StackScreenProps<LoginStackParamList>;

const Stack = createStackNavigator<LoginStackParamList>();

export function LoginNav() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme as never}>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen
          name="new-login"
          component={NewLoginScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
