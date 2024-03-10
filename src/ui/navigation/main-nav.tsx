import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Drawer as PaperDrawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';

import { MyAppbar } from '../components/MyAppbar';
import { NotificationsContextProvider } from '../notifications';
import { HomeScreen, ScheduleScreen, TestScreen } from '../screens';

import type { DrawerScreenProps } from '@react-navigation/drawer';

export type HomeDrawerParamList = {
  main: undefined;
  schedule: undefined;
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
          onPress={() => navigate('main')}
        />
        <PaperDrawer.Item
          label="Schedule"
          icon="calendar"
          onPress={() => navigate('schedule')}
        />
        <PaperDrawer.Item
          label="Settings"
          icon="cog"
          onPress={() => navigate('test')}
        />
      </PaperDrawer.Section>
    </SafeAreaView>
  );
}

export function HomeNav() {
  const user = useUserStore((s) => s.user);

  return (
    <NotificationsContextProvider>
      <Drawer.Navigator
        initialRouteName="main"
        screenOptions={{
          header: (props) => (
            <MyAppbar {...props} avatar={user?.avatar ?? ''} />
          ),
        }}
        drawerContent={DrawerContent}
      >
        <Drawer.Screen
          name="main"
          options={{ title: 'Домашняя страница' }}
          component={HomeScreen}
        ></Drawer.Screen>
        <Drawer.Screen
          name="schedule"
          options={{ title: 'Расписание' }}
          component={ScheduleScreen}
        ></Drawer.Screen>
        <Drawer.Screen
          name="test"
          options={{ title: 'Тестовая страница' }}
          component={TestScreen}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </NotificationsContextProvider>
  );
}
