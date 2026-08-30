import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAlphabetById } from '../data/registry';
import { getEntryChar, getEntryAnswer } from '../data/types';
import { useSettings } from '../store/useSettings';
import { useI18n } from '../store/useI18n';
import { useQuizSession } from '../hooks/useQuizSession';
import { getFontFamily } from '../utils/fonts';
import QuizFeedback from '../components/QuizFeedback';
import QuizInput from '../components/QuizInput';
import AppHeader from '../components/AppHeader';
import SettingsModal from '../components/SettingsModal';
import AutoCheckTipBubble from '../components/AutoCheckTipBubble';

export default function QuizScreen() {
  const { alphabetId, cycleStart, cycleEnd } = useLocalSearchParams<{
    alphabetId: string; cycleStart?: string; cycleEnd?: string;
  }>();
  const alphabet = getAlphabetById(alphabetId);
  const { settings } = useSettings();
  const { t } = useI18n();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!alphabet) return null;

  const entries = cycleStart != null && cycleEnd != null
    ? alphabet.entries.slice(Number(cycleStart), Number(cycleEnd))
    : alphabet.entries;

  const { entry, inputValue, feedback, handleChangeText, submitAnswer, questionNumber } =
    useQuizSession(alphabet.id, entries, settings.autoCheck, settings.randomMode);

  const displayFontFamily = alphabet.forcedFontFamily ?? getFontFamily(settings.fontId);

  return (
    <View style={styles.container}>
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} onBack={() => router.back()} />
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AutoCheckTipBubble />

      <View style={{ flex: 2 }} />
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <QuizFeedback
          char={getEntryChar(entry)}
          fontFamily={displayFontFamily}
          state={feedback}
          expectedLabel={t('quiz.expectedAnswer', { expected: getEntryAnswer(entry) })}
          givenLabel={t('quiz.yourAnswer', { given: inputValue })}
        />
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ alignItems: 'center' }}>
        <QuizInput
          value={inputValue}
          onChangeText={handleChangeText}
          onSubmit={submitAnswer}
          autoCheck={settings.autoCheck}
          placeholder={t('quiz.placeholder')}
          okLabel={t('quiz.ok')}
          fontFamily={getFontFamily(settings.fontIdLatin)}
          focusKey={questionNumber}
        />
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 3 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', alignItems: 'center' },
});