import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UserTokens = {
  token: string;
  jwt: string;
  jwtRefresh: string;
};

export type UserStore = {
  tokens: UserTokens | null;
  setTokens: (user: UserTokens | null) => void;
};

export const useSecureStore = create(
  persist<UserStore>(
    (set) => ({
      tokens: null,
      setTokens: (tokens) => set(() => ({ tokens })),
    }),
    {
      name: 'secure-store',
      storage: createJSONStorage(() => ({
        getItem(key: string) {
          return SecureStore.getItemAsync(key);
        },
        setItem(key: string, value: string) {
          return SecureStore.setItemAsync(key, value);
        },
        removeItem(key: string) {
          return SecureStore.deleteItemAsync(key);
        },
      })),
    },
  ),
);
