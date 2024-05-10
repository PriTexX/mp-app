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

function ServiceLink(props: ServiceLinkProps) {
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
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
  ],
  [
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
  ],
];

const initScreen = memo(() => {
  return (
    <ScrollView contentContainerStyle={{ gap: 30 }}>
      {services.map((row) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {row.map((s) => (
            <ServiceLink {...s} />
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
