import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { physEdJournalClient } from 'src/clients/physedjournal';
import { useQuery } from 'src/pkg/query';
import { useUserStore } from 'src/store/useUserStore';

import { MainContent } from './MainContent';

export function PhysEdJournal() {
  const studentGuid = useUserStore((u) => u.user.guid);

  const { data, status } = useQuery('physed', () =>
    physEdJournalClient.getStudent(studentGuid),
  );

  if (status == 'loading') {
    return (
      <View style={{ alignContent: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (status == 'error') {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  if (status == 'success') {
    return <MainContent data={data.data.student} />;
  }
}
