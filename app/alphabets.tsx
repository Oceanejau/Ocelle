
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLanguageModuleById } from '../data/registry';
import { useI18n } from '../store/useI18n';
import { getNextDestination } from '../utils/navigation';
import AlphabetCard from '../components/AlphabetCard';
import AppHeader from '../components/AppHeader';
import SettingsModal from '../components/SettingsModal';

export default function AlphabetsScreen() {
  const { languageId } = useLocalSearchParams<{ languageId: string }>();
  const language = getLanguageModuleById(languageId);
  const router = useRouter();
  const { t } = useI18n();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!language) return null;

  return (
    <View style={styles.container}>
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} onBack={() => router.back()} />
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <Text style={styles.title}>{t(language.labelKey)}</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {language.alphabets.map((alphabet) => (
          <AlphabetCard
            key={alphabet.id}
            item={alphabet}
            onPress={(id) => router.push(getNextDestination(id))}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', paddingTop: 60 },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 40 },
});