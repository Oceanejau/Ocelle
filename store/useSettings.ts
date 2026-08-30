import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLanguage } from '../i18n';
import { detectDeviceLanguage } from '../utils/detectLanguage';

const STORAGE_KEY = 'ocelle.settings';

export type Settings = {
  autoCheck: boolean;
  fontId: string; // police utilisée pour les caractères non-latins (kana, kanji, hangul...)
  fontIdLatin: string; // police utilisée pour le romaji / texte latin
  appLanguage: AppLanguage;
  randomMode: boolean; // true = ignorer le tutoriel séquentiel, tirage aléatoire dès le début
};

function buildDefaultSettings(): Settings {
  return {
    autoCheck: false,
    fontId: 'system',
    fontIdLatin: 'system',
    appLanguage: detectDeviceLanguage(),
    randomMode: false,
  };
}

type SettingsState = {
  settings: Settings;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  applySettings: (next: Settings) => Promise<void>;
};

export const useSettings = create<SettingsState>((set) => ({
  settings: buildDefaultSettings(),
  hydrated: false,
  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : buildDefaultSettings();
    set({ settings: parsed, hydrated: true });
  },
  applySettings: async (next: Settings) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set({ settings: next });
  },
}));
