import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAlphabetById } from '../data/registry';
import { getEntryChar, getEntryAnswer, isKanjiEntry } from '../data/types';
import { getCycleSlice } from '../utils/cycles';
import { useCycleProgress } from '../store/useCycleProgress';
import { useSettings } from '../store/useSettings';
import { useI18n } from '../store/useI18n';
import { getFontFamily } from '../utils/fonts';
import AppHeader from '../components/AppHeader';
import SettingsModal from '../components/SettingsModal';

export default function LearnScreen() {
  const { alphabetId, cycleStart } = useLocalSearchParams<{ alphabetId: string; cycleStart: string }>();
  const alphabet = getAlphabetById(alphabetId);
  const { settings } = useSettings();
  const { t } = useI18n();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [position, setPosition] = useState(0);

  if (!alphabet) return null;

  const start = Number(cycleStart ?? 0);
  const cycle = getCycleSlice(alphabet.entries, start);
  const entry = cycle[position];
  const isLast = position === cycle.length - 1;
  const fontFamily = alphabet.forcedFontFamily ?? getFontFamily(settings.fontId);

  async function finishCycle() {
    await useCycleProgress.getState().markIntroduced(alphabetId, start + cycle.length);
    router.replace({
      pathname: '/quiz',
      params: { alphabetId, cycleStart: String(start), cycleEnd: String(start + cycle.length) },
    });
  }

  function goNext() {
    if (isLast) finishCycle();
    else setPosition((p) => p + 1);
  }

  return (
    <View style={styles.container}>
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} onBack={() => router.back()} />
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <View style={styles.content}>
        <Text style={styles.progress}>{position + 1} / {cycle.length}</Text>
        <Text style={[styles.char, { fontFamily }]}>{getEntryChar(entry)}</Text>
        <Text style={styles.reading}>{t('learn.reads')} : {getEntryAnswer(entry)}</Text>

        {isKanjiEntry(entry) && (
          <Text style={styles.meaning}>{t('learn.meaning')} : {entry.meanings.fr.join(', ')}</Text>
        )}

        <Pressable style={styles.button} onPress={goNext}>
          <Text style={styles.buttonText}>{isLast ? t('learn.startQuiz') : t('learn.next')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  progress: { fontSize: 13, color: '#999', marginBottom: 24 },
  char: { fontSize: 72, fontWeight: '600', marginBottom: 20 },
  reading: { fontSize: 20, color: '#333', marginBottom: 8 },
  meaning: { fontSize: 15, color: '#777', marginBottom: 28, textAlign: 'center' },
  button: { borderRadius: 18, backgroundColor: '#111', paddingVertical: 14, paddingHorizontal: 36, marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});