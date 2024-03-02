import { Button, StyleSheet, Text, View } from 'react-native';

import { useUserStore } from './src/store/useUserStore';

export default function App() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);

  return (
    <View style={styles.container}>
      {isLoggedIn == false ? (
        <Text>Some not logged in text </Text>
      ) : (
        <Text>Some logged in text </Text>
      )}
      <Button
        title="Change mde"
        onPress={() => {
          setIsLoggedIn(!isLoggedIn);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
