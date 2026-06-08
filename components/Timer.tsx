import { TIMER_SUBTITLES } from "@/constants/timer";
import type { TimerMode, TimerStatus } from "@/types/timer";
import { Text, View } from "react-native";

type TimerProps = {
  timeRemaining: number;
  mode: TimerMode;
  status: TimerStatus;
  progress: number;
};

const Timer = ({ timeRemaining, mode, status, progress }: TimerProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const ringColor = mode === "work" ? "border-primary-500" : "border-secondary-500";

  return (
    <View className="h-80 w-80 items-center justify-center rounded-full bg-background-50">
      <View
        className={`h-72 w-72 items-center justify-center rounded-full border-8 ${ringColor}`}
      >
        <Text className="font-mono text-6xl font-bold text-typography-900">
          {formatTime(timeRemaining)}
        </Text>

        <Text className="mt-3 text-sm uppercase tracking-widest text-typography-500">
          {TIMER_SUBTITLES[mode]}
        </Text>

        <Text className="mt-2 text-xs text-typography-400">
          {Math.round(progress)}%
        </Text>
      </View>
    </View>
  );
};

export default Timer;