import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { computeLevel, xpIntoCurrentLevel, xpNeededForNextLevel } from '../utils/xp';

type Props = { totalXp: number };

export default function XpBar({ totalXp }: Props) {
  const level = computeLevel(totalXp);
  const into = xpIntoCurrentLevel(totalXp);
  const needed = xpNeededForNextLevel();
  const ratio = into / needed;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.level}>Niveau {level}</Text>
        <Text style={styles.xpText}>{into} / {needed} XP</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  level: { fontSize: 16, fontWeight: '700' },
  xpText: { fontSize: 13, color: '#999' },
  track: { height: 10, borderRadius: 6, backgroundColor: '#eee', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6, backgroundColor: '#2ecc71' },
});
