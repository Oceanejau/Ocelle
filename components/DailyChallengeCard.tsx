import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChallengeTemplate } from '../data/challenges';
import { useI18n } from '../store/useI18n';

type Props = {
  template: ChallengeTemplate;
  doneCount: number;
  targetCount: number;
  isComplete: boolean;
  isClaimed: boolean;
  onClaim: () => void;
};

export default function DailyChallengeCard({
  template, doneCount, targetCount, isComplete, isClaimed, onClaim,
}: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{t(template.labelKey)}</Text>
        <Text style={styles.progress}>{doneCount} / {targetCount} · +{template.xpReward} XP</Text>
      </View>

      {isClaimed ? (
        <Text style={styles.claimedText}>✓</Text>
      ) : (
        <Pressable
          style={[styles.button, !isComplete && styles.buttonDisabled]}
          disabled={!isComplete}
          onPress={onClaim}
        >
          <Text style={styles.buttonText}>{t('challenges.claim')}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  progress: { fontSize: 12, color: '#999' },
  button: { borderRadius: 14, backgroundColor: '#111', paddingVertical: 8, paddingHorizontal: 14 },
  buttonDisabled: { backgroundColor: '#ddd' },
  buttonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  claimedText: { color: '#2ecc71', fontSize: 18, fontWeight: '700' },
});
