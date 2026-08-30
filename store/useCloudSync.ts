import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestAccessToken, uploadSyncBlob, downloadSyncBlob, fetchGoogleEmail } from '../utils/googleDrive';
import { useSettings } from './useSettings';
import { useProgress } from './useProgress';
import { useXp } from './useXp';
import { useDailyChallenges } from './useDailyChallenges';

// Remplace par TON Client ID obtenu sur Google Cloud Console.
const GOOGLE_CLIENT_ID = 'REMPLACE-MOI.apps.googleusercontent.com';
const STORAGE_KEY = 'ocelle.cloud-sync';

type CloudSyncState = {
  connected: boolean;
  email: string | null;
  lastSyncedAt: string | null;
  status: 'idle' | 'syncing' | 'error';
  token: string | null;
  hydrate: () => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  syncNow: () => Promise<void>;
};

function collectLocalState() {
  return {
    settings: useSettings.getState().settings,
    progress: useProgress.getState().records,
    xp: { totalXp: useXp.getState().totalXp, claimedKeys: useXp.getState().claimedKeys },
  };
}

async function applyRemoteState(remote: any) {
  if (!remote) return;
  if (remote.settings) await useSettings.getState().applySettings(remote.settings);
  // Progress et XP sont ré-hydratés directement en écrivant le storage local,
  // puis en ré-appelant hydrate() de chaque store concerné.
  if (remote.progress) await AsyncStorage.setItem('ocelle.progress', JSON.stringify(remote.progress));
  if (remote.xp) await AsyncStorage.setItem('ocelle.xp', JSON.stringify(remote.xp));
  await useProgress.getState().hydrate();
  await useXp.getState().hydrate();
}

export const useCloudSync = create<CloudSyncState>((set, get) => ({
  connected: false,
  email: null,
  lastSyncedAt: null,
  status: 'idle',
  token: null,

  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) set(JSON.parse(stored));
  },

  connect: async () => {
    set({ status: 'syncing' });
    try {
      const token = await requestAccessToken(GOOGLE_CLIENT_ID);
      const email = await fetchGoogleEmail(token);
      const remote = await downloadSyncBlob(token);
      if (remote) await applyRemoteState(remote);

      const nextState = {
        connected: true,
        email,
        token,
        lastSyncedAt: new Date().toISOString(),
        status: 'idle' as const,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      set(nextState);
    } catch (e) {
      set({ status: 'error' });
    }
  },

  disconnect: async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    set({ connected: false, email: null, token: null, lastSyncedAt: null, status: 'idle' });
  },

  syncNow: async () => {
    const { token } = get();
    if (!token) return;
    set({ status: 'syncing' });
    try {
      await uploadSyncBlob(token, collectLocalState());
      const nextState = { lastSyncedAt: new Date().toISOString(), status: 'idle' as const };
      set(nextState);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const merged = { ...(stored ? JSON.parse(stored) : {}), ...nextState };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      set({ status: 'error' });
    }
  },
}));