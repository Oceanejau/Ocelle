import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  sampleText: string;
  fontFamily: string;
};

export default function PreviewBox({ sampleText, fontFamily }: Props) {
  return (
    <View style={styles.box}>
      <Text style={[styles.text, { fontFamily }]}>{sampleText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 16,
    backgroundColor: '#f4f4f6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: { fontSize: 28 },
});
