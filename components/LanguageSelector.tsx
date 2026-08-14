import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AppLanguage } from '../i18n';

const options: { id: AppLanguage; label: string }[] = [
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
  { id: 'jp', label: '日本語' },
];

type Props = {
  value: AppLanguage;
  onChange: (lang: AppLanguage) => void;
  label: string;
};

export default function LanguageSelector({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value) ?? options[0];

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.trigger} onPress={() => setOpen((o) => !o)}>
        <Text style={styles.triggerText}>{selected.label}</Text>
        <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          {options.map((opt) => (
            <Pressable
              key={opt.id}
              style={styles.option}
              onPress={() => { onChange(opt.id); setOpen(false); }}
            >
              <Text style={opt.id === value ? styles.optionTextActive : styles.optionText}>
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: 12 },
  label: { fontSize: 13, color: '#777', marginBottom: 6 },
  trigger: {
    borderRadius: 18,
    backgroundColor: '#f4f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triggerText: { fontSize: 15 },
  chevron: { fontSize: 11, color: '#999' },
  dropdown: { borderRadius: 18, backgroundColor: '#fff', marginTop: 8, overflow: 'hidden' },
  option: { paddingVertical: 10, paddingHorizontal: 16 },
  optionText: { color: '#333' },
  optionTextActive: { color: '#111', fontWeight: '700' },
});
