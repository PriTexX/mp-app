import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';

import type { DrawerHeaderProps } from '@react-navigation/drawer';

export function MyAppbar({ options, navigation }: DrawerHeaderProps) {
  const title = options.title ?? '???';

  return (
    <Appbar.Header>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Avatar.Image
          size={40}
          source={{
            uri: 'https://e.mospolytech.ru/old/img/photos/upc_a189d9828785bccde0e80723fcdd0b1e_1631046567.jpg',
          }}
        />
      </TouchableOpacity>
      <Appbar.Content
        title={title}
        titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
    </Appbar.Header>
  );
}
