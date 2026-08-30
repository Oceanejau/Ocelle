import React, { useRef, useState } from 'react';
import { Pressable, Text, View, Animated, StyleSheet } from 'react-native';
import { useI18n } from '../store/useI18n';

type CardData = {
  id: string;
  labelKey: string;
  preview: string;
  themeColor: string;
  forcedFontFamily?: string;
};

type Props = {
  item: CardData;
  onPress: (id: string) => void;
};

export default function AlphabetCard({ item, onPress }: Props) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const shine = useRef(new Animated.Value(0)).current;

  function handleHoverIn() {
    setHovered(true);
    shine.setValue(0);
    Animated.timing(shine, { toValue: 1, duration: 650, useNativeDriver: true }).start();
  }

  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(item.id)}
      onHoverIn={handleHoverIn}
      onHoverOut={() => setHovered(false)}
    >
      <View
        pointerEvents="none"
        style={[styles.glow, { backgroundColor: `rgba(${item.themeColor}, ${hovered ? 0.16 : 0})` }]}
      />
      {hovered && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shine,
            { transform: [{ translateX: shine.interpolate({ inputRange: [0, 1], outputRange: [-140, 140] }) }] },
          ]}
        />
      )}
      <Text style={[styles.preview, item.forcedFontFamily ? { fontFamily: item.forcedFontFamily } : null]}>
        {item.preview}
      </Text>
      <Text style={styles.label}>{t(item.labelKey)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140, height: 140, borderRadius: 24, backgroundColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center', margin: 10, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  glow: { ...StyleSheet.absoluteFillObject, borderRadius: 24 },
  shine: {
    position: 'absolute', top: -40, width: 40, height: 220,
    backgroundColor: 'rgba(255,255,255,0.35)', transform: [{ rotate: '20deg' }],
  },
  preview: { fontSize: 32, fontWeight: '600', marginBottom: 8 },
  label: { fontSize: 14, color: '#555' },
});