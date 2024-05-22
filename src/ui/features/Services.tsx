import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { memo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { Pd } from './Pd';
import { PhysEdJournal } from './physjournal/PhysEdJournal';

import type { StackScreenProps } from '@react-navigation/stack';

export type ServicesStackParamList = {
  init: undefined;
  physjournal: undefined;
  pd: undefined;
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
        style={{
          padding: 10,
          borderRadius: 12,
          width: 100,
          height: 100,
          justifyContent: 'center',
        }}
        mode="elevated"
        elevation={3}
      >
        <Text style={{ textAlign: 'center', fontSize: 12 }}>
          {props.screenName}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
}

const services: ServiceLinkProps[][] = [
  [
    { screenName: 'Журнал физкультуры', screenNav: 'physjournal' },
    { screenName: 'Проектная деятельность', screenNav: 'pd' },
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
      <Stack.Screen name="physjournal" component={PhysEdJournal} />
      <Stack.Screen name="pd" component={Pd} />
    </Stack.Navigator>
  );
}
