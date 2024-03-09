import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  fullName: string;
  guid: string;
  group: string;
  avatar: string;
  course: string;
  specialty: string;
  specialtyCode: string;
  specialization: string;
};

export type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set(() => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
