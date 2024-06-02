import dayjs from 'dayjs';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Modal, Portal, Surface, Text, useTheme } from 'react-native-paper';
import { lkClient } from 'src/clients/lk';
import { useQuery } from 'src/pkg/query';
import { useSecureStore } from 'src/store/useSecureStore';

import { Loader } from '../components/Loader';

import type { AcademicPerformance } from 'src/clients/lk';

function parseDate(date: string) {
  let day = date.substring(5, 7);

  day = day.endsWith(',') ? `0${day[0]}` : day;

  return dayjs(`2024/06/${day}`);
}

function Academic({ data }: { data: AcademicPerformance }) {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { colors } = useTheme();

  const date = parseDate(data.exam_date);
  const disabled = dayjs().isBefore(date);

  return (
    <>
      <TouchableOpacity onPress={showModal} disabled={disabled}>
        <Surface
          mode="flat"
          elevation={disabled ? 2 : 5}
          style={{
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
          <Text style={{ fontStyle: 'italic', fontSize: 12 }}>
            {date.format('DD MMMM YYYY')} {data.exam_time}
          </Text>
        </Surface>
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: colors.secondaryContainer,
            borderRadius: 8,
            width: '80%',
            padding: 20,
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
            {data.name}
          </Text>
          <View style={{ gap: 8 }}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Форма аттестации:</Text>{' '}
              {data.exam_type}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Дата проведения:</Text>{' '}
              {date.format('DD MMMM YYYY')}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Оценка:</Text> {data.grade}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Номер ведомости:</Text>{' '}
              {data.bill_num}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Кафедра:</Text> {data.chair}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Преподаватель:</Text>{' '}
              {data.teacher}
            </Text>
          </View>
        </Modal>
      </Portal>
    </>
  );
}

function AcademicBlock({
  title,
  data,
}: {
  title: string;
  data: AcademicPerformance[];
}) {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 15,
        }}
      >
        {title}
      </Text>

      <View style={{ gap: 10 }}>
        {data.map((e) => (
          <Academic key={e.id} data={e} />
        ))}
      </View>
    </View>
  );
}

function groupAcademicPerformance(academic: AcademicPerformance[]) {
  const exams: AcademicPerformance[] = [];
  const test: AcademicPerformance[] = [];
  const coursework: AcademicPerformance[] = [];

  academic.forEach((a) => {
    switch (a.exam_type) {
      case 'Экзамен':
        exams.push(a);
        return;
      case 'Курсовой проект':
        coursework.push(a);
        return;
      case 'Зачет':
        test.push(a);
        return;
    }
  });

  return { exams, test, coursework };
}

export function AcademicPerformanceScreen() {
  const token = useSecureStore((t) => t.tokens.token);

  const { data, status } = useQuery('academic', () =>
    lkClient.getAcademicPerformance(token),
  );

  if (status == 'success') {
    const groupedAcademics = groupAcademicPerformance(data.academicPerformance);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Surface style={{ padding: 12, borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 30 }}>
            Успеваемость
          </Text>
          <ScrollView contentContainerStyle={{ gap: 30 }}>
            {groupedAcademics.exams && (
              <AcademicBlock title="Экзамен" data={groupedAcademics.exams} />
            )}
            {groupedAcademics.coursework && (
              <AcademicBlock
                title="Курсовой проект"
                data={groupedAcademics.coursework}
              />
            )}
            {groupedAcademics.test && (
              <AcademicBlock title="Зачет" data={groupedAcademics.test} />
            )}
          </ScrollView>
        </Surface>
      </View>
    );
  }

  return <Loader />;
}
