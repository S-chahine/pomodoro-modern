import Controls from "@/components/Controls";
import Mode from "@/components/Mode";
import SessionCounter from "@/components/SessionCounter";
import Timer from "@/components/Timer";
import { DEFAULT_DURATIONS } from "@/constants/timer";
import type { TimerMode, TimerStatus, TimerDurations } from "@/types/timer";
import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";

export default function HomeScreen() {
  const [durations, setDurations] =
    useState<TimerDurations>(DEFAULT_DURATIONS);

  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeRemaining, setTimeRemaining] = useState(durations.work * 60);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const totalTime = durations[mode] * 60;

  const progress =
    totalTime === 0 ? 0 : ((totalTime - timeRemaining) / totalTime) * 100;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (status === "running" && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (status === "running" && timeRemaining === 0) {
      setStatus("done");

      if (mode === "work") {
        setCompletedSessions((prev) => Math.min(prev + 1, 4));
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeRemaining, status, mode]);

  const handleStart = () => {
    if (timeRemaining === 0) return;
    setStatus("running");
  };

  const handlePause = () => {
    setStatus("paused");
  };

  const handleResetTimer = () => {
    setStatus("idle");
    setTimeRemaining(durations[mode] * 60);
  };

  const handleModeChange = (newMode: TimerMode) => {
    if (status === "running") {
      Alert.alert(
        "Timer Running",
        "Please pause or reset the timer before switching modes."
      );
      return;
    }

    setMode(newMode);
    setStatus("idle");
    setTimeRemaining(durations[newMode] * 60);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 bg-background-0 px-4">
      <View className="items-center gap-2">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary-100">
          <Text className="text-2xl">⏱️</Text>
        </View>

        <Text className="text-2xl font-bold text-typography-900">
          Pomodoro Timer
        </Text>
      </View>

      <Mode
        mode={mode}
        durations={durations}
        handleModeChange={handleModeChange}
        disabled={status === "running"}
      />

      <Timer
        timeRemaining={timeRemaining}
        mode={mode}
        status={status}
        progress={progress}
      />

      <Controls
        status={status}
        mode={mode}
        soundEnabled={soundEnabled}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleResetTimer}
        onToggleSound={handleToggleSound}
      />

      <SessionCounter completed={completedSessions} />

      <Text className="max-w-xs text-center text-xs text-typography-500">
        Complete 4 focus sessions to earn a long break. Stay productive!
      </Text>
    </View>
  );
}