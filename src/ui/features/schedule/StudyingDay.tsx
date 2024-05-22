import { Dimensions, FlatList, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

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
        padding: 12,
        margin: 8,
        borderRadius: 12,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
        {lesson.name}
      </Text>

      {lesson.teachers.length > 0 && <Text>{lesson.teachers.join(',\n')}</Text>}

      <Text>{lesson.rooms.join(', ')}</Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <Text style={{ fontSize: 12, fontStyle: 'italic' }}>
          {lesson.timeInterval}
        </Text>
        <Text style={{ fontSize: 12, fontStyle: 'italic' }}>
          {lesson.dateInterval}
        </Text>
      </View>
    </Surface>
  );
}

export function StudyingDay({
  learningDay: { date, lessons },
}: StudyingDayProps) {
  return (
    <View style={{ width: Dimensions.get('screen').width }}>
      <Surface
        style={{
          padding: 12,
          borderRadius: 6,
          alignSelf: 'center',
          marginBottom: 10,
        }}
        mode="flat"
        elevation={3}
      >
        <Text style={{ textAlign: 'center', marginBottom: 8 }}>
          {date.date()} {daysToAbrrv[date.day()]}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          {monthsToAbbrv[date.month()]}
        </Text>
      </Surface>

      {lessons.length > 0 ? (
        <FlatList
          data={lessons}
          renderItem={(l) => <StudyingLesson lesson={l.item} />}
        />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text>Сегодня нет пар</Text>
        </View>
      )}
    </View>
  );
}
