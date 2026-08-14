import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'alpha-trainer.xp';

type XpState = {
  totalXp: number;
  claimedKeys: string[];
  hydrate: () => Promise<void>;
  awardXp: (amount: number, uniqueKey?: string) => Promise<boolean>;
};

export const useXp = create<XpState>((set, get) => ({
  totalXp: 0,
  claimedKeys: [],

  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : { totalXp: 0, claimedKeys: [] };
    set(parsed);
  },

  // Si uniqueKey est fourni, l'XP n'est accordée qu'une seule fois pour cette clé
  // (ex: "mastery-jp-hiragana", "daily-2026-08-09-katakana").
  awardXp: async (amount: number, uniqueKey?: string) => {
    const { totalXp, claimedKeys } = get();
    if (uniqueKey && claimedKeys.includes(uniqueKey)) return false;

    const nextState = {
      totalXp: totalXp + amount,
      claimedKeys: uniqueKey ? [...claimedKeys, uniqueKey] : claimedKeys,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    set(nextState);
    return true;
  },
}));
