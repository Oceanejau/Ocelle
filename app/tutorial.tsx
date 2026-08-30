import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAlphabetById } from '../data/registry';
import { useI18n } from '../store/useI18n';
import AppHeader from '../components/AppHeader';
import SettingsModal from '../components/SettingsModal';

export default function TutorialScreen() {
  const { alphabetId } = useLocalSearchParams<{ alphabetId: string }>();
  const alphabet = getAlphabetById(alphabetId);
  const router = useRouter();
  const { t } = useI18n();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!alphabet || !alphabet.tutorialKey) return null;

  function proceed() {
    router.replace({ pathname: '/learn', params: { alphabetId, cycleStart: '0' } });
  }

  return (
    <View style={styles.container}>
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} onBack={() => router.back()} />
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('tutorial.title')}</Text>
        <Text style={styles.body}>{t(alphabet.tutorialKey)}</Text>
        <Pressable style={styles.button} onPress={proceed}>
          <Text style={styles.buttonText}>{t('tutorial.start')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { paddingTop: 110, paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 22, color: '#444', marginBottom: 28 },
  button: { borderRadius: 18, backgroundColor: '#111', paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});