import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dailyChallengeTemplates, getTodayTargetChars } from '../data/challenges';
import { getTodayDateSeed } from '../utils/today';
import { useXp } from './useXp';

const STORAGE_KEY = 'alpha-trainer.daily-challenges';

type DailyState = {
  date: string;
  progress: Record<string, string[]>; // templateId -> caractères distincts réussis aujourd'hui
  claimed: string[]; // templateId déjà réclamés aujourd'hui
};

type DailyChallengesState = DailyState & {
  hydrate: () => Promise<void>;
  recordCorrectChar: (alphabetId: string, char: string, level: number) => Promise<void>;
  claim: (templateId: string) => Promise<boolean>;
  isComplete: (templateId: string, level: number) => boolean;
};

function emptyState(): DailyState {
  return { date: getTodayDateSeed(), progress: {}, claimed: [] };
}

async function persist(state: DailyState) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const useDailyChallenges = create<DailyChallengesState>((set, get) => ({
  ...emptyState(),

  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: DailyState = stored ? JSON.parse(stored) : emptyState();
    // Un nouveau jour est arrivé : on repart sur une progression vide.
    set(parsed.date === getTodayDateSeed() ? parsed : emptyState());
  },

  recordCorrectChar: async (alphabetId, char, level) => {
    const { date, progress } = get();
    const dateSeed = getTodayDateSeed();
    const matching = dailyChallengeTemplates.filter((tpl) => tpl.alphabetId === alphabetId);

    const nextProgress = { ...progress };
    matching.forEach((tpl) => {
      const targetChars = getTodayTargetChars(tpl, dateSeed, level);
      if (!targetChars.includes(char)) return;
      const known = new Set(nextProgress[tpl.id] ?? []);
      known.add(char);
      nextProgress[tpl.id] = Array.from(known);
    });

    const nextState = { date, progress: nextProgress, claimed: get().claimed };
    await persist(nextState);
    set(nextState);
  },

  isComplete: (templateId, level) => {
    const template = dailyChallengeTemplates.find((t) => t.id === templateId);
    if (!template) return false;
    const target = getTodayTargetChars(template, get().date, level);
    const done = get().progress[templateId]?.length ?? 0;
    return done >= target.length;
  },

  claim: async (templateId) => {
    const template = dailyChallengeTemplates.find((t) => t.id === templateId);
    if (!template || get().claimed.includes(templateId)) return false;

    const uniqueKey = `daily-${get().date}-${templateId}`;
    const awarded = await useXp.getState().awardXp(template.xpReward, uniqueKey);
    if (!awarded) return false;

    const nextState = { ...get(), claimed: [...get().claimed, templateId] };
    await persist(nextState);
    set(nextState);
    return true;
  },
}));
