import { View, Text, Pressable } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { SettingsProps } from "@/types/settings";
import { CLASSIC_DURATIONS, PresetTabs } from "@/constants/timer";
import { useState } from "react";
import { PRESETS_LABELS, PRESETS_SUBTITLES } from "@/constants/timer";
import NumberStepper from "./ui/NumberStepper";
import { TimerDurations } from "@/types/timer";
import { Save } from "lucide-react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

const Settings = ({ presetMode, handlePresetModeChange }: SettingsProps) => {

  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [customPreset, setCustomPreset] = useState<TimerDurations>(CLASSIC_DURATIONS);

  const colorScheme = useColorScheme();
  return (
    <View className="flex gap-2 py-4 justify-center items-center rounded-2xl bg-background-muted/20">
      <View className="flex max-w-sm gap-2">
        <Text className="text-typography-500 text-lg font-bold">
          PRESETS
        </Text>
        <View className="flex-row gap-2" >
          {PresetTabs.map((tab) => {
            const isActive = presetMode === tab;

            return (
              <View className="flex justify-center rounded-2xl mt-5 mb-5 bg-background-0" key={tab}>
                <Pressable
                  disabled={disabled}
                  onPress={() => handlePresetModeChange(tab)}
                  className={`h-16 w-32 items-center rounded-xl px-2  py-3 ${isActive
                    ? "bg-primary-500/20" : ""
                    } ${disabled ? "opacity-50" : "opacity-100"}`}
                >
                  <Text
                    className={`text-sm font-semibold ${isActive ? "text-typography-900" : "text-typography-500"
                      }`}
                  >
                    {PRESETS_LABELS[tab]}
                  </Text>

                  <Text className="text-xs text-typography-400">
                    {PRESETS_SUBTITLES[tab]}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        <View className="flex justify-center p-3 mb-10" >
          <Button
            action="primary" variant="link" size="lg"
            onPress={() => setIsOpen((prev) => !prev)}
            className={`border border-background-300 rounded-2xl ${isOpen
              ? "bg-teal-400 data-[hover=true]:bg-teal-500"
              : ""
              }`}

          >
            <Text className={`text-lg font-semibold text-typography-500 
            ${isOpen
                ? "text-white"
                : ""
              }`}>
              {isOpen ? "Hide Custom Mode" : "Custom Mode"}
            </Text>
          </Button>

          {isOpen &&
            <View className="flex w-full justify-center gap-6 items-center" >
              <View className="flex flex-row w-full justify-center gap-2 items-center">
                <View className="flex flex-col justify-center items-center gap-2">
                  <NumberStepper
                    label="Focus"
                    value={customPreset.work}
                    min={10}
                    max={90}
                    step={1}
                    onChange={(value) =>
                      setCustomPreset((prev) => ({
                        ...prev,
                        work: value,
                      }))
                    }
                  />
                  <Text className="text-typography-400">
                    10-90 min
                  </Text>
                </View>
                <View className="flex flex-col justify-center items-center gap-2">
                  <NumberStepper
                    label="Short"
                    value={customPreset.shortBreak}
                    min={3}
                    max={20}
                    step={1}
                    onChange={(value) =>
                      setCustomPreset((prev) => ({
                        ...prev,
                        shortBreak: value,
                      }))
                    }
                  />
                  <Text className="text-typography-400">
                    3-20 min
                  </Text>
                </View>
                <View className="flex flex-col justify-center items-center gap-2">
                  <NumberStepper
                    label={"Long"}
                    value={customPreset.longBreak}
                    min={10}
                    max={40}
                    step={1}
                    onChange={(value) =>
                      setCustomPreset((prev) => ({
                        ...prev,
                        longBreak: value,
                      }))
                    }
                  />
                  <Text className="text-typography-400">
                    10-40 min
                  </Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center gap-2">
                <Button
                  action="primary"
                  variant="solid"
                  className="flex-1 rounded-2xl"
                >
                  <Text className="text-white font-bold">Apply</Text>
                </Button>
                <Button
                  action="default"
                  variant="outline"
                  className="data-[hover=true]:bg-tertiary-500 rounded-2xl border-slate-300 "
                ><Save className="h-5 w-5" size={20} color="#8C8C8C" />
                  <ButtonText className="text-typography-500 data-[hover=true]:text-white text-lg">
                    Save
                  </ButtonText>
                </Button>
              </View>
            </View>
          }
        </View>
      </View>
    </View>
  );
};

export default Settings;

