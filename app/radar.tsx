import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAllAlphabets } from '../data/registry';
import { useProgress } from '../store/useProgress';
import { useI18n } from '../store/useI18n';
import RadarChart from '../components/RadarChart';

export default function RadarScreen() {
  const { t } = useI18n();
  const getSuccessRate = useProgress((s) => s.getSuccessRate);
  const alphabets = getAllAlphabets();

  const branches = alphabets.map((alphabet) => ({
    label: t(alphabet.labelKey),
    value: getSuccessRate(alphabet.id),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('radar.title')}</Text>
      <RadarChart branches={branches} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
});
