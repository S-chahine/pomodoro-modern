import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ProgressRingProps } from "@/types/progressRing";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing = ({
  progress,
  mode,
  size = 320,
  strokeWidth = 8,
  children,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 500,
    });
  }, [progress, animatedProgress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (animatedProgress.value / 100) * circumference;

    return {
      strokeDashoffset,
    };
  });

  const progressColor = mode === "work" ? "#F25A5A" : "#33CCAD";
  const backgroundRingColor = "#262626";

  return (
    <View
      style={{ width: size, height: size }}
      className="relative items-center justify-center"
    >
      {/* Soft glow behind the ring */}
      <View
        className={`absolute rounded-full ${
          mode === "work" ? "bg-primary-500/20" : "bg-secondary-500/20"
        }`}
        style={{
          width: size,
          height: size,
          opacity: 0.5,
        }}
      />

      <Svg
        width={size}
        height={size}
        style={{
          position: "absolute",
          transform: [{ rotate: "-90deg" }],
        }}
      >
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundRingColor}
          strokeWidth={strokeWidth}
          opacity={0.35}
        />

        {/* Animated progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* Timer text goes inside the ring */}
      <View className="absolute inset-0 items-center justify-center">
        {children}
      </View>
    </View>
  );
};

export default ProgressRing;