import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from 'src/store/useUserStore';

import { styles } from '../styles';

import type { RootStackParamList } from '../navigation/root';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackScreenProps = StackScreenProps<RootStackParamList>['navigation'];

export function LoginScreen() {
  const { navigate } = useNavigation<RootStackScreenProps>();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello login</Text>
      <Button title="Press me" onPress={() => navigate('new-login')}></Button>
    </SafeAreaView>
  );
}

export function NewLoginScreen() {
  const { navigate } = useNavigation<RootStackScreenProps>();
  const setLoggedIn = useUserStore((s) => s.setIsLoggedIn);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello new login</Text>
      <Button title="Press me" onPress={() => navigate('login')}></Button>
      <Button title="Press me" onPress={() => setLoggedIn(true)}></Button>
    </SafeAreaView>
  );
}
