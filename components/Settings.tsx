import { View, Text, Pressable, Modal, TextInput } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { SettingsProps } from "@/types/settings";
import { PresetTabs } from "@/constants/timer";
import { useState } from "react";
import { PRESETS_LABELS, PRESETS_SUBTITLES } from "@/constants/timer";
import NumberStepper from "./ui/NumberStepper";
import { Save, Trash2, CheckIcon } from "lucide-react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

const Settings = ({
  presetMode,
  customPreset,
  handlePresetModeChange,
  disabled,
  activeCustomPresetId,
  handleApplyCustomDurations,
  handleSaveCustomPreset,
  onCustomPresetChange,
  savedCustomPresets,
  handleSelectCustomPreset,
  handleDeleteCustomPreset,
}: SettingsProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#FFFFFF" : "#8C8C8C";
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");


  const handleConfirmSave = () => {
    const trimmedName = presetName.trim();

    if (!trimmedName) return;

    handleSaveCustomPreset(customPreset, trimmedName);

    setPresetName("");
    setIsSaveDialogOpen(false);
  };

  return (
    <View className="flex gap-2 py-4 pl-2 justify-center items-center rounded-2xl bg-background-muted/20">
      <View className="flex max-w-sm gap-2">
        <Text className="text-typography-500 text-lg font-bold">
          PRESETS
        </Text>
        <View className="flex-row gap-2 p-2" >
          {PresetTabs.map((tab) => {
            const isActive = presetMode === tab;

            return (
              <View className="flex justify-center rounded-2xl mt-5 mb-5 bg-background-0" key={tab}>
                <Pressable
                  disabled={disabled}
                  onPress={() => handlePresetModeChange(tab)}
                  className={`h-16 w-28 items-center rounded-xl px-0  py-3 ${isActive
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
        {savedCustomPresets.length > 0 && (
          <View className="w-full gap-3">
            <Text className="text-lg font-bold text-typography-500">
              SAVED PROFILES
            </Text>
            {savedCustomPresets.map((preset) => {
              const isCustomPresetActive = activeCustomPresetId === preset.id;

              return (
                <View
                  key={preset.id}
                  className={`w-full flex-row items-center justify-between rounded-2xl border p-3 ${isCustomPresetActive
                    ? "border-primary-500 bg-primary-500/10"
                    : "border-background-300 bg-background-0"
                    }`}
                >
                  <Pressable
                    disabled={disabled}
                    onPress={() => handleSelectCustomPreset(preset)}
                    className="flex-1"
                  >
                    <View className="flex-row items-center gap-2">
                      <Text
                        className={`font-semibold ${isCustomPresetActive
                          ? "text-primary-500"
                          : "text-typography-900"
                          }`}
                      >
                        {preset.name}
                      </Text>
                        <Text
                      className={`text-s ${isCustomPresetActive
                        ? "text-primary-500"
                        : "text-typography-400"
                        }`}
                    >
                      {preset.durations.work}/{preset.durations.shortBreak}/
                      {preset.durations.longBreak}
                    </Text>
                    </View>
                  </Pressable>
                  {isCustomPresetActive && (
                    <CheckIcon className="h-5 w-5" size={20} color="#F25A5A" />
                  )}
                  <Button
                    action="negative"
                    variant="link"
                    size="sm"
                    onPress={() => handleDeleteCustomPreset(preset.id)}
                    className="rounded-xl px-3"
                  >
                    <Trash2 className="h-5 w-5" size={20} color={iconColor} />
                  </Button>
                </View>
              );
            })}
          </View>
        )}
        <View className="flex justify-center p-3 mb-10" >
          <Button
            action="primary" variant="link" size="lg"
            onPress={() => setIsOpen((prev) => !prev)}
            className={`border rounded-2xl  ${isOpen
              ? "border-transparent bg-teal-400 data-[active=true]:bg-teal-500 data-[active=true]:border-transparent"
              : "border-background-300 bg-background-0 data-[active=true]:bg-background-100 data-[active=true]:border-background-300"
              }`}

          >
            <Text className={`text-lg font-semibold text-typography-950 
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
                    min={1}
                    max={90}
                    step={1}
                    onChange={(value) => onCustomPresetChange("work", value)}
                  />
                  <Text className="text-typography-400">
                    10-90 min
                  </Text>
                </View>
                <View className="flex flex-col justify-center items-center gap-2">
                  <NumberStepper
                    label="Short"
                    value={customPreset.shortBreak}
                    min={1}
                    max={20}
                    step={1}
                    onChange={(value) => onCustomPresetChange("shortBreak", value)}
                  />
                  <Text className="text-typography-400">
                    3-20 min
                  </Text>
                </View>
                <View className="flex flex-col justify-center items-center gap-2">
                  <NumberStepper
                    label={"Long"}
                    value={customPreset.longBreak}
                    min={1}
                    max={40}
                    step={1}
                    onChange={(value) => onCustomPresetChange("longBreak", value)}

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
                  onPress={() => handleApplyCustomDurations(customPreset)}
                >
                  <Text className="text-white font-bold">Apply</Text>
                </Button>
                <Button
                  action="default"
                  variant="outline"
                  className="data-[hover=true]:bg-tertiary-500 rounded-2xl border-typography-500 "
                  onPress={() => setIsSaveDialogOpen(true)}
                ><Save className="h-5 w-5" size={20} color={iconColor} />
                  <ButtonText className="text-typography-950 data-[hover=true]:text-white text-lg">
                    Save
                  </ButtonText>
                </Button>
              </View>
            </View>
          }
        </View>
      </View>
      <Modal
        visible={isSaveDialogOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSaveDialogOpen(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View className="w-full max-w-sm rounded-2xl bg-background-0 p-5 gap-4">
            <Text className="text-xl font-bold text-typography-900">
              Save Profile
            </Text>

            <Text className="text-sm text-typography-500">
              Give your custome settings timer a name.
            </Text>

            <TextInput
              value={presetName}
              onChangeText={setPresetName}
              placeholder="e.g., Study Mode"
              placeholderTextColor="#8C8C8C"
              className="rounded-xl border border-background-300 bg-background-muted/20 px-4 py-3 text-typography-900"
            />

            <View className="flex-row gap-3">
              <Button
                action="default"
                variant="outline"
                className="flex-1 rounded-2xl"
                onPress={() => {
                  setPresetName("");
                  setIsSaveDialogOpen(false);
                }}
              >
                <ButtonText className="text-typography-500">Cancel</ButtonText>
              </Button>

              <Button
                action="primary"
                variant="solid"
                className="flex-1 rounded-2xl"
                disabled={!presetName.trim()}
                onPress={handleConfirmSave}
              >
                <ButtonText className="text-white">
                  Save
                </ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

