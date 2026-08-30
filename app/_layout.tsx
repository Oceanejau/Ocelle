import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useSettings } from '../store/useSettings';
import { useProgress } from '../store/useProgress';
import { useXp } from '../store/useXp';
import { useDailyChallenges } from '../store/useDailyChallenges';
import { useCycleProgress } from '../store/useCycleProgress';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Hittite: require('../assets/fonts/Hittite.ttf'),
  });

  const hydrateSettings = useSettings((s) => s.hydrate);
  const hydrateProgress = useProgress((s) => s.hydrate);
  const hydrateXp = useXp((s) => s.hydrate);
  const hydrateDaily = useDailyChallenges((s) => s.hydrate);
  const hydrateCycles = useCycleProgress((s) => s.hydrate);

  useEffect(() => {
    hydrateSettings();
    hydrateProgress();
    hydrateXp();
    hydrateDaily();
    hydrateCycles();
  }, []);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}