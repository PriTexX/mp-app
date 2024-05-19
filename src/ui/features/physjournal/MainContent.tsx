import { memo, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SegmentedButtons, Surface, Text, useTheme } from 'react-native-paper';

import { dataPicker, History, HistoryHeader } from './History';

import type { ReactElement } from 'react';
import type { StudentData } from 'src/clients/physedjournal';

function calculateTotalPoints(data: StudentData['data']['student']) {
  const visitValue = data.hasDebtFromPreviousSemester
    ? data.archivedVisitValue
    : data.group.visitValue;

  const totalPoints =
    visitValue * data.visits + data.additionalPoints + data.pointsForStandards;

  return totalPoints;
}

function CellContent({
  title,
  content,
  fontSize,
}: {
  title: string;
  content: string | number | ReactElement;
  fontSize?: number;
}) {
  return (
    <Surface
      style={{
        height: 100,
        width: 100,
        borderRadius: 8,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      {typeof content == 'object' ? (
        content
      ) : (
        <Text style={{ alignSelf: 'center', fontSize }}>{content}</Text>
      )}
    </Surface>
  );
}

export type HistoryType = 'visits' | 'standards' | 'other';

export const MainContent = memo(
  ({ data }: { data: StudentData['data']['student'] }) => {
    const totalPoints = calculateTotalPoints(data);

    const { colors } = useTheme();

    const [historyType, setHistoryType] = useState<HistoryType>('visits');

    const historyData = useMemo(
      () => dataPicker(data, historyType),
      [historyType],
    );

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 38,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <CellContent
            title="Группа"
            content={
              <View>
                <Text style={{ alignSelf: 'center', fontSize: 12 }}>
                  {data.group.groupName}
                </Text>
                <Text
                  style={{ alignSelf: 'center', fontSize: 9, marginTop: 10 }}
                >
                  {data.group.curator.fullName}
                </Text>
              </View>
            }
          />

          <CellContent title="Баллы" content={totalPoints} />
          <CellContent title="Курс" content={data.course} />
        </View>

        <SegmentedButtons
          style={{ marginHorizontal: 20, marginTop: 26 }}
          value={historyType}
          onValueChange={(v) => setHistoryType(v as HistoryType)}
          multiSelect={false}
          buttons={[
            { value: 'visits', label: 'Посещения' },
            { value: 'standards', label: 'Нормативы' },
            { value: 'other', label: 'Другое' },
          ]}
        />

        <FlatList
          style={{ marginHorizontal: 10 }}
          data={historyData}
          renderItem={(d) => <History data={d.item} />}
          ListHeaderComponent={() => (
            <HistoryHeader isVisits={historyType == 'visits'} />
          )}
          ListHeaderComponentStyle={{
            marginBottom: 16,
          }}
          contentContainerStyle={{
            gap: 16,
            marginTop: 16,
            backgroundColor: colors.backdrop,
            padding: 8,
            borderRadius: 6,
          }}
        />
      </View>
    );
  },
);
