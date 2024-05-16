import { memo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal, Surface, Text } from 'react-native-paper';

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
  content: string | number;
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
      <Text style={{ alignSelf: 'center', fontSize }}>{content}</Text>
    </Surface>
  );
}

export const MainContent = memo(
  ({ data }: { data: StudentData['data']['student'] }) => {
    const totalPoints = calculateTotalPoints(data);

    const [curatorModalVisible, setCuratorModalVisible] = useState(false);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            marginTop: 38,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Modal
            visible={curatorModalVisible}
            onDismiss={() => setCuratorModalVisible(false)}
            contentContainerStyle={{
              padding: 20,
              alignItems: 'center',
              marginBottom: 300,
            }}
          >
            <CellContent
              title="Куратор группы"
              content={data.group.curator.fullName}
              fontSize={12}
            />
          </Modal>
          <TouchableOpacity onPress={() => setCuratorModalVisible(true)}>
            <CellContent title="Группа" content={data.group.groupName} />
          </TouchableOpacity>
          <CellContent title="Баллы" content={totalPoints} />
          <CellContent title="Курс" content={data.course} />
        </View>
      </View>
    );
  },
);
