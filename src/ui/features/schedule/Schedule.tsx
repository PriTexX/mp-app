import dayjs from 'dayjs';
import { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { lkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

import { getWeekSchedule, useSchedule } from './schedule-hook';
import { StudyingDay } from './studying-day';

import type { LearningDay } from './types';

export function ScheduleScreen() {
  const token = useSecureStore((s) => s.tokens.token);
  const group = useUserStore((s) => s.user.group);

  const [schedule, setSchedule] = useState<LearningDay[]>([]);
  const [endOffset, setEndOffset] = useState(2);

  // const [isFirstRender, setIsFirstRender] = useState(true);

  const today = dayjs();

  const { data, status } = useQuery('schedule', () =>
    lkClient.getSchedule(token, group),
  );

  if (status == 'success' && schedule.length == 0) {
    if (data.isErr()) {
      return;
    }

    // setIsFirstRender(false);
    setSchedule([
      ...getWeekSchedule(data.value, today),
      // ...getWeekSchedule(data.value, today.add(1, 'week')),
    ]);
  }

  if (status == 'loading') {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  console.log(`Schedule: ${schedule.length}`);

  return (
    <SafeAreaView>
      <FlatList
        data={schedule}
        keyExtractor={(d) => d.date.format('YYYY-MM-DD')}
        renderItem={({ item }) => <StudyingDay learningDay={item} />}
        horizontal
        // initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        bounces={false}
        onEndReached={() => {}}
        initialScrollIndex={today.day() == 0 ? 6 : today.day() - 1}
        onScrollToIndexFailed={() => {
          console.log('govno');
        }}
        onEndReachedThreshold={0.5}
        disableIntervalMomentum
        snapToInterval={Dimensions.get('screen').width}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <Text>Empty</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
