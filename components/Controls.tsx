import type { TimerMode, TimerStatus } from "@/types/timer";
import {
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import { Pressable, View } from "react-native";

type ControlsProps = {
  status: TimerStatus;
  mode: TimerMode;
  soundEnabled: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleSound: () => void;
};

const Controls = ({
  status,
  mode,
  soundEnabled,
  onStart,
  onPause,
  onReset,
  onToggleSound,
}: ControlsProps) => {
  const isRunning = status === "running";
  const isDone = status === "done";

  const mainButtonClass =
    mode === "work" ? "bg-primary-500" : "bg-secondary-500";

  return (
    <View className="flex-row items-center gap-5">
      <Pressable
        onPress={onReset}
        className="h-12 w-12 items-center justify-center rounded-full bg-background-100"
      >
        <RotateCcw size={22} color="#71717a" />
      </Pressable>

      <Pressable
        disabled={isDone}
        onPress={isRunning ? onPause : onStart}
        className={`h-20 w-20 items-center justify-center rounded-full ${mainButtonClass} ${
          isDone ? "opacity-50" : "opacity-100"
        }`}
      >
        {isRunning ? (
          <Pause size={34} color="white" />
        ) : (
          <Play size={34} color="white" />
        )}
      </Pressable>

      <Pressable
        onPress={onToggleSound}
        className="h-12 w-12 items-center justify-center rounded-full bg-background-100"
      >
        {soundEnabled ? (
          <Volume2 size={22} color="#71717a" />
        ) : (
          <VolumeX size={22} color="#71717a" />
        )}
      </Pressable>
    </View>
  );
};

export default Controls;