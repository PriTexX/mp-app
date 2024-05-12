import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useRef } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSchedule } from './schedule-hook';
import { StudyingDay } from './StudyingDay';

dayjs.extend(isoWeek);

export function ScheduleScreen() {
  const { status, schedule, getNextWeek } = useSchedule();
  const listRef = useRef<FlatList>(null);

  if (status == 'loading') {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const today = dayjs();

  return (
    <SafeAreaView>
      <FlatList
        ref={listRef}
        data={schedule}
        keyExtractor={(d) => d.date.format('YYYY-MM-DD')}
        renderItem={({ item }) => <StudyingDay learningDay={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        bounces={false}
        onEndReached={getNextWeek}
        onScrollToIndexFailed={() => {}}
        onEndReachedThreshold={0.5}
        disableIntervalMomentum
        onLayout={() =>
          listRef.current?.scrollToIndex({
            index: today.day() == 0 ? 6 : today.day() - 1,
          })
        }
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
