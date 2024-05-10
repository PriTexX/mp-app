import { View } from 'react-native';
import { Surface } from 'react-native-paper';

export function StudyingHeader() {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Surface
        style={{
          height: 80,
          width: 80,
        }}
      >
        <View style={{ backgroundColor: 'white' }}></View>
      </Surface>
    </View>
  );
}
