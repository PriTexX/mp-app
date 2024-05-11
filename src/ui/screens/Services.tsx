import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { memo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { PhysJournal } from '../features/physjournal/PhysJournal';

import type { StackScreenProps } from '@react-navigation/stack';

export type ServicesStackParamList = {
  init: undefined;
  physjournal: undefined;
};

export type ServicesStackScreenProps = StackScreenProps<ServicesStackParamList>;

const Stack = createStackNavigator<ServicesStackParamList>();

type ServiceLinkProps = {
  screenNav: keyof ServicesStackParamList;
  screenName: string;
};

function ServiceLink(props: ServiceLinkProps & { key: number }) {
  const { navigate } = useNavigation<ServicesStackScreenProps['navigation']>();

  return (
    <TouchableOpacity onPress={() => navigate(props.screenNav)}>
      <Surface
        style={{ padding: 10, borderRadius: 12, width: 100, height: 100 }}
        mode="elevated"
        elevation={3}
      >
        <Text style={{ textAlign: 'center' }}>{props.screenName}</Text>
      </Surface>
    </TouchableOpacity>
  );
}

const services: ServiceLinkProps[][] = [
  [
    { screenName: 'Журнал физкультуры1', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры2', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры3', screenNav: 'physjournal' },
  ],
  [
    { screenName: 'Журнал физкультуры4', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры5', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры6', screenNav: 'physjournal' },
  ],
];

const initScreen = memo(() => {
  return (
    <ScrollView contentContainerStyle={{ gap: 30 }}>
      {services.map((row, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {row.map((s, j) => (
            <ServiceLink {...s} key={(i + 1) * (j + 1)} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
});

export function ServicesScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="init" component={initScreen} />
      <Stack.Screen name="physjournal" component={PhysJournal} />
    </Stack.Navigator>
  );
}
