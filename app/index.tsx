import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getAllAlphabets } from '../data/registry';
import { useI18n } from '../store/useI18n';
import AlphabetCard from '../components/AlphabetCard';
import SettingsModal from '../components/SettingsModal';
import AppHeader from '../components/AppHeader';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const alphabets = getAllAlphabets();

  function goToQuiz(alphabetId: string) {
    router.push({ pathname: '/quiz', params: { alphabetId } });
  }

  return (
    <View style={styles.container}>
      <AppHeader
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenProfile={() => router.push('/profile')}
      />

      <Text style={styles.title}>{t('app.title')}</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {alphabets.map((alphabet) => (
          <AlphabetCard key={alphabet.id} alphabet={alphabet} onPress={goToQuiz} />
        ))}
      </ScrollView>

      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', paddingTop: 60 },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
