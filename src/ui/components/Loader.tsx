import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export function Loader() {
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
