import React, { useRef, useState } from 'react';
import { Pressable, Text, View, Animated, StyleSheet } from 'react-native';
import { AlphabetDefinition } from '../data/types';
import { useI18n } from '../store/useI18n';

type Props = {
  alphabet: AlphabetDefinition;
  onPress: (id: string) => void;
};

export default function AlphabetCard({ alphabet, onPress }: Props) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const shine = useRef(new Animated.Value(0)).current;

  function handleHoverIn() {
    setHovered(true);
    shine.setValue(0);
    Animated.timing(shine, { toValue: 1, duration: 650, useNativeDriver: false }).start();
  }

  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(alphabet.id)}
      onHoverIn={handleHoverIn}
      onHoverOut={() => setHovered(false)}
    >
      <View
        style={{ pointerEvents: 'none'}}
        style={[
          styles.glow,
          { backgroundColor: `rgba(${alphabet.themeColor}, ${hovered ? 0.16 : 0})` },
        ]}
      />
      {hovered && (
        <Animated.View
          style={{ pointerEvents: 'none'}}
          style={[
            styles.shine,
            {
              transform: [{
                translateX: shine.interpolate({ inputRange: [0, 1], outputRange: [-140, 140] }),
              }],
            },
          ]}
        />
      )}
      <Text style={styles.preview}>{alphabet.preview}</Text>
      <Text style={styles.label}>{t(alphabet.labelKey)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 140,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    /*shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },*/
    elevation: 2,
  },
  glow: { ...StyleSheet.absoluteFillObject, borderRadius: 24 },
  shine: {
    position: 'absolute',
    top: -40,
    width: 40,
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.35)',
    transform: [{ rotate: '20deg' }],
  },
  preview: { fontSize: 32, fontWeight: '600', marginBottom: 8 },
  label: { fontSize: 14, color: '#555' },
});
