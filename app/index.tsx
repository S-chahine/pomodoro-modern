import Controls from "@/components/Controls";
import Mode from "@/components/Mode";
import SessionCounter from "@/components/SessionCounter";
import Settings from "@/components/Settings";
import ThumbsUp from "@/components/ThumbsUp";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useCustomPresets } from "@/hooks/useCustomPresets";
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer";
import { type FixedPresetMode } from "@/types/timer";
import {
  ChevronDown,
  ChevronUp,
  Settings2,
  Timer as TimerIcon,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#8C8C8C" : "#737373";

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const timer = usePomodoroTimer();

  const customPresets = useCustomPresets({
    applyCustomDurations: timer.applyCustomDurations,
    resetToClassic: timer.resetToClassic,
  });

  const handlePresetModeChange = (presetMode: FixedPresetMode) => {
    customPresets.clearActiveCustomPreset();
    timer.handlePresetModeChange(presetMode);
  };

  const handleApplyCustomDurations = () => {
    customPresets.clearActiveCustomPreset();
    timer.applyCustomDurations(customPresets.customPreset);
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
      showsVerticalScrollIndicator
    >
      <View className="flex-row items-center gap-2">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20">
          <TimerIcon color="#F25A5A" />
        </View>

        <Text className="text-2xl font-bold text-typography-900">
          Pomodoro Timer
        </Text>
      </View>

      <Mode
        mode={timer.mode}
        durations={timer.durations}
        handleModeChange={timer.handleModeChange}
        disabled={timer.status === "running"}
      />

      {timer.showCelebration && (
        <ThumbsUp trigger={timer.celebrateTrigger} />
      )}

      <Timer
        timeRemaining={timer.timeRemaining}
        mode={timer.mode}
        status={timer.status}
        progress={timer.progress}
      />

      <Controls
        status={timer.status}
        mode={timer.mode}
        soundEnabled={timer.soundEnabled}
        onStart={timer.handleStart}
        onPause={timer.handlePause}
        onReset={timer.handleResetTimer}
        onToggleSound={timer.handleToggleSound}
      />

      <SessionCounter completed={timer.completedSessions} />

      <Button
        action="primary"
        variant="link"
        size="lg"
        onPress={() => setIsSettingsOpen((prev) => !prev)}
      >
        <Settings2 size={18} color={iconColor} />

        <Text className="text-lg font-semibold text-typography-500">
          Settings
        </Text>

        {isSettingsOpen ? (
          <ChevronUp size={18} color={iconColor} />
        ) : (
          <ChevronDown size={18} color={iconColor} />
        )}
      </Button>

      {isSettingsOpen && (
        <Settings
          presetMode={timer.presetMode}
          customPreset={customPresets.customPreset}
          savedCustomPresets={customPresets.savedCustomPresets}
          handlePresetModeChange={handlePresetModeChange}
          disabled={timer.status === "running"}
          activeCustomPresetId={customPresets.activeCustomPresetId}
          onCustomPresetChange={customPresets.handleCustomPresetChange}
          handleApplyCustomDurations={handleApplyCustomDurations}
          handleSaveCustomPreset={customPresets.handleSaveCustomPreset}
          handleSelectCustomPreset={customPresets.handleSelectCustomPreset}
          handleDeleteCustomPreset={customPresets.handleDeleteCustomPreset}
        />
      )}

      <Text className="max-w-s text-center text-sm text-typography-500">
        Complete 4 focus sessions to earn a long break. Stay productive!
      </Text>
    </ScrollView>
  );
}