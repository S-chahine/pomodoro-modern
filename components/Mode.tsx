import { TIMER_LABELS, tabs } from "@/constants/timer";
import type { ModeProps } from "@/types/mode";
import { Pressable, Text, View } from "react-native";



const Mode = ({ mode, durations, disabled, handleModeChange }: ModeProps) => {
  return (
    <View className="flex-row gap-2 rounded-2xl bg-background-muted/50 p-2">
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
                  ? "bg-primary-500/20"
                  : "bg-secondary-100/20"
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