import { memo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { HistoryType } from './MainContent';
import type { StudentData } from 'src/clients/physedjournal';

export type HistoryLike = {
  date: string;
  teacher: string;
  type?: string;
  points?: number;
};

export function HistoryHeader({ isVisits }: { isVisits: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>Дата</Text>
      <Text style={{ flex: 2, fontSize: 16, fontWeight: 'bold' }}>
        Преподаватель
      </Text>

      {!isVisits && (
        <>
          <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>
            Баллы
          </Text>
          <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>Тип</Text>
        </>
      )}
    </View>
  );
}

export const History = memo(({ data }: { data: HistoryLike }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Text style={{ flex: 1, fontSize: 12 }}>{data.date}</Text>
      <Text style={{ flex: 2, fontSize: 12 }}>{data.teacher}</Text>
      {data.points !== undefined && (
        <Text style={{ flex: 1, fontSize: 12 }}>{data.points}</Text>
      )}
      {data.type && <Text style={{ flex: 1, fontSize: 12 }}>{data.type}</Text>}
    </View>
  );
});

const standardTypeToName: Record<string, string> = {
  FLEXION_AND_EXTENSION_OF_ARMS: 'Сведение разведение рук',
  JUMPING_ROPE_JUMPS: 'Прыжки с скакалкой',
  JUMPS: 'Прыжки',
  OTHER: 'Другое',
  PULL_UPS: 'Подтягивания',
  SHUTTLE_RUN: 'Челночный бег',
  SQUATS: 'Приседания',
  TILTS: 'Отжимания',
  TORSO_LIFTS: 'Пресс',
};

const workTypeToName: Record<string, string> = {
  ACTIVIST: 'Активист',
  COMPETITION: 'Соревнования',
  EXTERNAL_FITNESS: 'Внешний фитнесс',
  GTO: 'ГТО',
  INTERNAL_TEAM: 'Внутренняя команда',
  ONLINE_WORK: 'ЛМС',
  SCIENCE: 'Наука',
};

export function dataPicker(
  data: StudentData['data']['student'],
  historyType: HistoryType,
): HistoryLike[] {
  switch (historyType) {
    case 'visits':
      return data.visitsHistory.map((h) => ({
        date: h.date,
        teacher: h.teacher.fullName,
      }));

    case 'standards':
      return data.standardsHistory.map((h) => ({
        date: h.date,
        type: standardTypeToName[h.standardType],
        teacher: h.teacher.fullName,
        points: h.points,
      }));

    case 'other':
      return data.pointsHistory.map((h) => ({
        date: h.date,
        type: workTypeToName[h.workType],
        teacher: h.teacher.fullName,
        points: h.points,
      }));
  }
}
