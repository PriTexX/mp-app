import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Dialog,
  Divider,
  Icon,
  Menu,
  Portal,
  Text,
} from 'react-native-paper';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

import type { DrawerHeaderProps } from '@react-navigation/drawer';

function ExitDialog({
  visible,
  hideDialog,
  leaveFn,
}: {
  visible: boolean;
  hideDialog: () => void;
  leaveFn: () => void;
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="exit-run" size={40} />
        <Dialog.Content style={{ marginTop: 15 }}>
          <Text variant="bodyMedium">Уверены что хотите выйти?</Text>
        </Dialog.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Dialog.Actions>
            <Button
              style={{ width: 90 }}
              onPress={() => {
                leaveFn();
              }}
            >
              <Text style={{ color: '#a31717' }}>Да</Text>
            </Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button style={{ marginRight: 10, width: 90 }} onPress={hideDialog}>
              Отмена
            </Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
}

function AppMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  const { setIsLoggedIn, setUser } = useUserStore((s) => ({
    setIsLoggedIn: s.setIsLoggedIn,
    setUser: s.setUser,
  }));
  const setTokens = useSecureStore((s) => s.setTokens);

  const leaveAccount = () => {
    setIsLoggedIn(false);
    setUser(null);
    setTokens(null);
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            setMenuVisible(true);
          }}
        />
      }
    >
      <Menu.Item
        title="Test item"
        onPress={() => {
          setDialogVisible(true);
        }}
      />
      <Menu.Item title="Test item 2" onPress={() => {}} />
      <Divider />
      <Menu.Item
        title="Выйти из аккаунта"
        leadingIcon={() => (
          <View style={{ marginTop: 2, transform: [{ rotate: '180deg' }] }}>
            <Icon source="exit-to-app" size={22} color="#a31717" />
          </View>
        )}
        titleStyle={{ color: '#a31717' }}
        onPress={() => setDialogVisible(true)}
      />
      <ExitDialog
        visible={dialogVisible}
        hideDialog={() => {
          setDialogVisible(false);
          setMenuVisible(false);
        }}
        leaveFn={leaveAccount}
      />
    </Menu>
  );
}

export function MyAppbar({
  options,
  navigation,
  avatar,
}: DrawerHeaderProps & { avatar: string | null }) {
  const title = options.title ?? '???';

  return (
    <Appbar.Header>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Avatar.Image
          size={40}
          source={avatar ? { uri: avatar } : require('assets/user.png')}
        />
      </TouchableOpacity>
      <Appbar.Content
        title={title}
        titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
      <AppMenu />
    </Appbar.Header>
  );
}
