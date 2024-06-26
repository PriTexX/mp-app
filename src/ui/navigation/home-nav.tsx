import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { Drawer as PaperDrawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';

import { MyAppbar } from '../components/MyAppbar';
import { AcademicPerformanceScreen } from '../features/AcademicPerformance';
import { HomeScreen } from '../features/Home';
import { NewsScreen } from '../features/News';
import { ScheduleScreen } from '../features/schedule';
import { ServicesScreen } from '../features/Services';
import { SettingsScreen } from '../features/settings';
import { NotificationsContextProvider } from '../notifications';

import type { DrawerScreenProps } from '@react-navigation/drawer';

export type HomeDrawerParamList = {
  main: undefined;
  schedule: undefined;
  services: undefined;
  settings: undefined;
  news: undefined;
  'academic-performance': undefined;
};

export type HomeDrawerScreenProps = DrawerScreenProps<HomeDrawerParamList>;

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const MemoizedDrawerContent = memo(() => {
  const { navigate } = useNavigation<HomeDrawerScreenProps['navigation']>();

  return (
    <SafeAreaView>
      <PaperDrawer.Section title="Основные">
        <PaperDrawer.Item
          label="Профиль"
          icon="home"
          onPress={() => navigate('main')}
        />
        <PaperDrawer.Item
          label="Расписание"
          icon="calendar"
          onPress={() => navigate('schedule')}
        />
        <PaperDrawer.Item
          label="Успеваемость"
          icon="check-circle-outline"
          onPress={() => navigate('academic-performance')}
        />
        <PaperDrawer.Item
          label="Новости"
          icon="newspaper"
          onPress={() => navigate('news')}
        />
        <PaperDrawer.Item
          label="Сервисы"
          icon="apps"
          onPress={() => navigate('services')}
        />
      </PaperDrawer.Section>
      <PaperDrawer.Item
        label="Настройки"
        icon="cog"
        onPress={() => navigate('settings')}
      />
    </SafeAreaView>
  );
});

// DrawerContent will re-render every time Drawer
// is opened, closed or navigation happens
// so we memo its content in another component
// to prevent content re-rendering
//
// https://github.com/react-navigation/react-navigation/issues/6718#issuecomment-531475410
function DrawerContent() {
  return <MemoizedDrawerContent />;
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
        />
        <Drawer.Screen
          name="schedule"
          options={{ title: 'Расписание' }}
          component={ScheduleScreen}
        />
        <Drawer.Screen
          name="academic-performance"
          options={{ title: 'Успеваемость' }}
          component={AcademicPerformanceScreen}
        />
        <Drawer.Screen
          name="news"
          options={{ title: 'Новости' }}
          component={NewsScreen}
        />
        <Drawer.Screen
          name="services"
          options={{ title: 'Сервисы' }}
          component={ServicesScreen}
        />
        <Drawer.Screen
          name="settings"
          options={{ title: 'Настройки' }}
          component={SettingsScreen}
        />
      </Drawer.Navigator>
    </NotificationsContextProvider>
  );
}
