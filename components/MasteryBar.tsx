import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlphabetDefinition } from '../data/types';
import { useI18n } from '../store/useI18n';

type Props = { alphabet: AlphabetDefinition; successRate: number };

export default function MasteryBar({ alphabet, successRate }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{t(alphabet.labelKey)}</Text>
        <Text style={styles.value}>{successRate}%</Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${successRate}%`, backgroundColor: `rgb(${alphabet.themeColor})` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontSize: 14 },
  value: { fontSize: 13, color: '#999' },
  track: { height: 8, borderRadius: 5, backgroundColor: '#eee', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});
