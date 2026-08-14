import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import SettingsGearButton from './SettingsGearButton';

type Props = {
  onOpenSettings: () => void;
  onBack?: () => void;
  onOpenProfile?: () => void;
};

export default function AppHeader({ onOpenSettings, onBack, onOpenProfile }: Props) {
  const profileScale = useRef(new Animated.Value(1)).current;
  const handleProfileHover = () => {
    Animated.sequence([
      Animated.spring(profileScale, {
        toValue: 1.15,
        useNativeDriver: false,
        friction: 4,
        tension: 180,
      }),
      Animated.spring(profileScale, {
        toValue: 1,
        useNativeDriver: false,
        friction: 5,
        tension: 150,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={styles.icon}>←</Text>
          </Pressable>
        )}
      </View>
      <View style={[styles.side, styles.sideRight]}>
        {onOpenProfile && (
          <Pressable onPress={onOpenProfile} hitSlop={12} style={styles.spacingRight}>
            <Text style={styles.icon}>👤</Text>
          </Pressable>
        )}
        <SettingsGearButton onPress={onOpenSettings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  side: { flexDirection: 'row', alignItems: 'center' },
  sideRight: { gap: 16 },
  spacingRight: { marginRight: 4 },
  icon: { fontSize: 22 },
});
