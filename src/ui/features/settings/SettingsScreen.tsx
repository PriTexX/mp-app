import { View } from 'react-native';
import { Surface, Switch, Text } from 'react-native-paper';
import { useSettingsStore } from 'src/store/useSettingsStore';

export function SettingsScreen() {
  const { settings, setSettings } = useSettingsStore((s) => s);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Surface
        style={{
          borderRadius: 8,
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Темная тема</Text>
          <Switch
            value={settings.isDarkMode}
            onValueChange={() =>
              setSettings({ ...settings, isDarkMode: !settings.isDarkMode })
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Получать уведомления</Text>
          <Switch
            value={settings.receiveNotifications}
            onValueChange={() =>
              setSettings({
                ...settings,
                receiveNotifications: !settings.receiveNotifications,
              })
            }
          />
        </View>
      </Surface>
    </View>
  );
}
