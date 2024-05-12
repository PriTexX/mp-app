// https://reactnavigation.org/docs/drawer-layout#installation
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage from 'react-native-flash-message';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUserStore } from 'src/store/useUserStore';
import { HomeNav, LoginNav } from 'src/ui/navigation';
import { useAppTheme } from 'src/ui/theme';

void SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const darkTheme = useAppTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider theme={darkTheme}>
        <NavigationContainer theme={darkTheme}>
          <QueryClientProvider client={queryClient}>
            {isLoggedIn ? <HomeNav /> : <LoginNav />}
          </QueryClientProvider>
        </NavigationContainer>
      </PaperProvider>
      <FlashMessage
        position="bottom"
        animated
        statusBarHeight={40}
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        textStyle={{ fontSize: 15, fontStyle: 'italic' }}
        style={{
          borderRadius: 12,
          opacity: 0.8,
          borderWidth: 2,
          borderColor: '#222',
          margin: 12,
        }}
        duration={3000}
        icon="auto"
      />
    </SafeAreaProvider>
  );
}
