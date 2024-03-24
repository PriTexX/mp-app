import dayjs from 'dayjs';
import { Dimensions, FlatList, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSchedule } from './get-schedule';
import { StudyingDay } from './studying-day';

export function ScheduleScreen() {
  const { status, schedule, getNextWeek } = useSchedule();

  if (status == 'loading') {
    return <ActivityIndicator />;
  }

  const today = dayjs(new Date());
  const initialScrollIndex = today.day() == 0 ? 6 : today.day() - 1;

  return (
    <SafeAreaView>
      <FlatList
        data={schedule}
        keyExtractor={(d) => d.date.format('YYYY-MM-DD')}
        renderItem={({ item }) => <StudyingDay learningDay={item} />}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        bounces={false}
        onEndReached={getNextWeek}
        initialScrollIndex={initialScrollIndex}
        onScrollToIndexFailed={() => {}}
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
