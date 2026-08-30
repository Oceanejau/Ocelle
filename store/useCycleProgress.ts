import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'alpha-trainer.cycle-progress';

type CycleProgressState = {
  introducedCounts: Record<string, number>;
  hydrate: () => Promise<void>;
  getIntroducedCount: (alphabetId: string) => number;
  markIntroduced: (alphabetId: string, count: number) => Promise<void>;
};

export const useCycleProgress = create<CycleProgressState>((set, get) => ({
  introducedCounts: {},

  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    set({ introducedCounts: stored ? JSON.parse(stored) : {} });
  },

  getIntroducedCount: (alphabetId) => get().introducedCounts[alphabetId] ?? 0,

  markIntroduced: async (alphabetId, count) => {
    const next = { ...get().introducedCounts, [alphabetId]: count };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set({ introducedCounts: next });
  },
}));