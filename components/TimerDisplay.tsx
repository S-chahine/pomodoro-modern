import { TIMER_SUBTITLES } from "@/constants/timer";
import type { TimerMode } from "@/types/timer";
import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type TimerDisplayProps = {
  time: string;
  mode: TimerMode;
  isRunning: boolean;
};

const TimerDisplay = ({ time, mode, isRunning }: TimerDisplayProps) => {
  const scale = useSharedValue(1);
  const subtitleOpacity = useSharedValue(1);

  useEffect(() => {
    if (isRunning) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        false
      );
    } else {
      scale.value = withTiming(1, { duration: 200 });
    }
  }, [isRunning, scale]);

  useEffect(() => {
    subtitleOpacity.value = 0;

    subtitleOpacity.value = withTiming(1, {
      duration: 400,
    });
  }, [mode, subtitleOpacity]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedSubtitleStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleOpacity.value,
    };
  });

  return (
    <Animated.View
      style={animatedContainerStyle}
      className="items-center gap-3"
    >
      <Text
        className={`font-mono text-6xl font-bold tracking-tight ${
          mode === "work" ? "text-primary-500" : "text-secondary-500"
        }`}
      >
        {time}
      </Text>

      <Animated.View style={animatedSubtitleStyle}>
        <Text className="text-sm uppercase tracking-widest text-typography-500">
          {TIMER_SUBTITLES[mode]}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default TimerDisplay;