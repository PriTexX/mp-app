import { useNavigation } from '@react-navigation/native';
import { memo, useCallback, useState } from 'react';
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
import { emptyUser, useUserStore } from 'src/store/useUserStore';

import type { HomeDrawerScreenProps } from '../navigation';
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
          <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
            Уверены что хотите выйти?
          </Text>
        </Dialog.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Dialog.Actions>
            <Button style={{ width: 90 }} onPress={leaveFn}>
              <Text style={{ color: '#a31717' }}>Да</Text>
            </Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button style={{ marginRight: 40, width: 90 }} onPress={hideDialog}>
              Отмена
            </Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
}

function ExitComponent({ closeMenu }: { closeMenu: () => void }) {
  const { setIsLoggedIn, setUser } = useUserStore((s) => ({
    setIsLoggedIn: s.setIsLoggedIn,
    setUser: s.setUser,
  }));
  const setTokens = useSecureStore((s) => s.setTokens);

  const leaveAccount = () => {
    setIsLoggedIn(false);
    setUser(emptyUser);
    setTokens({ token: '', jwt: '', jwtRefresh: '' });
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);

  const hideExitDialog = () => {
    setDialogVisible(false);
    closeMenu();
  };

  return (
    <>
      <Menu.Item
        title="Выйти из аккаунта"
        leadingIcon={() => (
          <View style={{ marginTop: 2, transform: [{ rotate: '180deg' }] }}>
            <Icon source="exit-to-app" size={22} color="#a31717" />
          </View>
        )}
        titleStyle={{ color: '#a31717' }}
        onPress={showDialog}
      />
      <ExitDialog
        visible={dialogVisible}
        hideDialog={hideExitDialog}
        leaveFn={leaveAccount}
      />
    </>
  );
}

function AppMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  const { navigate } = useNavigation<HomeDrawerScreenProps['navigation']>();

  const closeMenu = useCallback(() => setMenuVisible(false), []);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => setMenuVisible(true)}
        />
      }
      anchorPosition="bottom"
    >
      <Menu.Item title="Профиль" onPress={() => navigate('main')} />
      <Menu.Item title="Настройки" onPress={() => navigate('settings')} />
      <Divider />
      <ExitComponent closeMenu={closeMenu} />
    </Menu>
  );
}

const MemoizedAppbar = memo(
  ({
    title,
    avatar,
    openDrawer,
  }: {
    title: string;
    avatar: string | null;
    openDrawer: () => void;
  }) => {
    return (
      <Appbar.Header>
        <TouchableOpacity onPress={openDrawer}>
          <Avatar.Image
            size={40}
            source={avatar ? { uri: avatar } : require('assets/user.png')}
          />
        </TouchableOpacity>
        <Appbar.Content
          title={title}
          titleStyle={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
        />
        <AppMenu />
      </Appbar.Header>
    );
  },
);

export function MyAppbar({
  options,
  navigation,
  avatar,
}: DrawerHeaderProps & { avatar: string | null }) {
  const title = options.title ?? '???';

  const openDrawer = useCallback(() => navigation.openDrawer(), []);

  return (
    <MemoizedAppbar title={title} avatar={avatar} openDrawer={openDrawer} />
  );
}
