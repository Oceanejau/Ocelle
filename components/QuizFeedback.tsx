import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type FeedbackState = 'idle' | 'correct' | 'incorrect';

type Props = {
  char: string;
  fontFamily: string;
  state: FeedbackState;
  expected?: string;
  given?: string;
  expectedLabel?: string;
  givenLabel?: string;
};

export default function QuizFeedback({
  char, fontFamily, state, expected, given, expectedLabel, givenLabel,
}: Props) {
  const borderColor = state === 'correct' ? '#2ecc71' : state === 'incorrect' ? '#e74c3c' : 'transparent';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.frame, { borderColor }]}>
        <Text style={[styles.char, { fontFamily }]}>{char}</Text>
      </View>
      {state === 'incorrect' && (
        <View style={styles.errorTexts}>
          <Text style={styles.errorLine}>{expectedLabel}</Text>
          <Text style={styles.givenLine}>{givenLabel}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  frame: {
    borderWidth: 3,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  char: { fontSize: 48, fontWeight: '600' },
  errorTexts: { alignItems: 'center', marginBottom: 8, gap: 2 },
  errorLine: { color: '#e74c3c', fontSize: 13 },
  givenLine: { color: '#bbb', fontSize: 12 },
});
