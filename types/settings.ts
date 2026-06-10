import { TimerDurations, PresetMode } from "@/types/timer";

export type SettingsProps = {
  presetMode: PresetMode;
  handlePresetModeChange: (presetMode: PresetMode) => void;
};