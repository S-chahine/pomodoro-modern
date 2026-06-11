import { TimerDurations, PresetMode, FixedPresetMode } from "@/types/timer";

export type SettingsProps = {
  presetMode: PresetMode;
  customPreset: TimerDurations;
  handlePresetModeChange: (presetMode: FixedPresetMode) => void;
  disabled: boolean;
  handleApplyCustomDurations: (customDurations: TimerDurations) => void;
  handleSaveCustomPreset: (customDurations: TimerDurations) => void;
   onCustomPresetChange: (
    field: keyof TimerDurations,
    value: number
  ) => void;

};