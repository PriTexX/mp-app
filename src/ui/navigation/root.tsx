import { PaperProvider } from 'react-native-paper';
import { useUserStore } from 'src/store/useUserStore';

import { getTheme } from '../theme';
import { HomeNav } from './home';
import { LoginNav } from './login';

const darkTheme = getTheme();

export function Root() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  return (
    <PaperProvider theme={darkTheme}>
      {isLoggedIn ? <HomeNav /> : <LoginNav />}
    </PaperProvider>
  );
}
