import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Drawer as PaperDrawer, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';

import { MyAppbar } from '../components/MyAppbar';
import { NotificationsContextProvider } from '../notifications';
import { HomeScreen, TestScreen } from '../screens';

import type { DrawerScreenProps } from '@react-navigation/drawer';

export type HomeDrawerParamList = {
  home: undefined;
  test: undefined;
};

export type HomeDrawerScreenProps = DrawerScreenProps<HomeDrawerParamList>;

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

function DrawerContent() {
  const { navigate } = useNavigation<HomeDrawerScreenProps['navigation']>();

  return (
    <SafeAreaView>
      <PaperDrawer.Section title="Базовые">
        <PaperDrawer.Item
          label="Home"
          icon="home"
          onPress={() => navigate('home')}
        />
        <PaperDrawer.Item
          label="Settings"
          icon="broadcast"
          onPress={() => navigate('test')}
        />
      </PaperDrawer.Section>
    </SafeAreaView>
  );
}

export function HomeNav() {
  const theme = useTheme();
  const user = useUserStore((s) => s.user);

  return (
    <NavigationContainer theme={theme as never}>
      <NotificationsContextProvider>
        <Drawer.Navigator
          initialRouteName="home"
          screenOptions={{
            header: (props) => (
              <MyAppbar {...props} avatar={user?.avatar ?? ''} />
            ),
          }}
          drawerContent={DrawerContent}
        >
          <Drawer.Screen
            name="home"
            options={{ title: 'Домашняя страница' }}
            component={HomeScreen}
          ></Drawer.Screen>
          <Drawer.Screen
            name="test"
            options={{ title: 'Тестовая страница' }}
            component={TestScreen}
          ></Drawer.Screen>
        </Drawer.Navigator>
      </NotificationsContextProvider>
    </NavigationContainer>
  );
}
