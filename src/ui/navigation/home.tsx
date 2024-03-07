import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { NotificationsContextProvider } from '../notifications';
import { HomeScreen } from '../screens';

import type { StackScreenProps } from '@react-navigation/stack';

export type HomeStackParamList = {
  home: undefined;
};

export type HomeStackScreenProps = StackScreenProps<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

export function HomeNav() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme as never}>
      <NotificationsContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
      </NotificationsContextProvider>
    </NavigationContainer>
  );
}
