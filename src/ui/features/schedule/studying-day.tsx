import { Dimensions, FlatList, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { LearningDay } from './types';
import type { Lesson } from 'src/clients/lk';

export type StudyingDayProps = {
  learningDay: LearningDay;
};

const monthsToAbbrv = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
] as const;

const daysToAbrrv = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

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

export function StudyingDay({
  learningDay: { date, lessons },
}: StudyingDayProps) {
  return (
    <SafeAreaView style={{ width: Dimensions.get('screen').width }}>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text>
          {date.date()} {daysToAbrrv[date.day()]}
        </Text>
        <Text>{monthsToAbbrv[date.month()]}</Text>
      </View>
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
