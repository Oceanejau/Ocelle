import React, { useRef } from 'react';
import { Pressable, Text, Animated } from 'react-native';

type Props = { onPress: () => void };

export default function SettingsGearButton({ onPress }: Props) {
  const rotation = useRef(new Animated.Value(0)).current;

  function animateTo(value: number) {
    Animated.spring(rotation, { toValue: value, useNativeDriver: false, friction: 5 }).start();
  }

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '35deg'] });

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => animateTo(1)}
      onHoverOut={() => animateTo(0)}
      hitSlop={12}
    >
      <Animated.Text style={{ fontSize: 24, transform: [{ rotate: spin }] }}>
        ⚙️
      </Animated.Text>
    </Pressable>
  );
}
