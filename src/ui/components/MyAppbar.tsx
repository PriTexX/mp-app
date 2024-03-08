import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { useUserStore } from 'src/store/useUserStore';

import type { DrawerHeaderProps } from '@react-navigation/drawer';

export function MyAppbar({ options, navigation }: DrawerHeaderProps) {
  const title = options.title ?? '???';
  const { avatar } = useUserStore((s) => s.user);

  return (
    <Appbar.Header>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Avatar.Image
          size={40}
          source={{
            uri: avatar,
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
