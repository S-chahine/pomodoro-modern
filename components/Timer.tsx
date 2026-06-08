import { TIMER_SUBTITLES } from "@/constants/timer";
import type { TimerMode, TimerStatus } from "@/types/timer";
import ProgressRing from "./ProgressRing";
import TimerDisplay from "./TimerDisplay";
import { View } from "react-native";

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

  const formattedTime = formatTime(timeRemaining);
  
  return (
    <View className="h-80 w-80 items-center justify-center rounded-full bg-background-50">
        <ProgressRing progress={progress} mode={mode}>
        <TimerDisplay
        time={formattedTime}
        mode={mode}
        isRunning={status === "running"}
      />
    </ProgressRing>
    </View>
  );
};

export default Timer;