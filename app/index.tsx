import Controls from "@/components/Controls";
import Mode from "@/components/Mode";
import SessionCounter from "@/components/SessionCounter";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import { Timer as TimerIcon, Settings2, ChevronUp, ChevronDown } from "lucide-react-native";
import { CLASSIC_DURATIONS, presetDurations } from "@/constants/timer";
import { type TimerMode, type TimerStatus, type TimerDurations, type PresetMode } from "@/types/timer";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {


  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "#8C8C8C" : "#737373";

  const [durations, setDurations] =
    useState<TimerDurations>(CLASSIC_DURATIONS);

  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeRemaining, setTimeRemaining] = useState(durations.work * 60);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [presetMode, setPresetMode] = useState<PresetMode>("classic");

  const { playClick, playComplete } = useSound();
  const [isOpen, setIsOpen] = useState(false);

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

      if (soundEnabled) {
        playComplete();
      }

      if (mode === "work") {
        setCompletedSessions((prev) => Math.min(prev + 1, 4));
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeRemaining, status, mode, presetMode]);


  const handleStart = () => {
    if (timeRemaining === 0) return;

    if (soundEnabled) {
      playClick();
    }

    setStatus("running");
  };

  const handlePause = () => {
    if (soundEnabled) {
      playClick();
    }
    setStatus("paused");
  };

  const handleResetTimer = () => {
    if (soundEnabled) {
      playClick();
    }
    setStatus("idle");
    setTimeRemaining(durations[mode] * 60);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setStatus("idle");
    setTimeRemaining(durations[newMode] * 60);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };


  const handlePresetModeChange = (newPresetMode: PresetMode) => {
    setPresetMode(newPresetMode);
    setDurations(presetDurations[newPresetMode]);
  }

  return (
<ScrollView
  className="flex-1 bg-background-0"
  contentContainerStyle={{
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 16,
    paddingVertical: 40,
  }}
  showsVerticalScrollIndicator={true}
><View className="flex flex-row items-center gap-2">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20">
            <TimerIcon color="#F25A5A" />
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

      <Button action="primary" variant="link" size="lg" onPress={() => setIsOpen((prev) => !prev)}>
        <Settings2 size={18} color={iconColor} />
        <Text className="text-lg font-semibold text-typography-500">
          Settings
        </Text>
        {isOpen ? (
          <ChevronUp size={18} color={iconColor} />
        ) : (
          <ChevronDown size={18} color={iconColor} />
        )}
      </Button>
      {isOpen &&
        <Settings
          presetMode={presetMode}
          handlePresetModeChange={handlePresetModeChange}
        />}


      <Text className="max-w-xs text-center text-xs text-typography-500">
        Complete 4 focus sessions to earn a long break. Stay productive!
      </Text>



    </ScrollView>
  );
}