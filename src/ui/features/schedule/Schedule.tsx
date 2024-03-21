import dayjs from 'dayjs';
import { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { lkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

import { getWeekSchedule } from './get-schedule';
import { StudyingDay } from './studying-day';
import { StudyingHeader } from './studying-header';

import type { Lesson } from 'src/clients/lk';

export function ScheduleScreen() {
  const tokens = useSecureStore((s) => s.tokens);
  const user = useUserStore((s) => s.user);

  if (!tokens || !user) {
    return;
  }

  const [schedule, setSchedule] = useState<Lesson[][]>([]);

  const { data, status } = useQuery('schedule', () =>
    lkClient.getSchedule(tokens.token, user.group),
  );

  if (status == 'loading') {
    return <Text>Loading</Text>;
  }

  if (status == 'success') {
    if (data.isErr()) {
      return <Text>Error</Text>;
    }

    const [today, setToday] = useState(dayjs(new Date()));

    const generateWeekSchedule = () => {
      const weekSchedule = getWeekSchedule(data.value, today);

      setSchedule(schedule.concat(weekSchedule));

      setToday(today.add(1, 'week'));
    };

    return (
      <SafeAreaView>
        <FlatList
          data={schedule}
          renderItem={(d) => <StudyingDay lessons={d.item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          bounces={false}
          snapToAlignment="start"
          onEndReached={generateWeekSchedule}
          onEndReachedThreshold={0.5}
          snapToInterval={Dimensions.get('screen').width}
          ListEmptyComponent={() => (
            <View>
              <Text>Empty</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
