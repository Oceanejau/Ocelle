import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  autoCheck: boolean;
  placeholder: string;
  okLabel: string;
  fontFamily?: string;
  focusKey?: number;
};

export default function QuizInput({
  value, onChangeText, onSubmit, autoCheck, placeholder, okLabel, fontFamily, focusKey,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        key={focusKey}
        style={[styles.input, fontFamily ? { fontFamily } : null]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
      {!autoCheck && (
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>{okLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 12 },
  input: {
    width: 220, borderRadius: 18, backgroundColor: '#f4f4f6',
    paddingVertical: 12, paddingHorizontal: 18, textAlign: 'center', fontSize: 18,
  },
  button: { borderRadius: 18, backgroundColor: '#111', paddingVertical: 12, paddingHorizontal: 28 },
  buttonText: { color: '#fff', fontWeight: '600' },
});