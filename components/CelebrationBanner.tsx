import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const CelebrationBanner = () => {
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 250 });
    scale.value = withSequence(
      withTiming(1.15, { duration: 250 }),
      withTiming(1, { duration: 200 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={animatedStyle}
      className="rounded-2xl border border-primary-500 bg-primary-500/10 px-5 py-3"
    >
      <Text className="text-center text-lg font-bold text-primary-500">
        👍 Great work! Long break earned.
      </Text>
    </Animated.View>
  );
};

export default CelebrationBanner;