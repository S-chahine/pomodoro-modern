import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { useEffect } from 'react';

export default function ThumbsUp({ trigger }: { trigger: boolean }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    if (!trigger) return;

    // Reset
    scale.value = 0;
    opacity.value = 0;
    translateY.value = 20;

    // Animate in with a spring bounce, then fade out
    scale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 160 }),
      withSpring(1,   { damping: 8, stiffness: 200 }),
      withDelay(1500, withTiming(0, { duration: 500 }))
    );
    opacity.value = withSequence(
      withTiming(1, { duration: 150 }),
      withDelay(900, withTiming(0, { duration: 300 }))
    );
    translateY.value = withSequence(
      withSpring(0, { damping: 6, stiffness: 200 }),
      withDelay(900, withTiming(20, { duration: 300 }))
    );
  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ alignItems: 'center' }, animatedStyle]}>
      <Text style={{ fontSize: 64 }}>👍</Text>
    </Animated.View>
  );
}