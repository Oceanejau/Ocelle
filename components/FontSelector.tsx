import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { availableFonts, getFontFamily } from '../utils/fonts';
import PreviewBox from './PreviewBox';

type Props = {
  value: string;
  onChange: (fontId: string) => void;
  label: string;
  sampleText: string;
};

export default function FontSelector({ value, onChange, label, sampleText }: Props) {
  const [open, setOpen] = useState(false);
  const selected = availableFonts.find((f) => f.id === value) ?? availableFonts[0];

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.trigger} onPress={() => setOpen((o) => !o)}>
        <Text style={styles.triggerText}>{selected.label}</Text>
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          {availableFonts.map((font) => (
            <Pressable
              key={font.id}
              style={styles.option}
              onPress={() => { onChange(font.id); setOpen(false); }}
            >
              <Text>{font.label}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <PreviewBox sampleText={sampleText} fontFamily={getFontFamily(selected.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: 20 },
  label: { fontSize: 13, color: '#777', marginBottom: 6 },
  trigger: {
    borderRadius: 18,
    backgroundColor: '#f4f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  triggerText: { fontSize: 15 },
  dropdown: { borderRadius: 18, backgroundColor: '#fff', marginBottom: 8, overflow: 'hidden' },
  option: { paddingVertical: 10, paddingHorizontal: 16 },
});
