import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getAllAlphabets } from '../data/registry';
import { dailyChallengeTemplates, getTodayTargetChars } from '../data/challenges';
import { useXp } from '../store/useXp';
import { useProgress } from '../store/useProgress';
import { useDailyChallenges } from '../store/useDailyChallenges';
import { useI18n } from '../store/useI18n';
import { computeLevel } from '../utils/xp';
import AppHeader from '../components/AppHeader';
import SettingsModal from '../components/SettingsModal';
import XpBar from '../components/XpBar';
import MasteryBar from '../components/MasteryBar';
import DailyChallengeCard from '../components/DailyChallengeCard';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const totalXp = useXp((s) => s.totalXp);
  const getSuccessRate = useProgress((s) => s.getSuccessRate);
  const { date, progress, claimed, claim, isComplete } = useDailyChallenges();
  const alphabets = getAllAlphabets();
  const level = computeLevel(totalXp);

  return (
    <View style={styles.container}>
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} onBack={() => router.back()} />
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('profile.title')}</Text>
        <XpBar totalXp={totalXp} />

        <Text style={styles.sectionTitle}>{t('profile.mastery')}</Text>
        {alphabets.map((alphabet) => (
          <MasteryBar key={alphabet.id} alphabet={alphabet} successRate={getSuccessRate(alphabet.id)} />
        ))}

        <Text style={styles.sectionTitle}>{t('profile.dailyChallenges')}</Text>
        {dailyChallengeTemplates.map((tpl) => {
          const target = getTodayTargetChars(tpl, date, level).length;
          const done = progress[tpl.id]?.length ?? 0;
          return (
            <DailyChallengeCard
              key={tpl.id}
              template={tpl}
              doneCount={done}
              targetCount={target}
              isComplete={isComplete(tpl.id, level)}
              isClaimed={claimed.includes(tpl.id)}
              onClaim={() => claim(tpl.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { paddingTop: 110, paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#777', marginTop: 12, marginBottom: 12 },
});
