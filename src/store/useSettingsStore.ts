import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Settings = {
  isDarkMode: boolean;
  receiveNotifications: boolean;
};

export type SettingsStore = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const defaultSettings = {
  isDarkMode: true,
  receiveNotifications: false,
} as const satisfies Settings;

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      settings: defaultSettings,
      setSettings: (settings) => {
        set({ settings });
      },
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
