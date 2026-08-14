import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useSettings } from '../store/useSettings';
import { useProgress } from '../store/useProgress';
import { useXp } from '../store/useXp';
import { useDailyChallenges } from '../store/useDailyChallenges';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSansJP: require('../assets/fonts/NotoSansJP-Regular.ttf'),
    NotoSerifJP: require('../assets/fonts/NotoSerifJP-Regular.ttf'),
    YuGothic: require('../assets/fonts/YuGothic-Regular.ttf'),
  });

  const hydrateSettings = useSettings((s) => s.hydrate);
  const hydrateProgress = useProgress((s) => s.hydrate);
  const hydrateXp = useXp((s) => s.hydrate);
  const hydrateDaily = useDailyChallenges((s) => s.hydrate);

  useEffect(() => {
    hydrateSettings();
    hydrateProgress();
    hydrateXp();
    hydrateDaily();
  }, []);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
