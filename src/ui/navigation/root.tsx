import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserStore } from 'src/store/useUserStore';

import { NotificationsContextProvider } from '../notifications';
import { HomeScreen, LoginScreen, NewLoginScreen, Test } from '../screens';

import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  home: undefined;
  login: undefined;
  test: undefined;
  'new-login': undefined;
};

export type RootStackScreenProps = StackScreenProps<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export function RootNav() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  return (
    <NavigationContainer>
      <NotificationsContextProvider>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="test" component={Test} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="new-login" component={NewLoginScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NotificationsContextProvider>
    </NavigationContainer>
  );
}
