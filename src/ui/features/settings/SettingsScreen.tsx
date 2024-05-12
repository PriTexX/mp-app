import { ScrollView } from 'react-native-gesture-handler';
import { Surface, Switch, Text } from 'react-native-paper';
import { useSettingsStore } from 'src/store/useSettingsStore';

export function SettingsScreen() {
  const { settings, setSettings } = useSettingsStore((s) => s);

  return (
    <ScrollView>
      <Surface
        style={{
          width: 200,
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 8,
          paddingHorizontal: 12,
        }}
      >
        <Text>Темная тема</Text>
        <Switch
          value={settings.isDarkMode}
          onValueChange={() =>
            setSettings({ ...settings, isDarkMode: !settings.isDarkMode })
          }
        />
      </Surface>
    </ScrollView>
  );
}
