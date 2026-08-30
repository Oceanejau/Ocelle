import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnswerRecord, AlphabetId } from '../data/types';
import { computeWeightedSuccessRate } from '../utils/scoring';

const STORAGE_KEY = 'alpha-trainer.progress';

type ProgressState = {
  records: AnswerRecord[];
  hydrate: () => Promise<void>;
  recordAnswer: (record: AnswerRecord) => Promise<void>;
  getSuccessRate: (alphabetId: AlphabetId) => number;
  getKnownCharCount: (alphabetId: AlphabetId) => number;
  hasAnsweredCorrectly: (alphabetId: AlphabetId, char: string) => boolean;
};

export const useProgress = create<ProgressState>((set, get) => ({
  records: [],

  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    set({ records: stored ? JSON.parse(stored) : [] });
  },

  recordAnswer: async (record) => {
    const records = [...get().records, record];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    set({ records });
  },

  getSuccessRate: (alphabetId) => {
    const relevant = get().records.filter((r) => r.alphabetId === alphabetId);
    return computeWeightedSuccessRate(relevant);
  },

  getKnownCharCount: (alphabetId) => {
    const correctChars = get().records.filter((r) => r.alphabetId === alphabetId && r.correct);
    return new Set(correctChars.map((r) => r.char)).size;
  },

  hasAnsweredCorrectly: (alphabetId, char) => {
    return get().records.some((r) => r.alphabetId === alphabetId && r.char === char && r.correct);
  },
}));