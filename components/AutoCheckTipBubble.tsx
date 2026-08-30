import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, Pressable, StyleSheet } from 'react-native';
import { useI18n } from '../store/useI18n';

export default function AutoCheckTipBubble() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    const timer = setTimeout(dismiss, 5000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setVisible(false));
  }

  if (!visible) return null;

  return (
    <Animated.View style={[styles.bubble, { opacity }]}>
      <Pressable onPress={dismiss} style={styles.inner}>
        <Text style={styles.text}>{t('quiz.autoCheckTip')}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bubble: { position: 'absolute', top: 100, alignSelf: 'center', zIndex: 20, backgroundColor: '#111', borderRadius: 16, maxWidth: 320 },
  inner: { paddingVertical: 10, paddingHorizontal: 16 },
  text: { color: '#fff', fontSize: 13, textAlign: 'center' },
});