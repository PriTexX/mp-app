import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNav } from 'src/ui/navigation/root';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <RootNav />
    </SafeAreaProvider>
  );
}
