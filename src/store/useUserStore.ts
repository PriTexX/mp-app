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
  status: string;
  sex: string;
  birthday: string;
  degreeLength: string;
  faculty: string;
  educationForm: string;
  finance: string;
  degreeLevel: string;
  enterYear: string;
};

export type UserStore = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const emptyUser = {
  fullName: '',
  guid: '',
  group: '',
  avatar: '',
  course: '',
  specialization: '',
  specialty: '',
  specialtyCode: '',
  status: '',
  sex: '',
  birthday: '',
  degreeLength: '',
  faculty: '',
  educationForm: '',
  finance: '',
  degreeLevel: '',
  enterYear: '',
} as const;

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: emptyUser,
      isLoggedIn: false,
      clearUser: () => {
        set({ user: emptyUser });
      },
      setUser: (user) => set(() => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
