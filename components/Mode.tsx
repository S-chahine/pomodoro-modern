import { TIMER_LABELS } from "@/constants/timer";
import type { TimerDurations, TimerMode } from "@/types/timer";
import { Pressable, Text, View } from "react-native";

type ModeProps = {
  mode: TimerMode;
  durations: TimerDurations;
  disabled: boolean;
  handleModeChange: (mode: TimerMode) => void;
};

const tabs: TimerMode[] = ["work", "shortBreak", "longBreak"];

const Mode = ({ mode, durations, disabled, handleModeChange }: ModeProps) => {
  return (
    <View className="flex-row gap-2 rounded-2xl bg-background-100 p-2">
      {tabs.map((tab) => {
        const isActive = mode === tab;

        return (
          <Pressable
            key={tab}
            disabled={disabled}
            onPress={() => handleModeChange(tab)}
            className={`items-center rounded-xl px-4 py-3 ${
              isActive
                ? tab === "work"
                  ? "bg-primary-100"
                  : "bg-secondary-100"
                : ""
            } ${disabled ? "opacity-50" : "opacity-100"}`}
          >
            <Text
              className={`text-sm font-semibold ${
                isActive ? "text-typography-900" : "text-typography-500"
              }`}
            >
              {TIMER_LABELS[tab]}
            </Text>

            <Text className="text-xs text-typography-400">
              {durations[tab]} min
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Mode;