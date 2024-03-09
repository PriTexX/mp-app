import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage from 'react-native-flash-message';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';
import { HomeNav } from 'src/ui/navigation/home-nav';
import { LoginNav } from 'src/ui/navigation/login-nav';
import { getTheme } from 'src/ui/theme';

void SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const darkTheme = getTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider theme={darkTheme}>
        <NavigationContainer theme={darkTheme}>
          {isLoggedIn ? <HomeNav /> : <LoginNav />}
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
