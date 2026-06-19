import Controls from "@/components/Controls";
import Mode from "@/components/Mode";
import SessionCounter from "@/components/SessionCounter";
import CelebrationBanner from "@/components/CelebrationBanner";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import { Timer as TimerIcon, Settings2, ChevronUp, ChevronDown } from "lucide-react-native";
import { CLASSIC_DURATIONS, presetDurations } from "@/constants/timer";
import { type TimerMode, type TimerStatus, type TimerDurations, type FixedPresetMode, type PresetMode, type SavedCustomPreset } from "@/types/timer";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CUSTOM_PRESETS_KEY = "customPresets";

export default function HomeScreen() {

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#8C8C8C" : "#737373";
  const [durations, setDurations] =
    useState<TimerDurations>(CLASSIC_DURATIONS);
  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeRemaining, setTimeRemaining] = useState(durations.work * 60);
  const [completedSessions, setCompletedSessions] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [presetMode, setPresetMode] = useState<PresetMode>("classic");
  const { playClick, playComplete, playCelebrate } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeCustomPresetId, setActiveCustomPresetId] = useState<string | null>(
    null
  );
  const totalTime = durations[mode] * 60;
  const progress =
    totalTime === 0 ? 0 : ((totalTime - timeRemaining) / totalTime) * 100;
  const [customPreset, setCustomPreset] = useState<TimerDurations>(CLASSIC_DURATIONS);
  const [savedCustomPresets, setSavedCustomPresets] = useState<
    SavedCustomPreset[]
  >([]);
  useEffect(() => {
    const loadCustomPreset = async () => {
      try {
        const savedPreset = await AsyncStorage.getItem(CUSTOM_PRESETS_KEY);

        if (!savedPreset) return;

        const parsedPreset = JSON.parse(savedPreset) as SavedCustomPreset[];

        setSavedCustomPresets(parsedPreset);
        setStatus("idle");

        console.log("Loaded custom preset:", parsedPreset);
      } catch (error) {
        console.log("Failed to load custom preset:", error);
      }
    };

    loadCustomPreset();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (status === "running" && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

   if (status === "running" && timeRemaining === 0) {
  if (mode === "work") {
    const nextCompletedSessions = completedSessions + 1;

    if (soundEnabled) {
      if (nextCompletedSessions >= 4) {
        playCelebrate();
      } else {
        playComplete();
      }
    }

    setCompletedSessions(() => {
      if (nextCompletedSessions >= 4) {
        setMode("longBreak");
        setTimeRemaining(durations.longBreak * 60);
        setStatus("idle");
        return 4;
      }

      setMode("shortBreak");
      setTimeRemaining(durations.shortBreak * 60);
      setStatus("idle");
      return nextCompletedSessions;
    });

    return;
  }

  if (soundEnabled) {
    playComplete();
  }

  if (mode === "shortBreak") {
    setMode("work");
    setTimeRemaining(durations.work * 60);
    setStatus("idle");
    return;
  }

  if (mode === "longBreak") {
    setCompletedSessions(0);
    setMode("work");
    setTimeRemaining(durations.work * 60);
    setStatus("idle");
    return;
  }
}

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeRemaining, status, mode, durations, soundEnabled, playComplete]);


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


  const handlePresetModeChange = (newPresetMode: FixedPresetMode) => {

    const newDurations = presetDurations[newPresetMode];

    setPresetMode(newPresetMode);
    setDurations(newDurations);
    setStatus("idle");
    setTimeRemaining(newDurations[mode] * 60);
    setActiveCustomPresetId(null);
  }

  const handleApplyCustomDurations = (customDurations: TimerDurations) => {
    setDurations(customDurations);
    setPresetMode("custom");
    setStatus("idle");
    setTimeRemaining(customDurations[mode] * 60);
  };

  const handleSelectCustomPreset = (preset: SavedCustomPreset) => {
    setPresetMode("custom");
    setCustomPreset(preset.durations);
    setDurations(preset.durations);
    setStatus("idle");
    setTimeRemaining(preset.durations[mode] * 60);
    setActiveCustomPresetId(preset.id);
  };

  const handleDeleteCustomPreset = async (presetId: string) => {
    try {
      const updatedPresets = savedCustomPresets.filter(
        (preset) => preset.id !== presetId
      );

      setSavedCustomPresets(updatedPresets);
      setDurations(CLASSIC_DURATIONS);
      setTimeRemaining(CLASSIC_DURATIONS.work * 60);
      setStatus("idle");
      handleCustomPresetChange("work", 25);
      handleCustomPresetChange("shortBreak", 5);
      handleCustomPresetChange("longBreak", 15);


      await AsyncStorage.setItem(
        CUSTOM_PRESETS_KEY,
        JSON.stringify(updatedPresets)
      );

      console.log("Deleted custom preset:", presetId);
    } catch (error) {
      console.log("Failed to delete custom preset:", error);
    }
  };

  const handleSaveCustomPreset = async (
    customDurations: TimerDurations,
    presetName: string
  ) => {
    try {
      const newPreset: SavedCustomPreset = {
        id: Date.now().toString(),
        name: presetName,
        durations: customDurations,
      };

      const updatedPresets = [...savedCustomPresets, newPreset];

      setSavedCustomPresets(updatedPresets);

      await AsyncStorage.setItem(
        CUSTOM_PRESETS_KEY,
        JSON.stringify(updatedPresets)
      );

      console.log("Saved custom preset:", newPreset);
    } catch (error) {
      console.log("Failed to save custom preset:", error);
    }
  };

  const handleCustomPresetChange = (
    field: keyof TimerDurations,
    value: number
  ) => {
    setActiveCustomPresetId(null);
    setCustomPreset((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const triggerCelebration = () => {
    setShowCelebration(true);

    setTimeout(() => {
      setShowCelebration(false);
    }, 2500);
  };

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
      {showCelebration && (
        <CelebrationBanner />
      )}
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
          customPreset={customPreset}
          savedCustomPresets={savedCustomPresets}
          handlePresetModeChange={handlePresetModeChange}
          disabled={status === "running"}
          activeCustomPresetId={activeCustomPresetId}
          onCustomPresetChange={handleCustomPresetChange}
          handleApplyCustomDurations={handleApplyCustomDurations}
          handleSaveCustomPreset={handleSaveCustomPreset}
          handleSelectCustomPreset={handleSelectCustomPreset}
          handleDeleteCustomPreset={handleDeleteCustomPreset}
        />}


      <Text className="max-w-xs text-center text-s text-typography-500">
        Complete 4 focus sessions to earn a long break. Stay productive!
      </Text>



    </ScrollView>
  );
}