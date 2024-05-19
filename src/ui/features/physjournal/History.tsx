import { memo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

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
