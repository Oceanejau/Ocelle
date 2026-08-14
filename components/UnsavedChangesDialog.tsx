import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  title: string;
  cancelLabel: string;
  discardLabel: string;
  saveLabel: string;
  onCancel: () => void;
  onDiscard: () => void;
  onSave: () => void;
};

export default function UnsavedChangesDialog({
  title, cancelLabel, discardLabel, saveLabel, onCancel, onDiscard, onSave,
}: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.button} onPress={onSave}>
          <Text style={styles.buttonPrimaryText}>{saveLabel}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onDiscard}>
          <Text style={styles.buttonText}>{discardLabel}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>{cancelLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: { width: 280, borderRadius: 20, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 15, marginBottom: 16, textAlign: 'center' },
  button: { paddingVertical: 10, borderRadius: 12, alignItems: 'center', marginBottom: 6 },
  buttonPrimaryText: { color: '#111', fontWeight: '600' },
  buttonText: { color: '#777' },
});
