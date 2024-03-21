import { Dimensions, FlatList, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Lesson } from 'src/clients/lk';

export type StudyingDayProps = {
  lessons: Lesson[];
};

function StudyingLesson({ lesson }: { lesson: Lesson }) {
  return (
    <Surface
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>{lesson.name}</Text>
      <Text>{lesson.timeInterval}</Text>
      <Text>{lesson.dateInterval}</Text>
    </Surface>
  );
}

export function StudyingDay({ lessons }: StudyingDayProps) {
  return (
    <SafeAreaView style={{ width: Dimensions.get('screen').width }}>
      {lessons.length > 0 ? (
        <FlatList
          data={lessons}
          renderItem={(l) => <StudyingLesson lesson={l.item} />}
        />
      ) : (
        <View>
          <Text>No lessons</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
