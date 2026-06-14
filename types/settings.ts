import {
  TimerDurations,
  PresetMode,
  FixedPresetMode,
  SavedCustomPreset,
} from "@/types/timer";

export type SettingsProps = {
  presetMode: PresetMode;
  customPreset: TimerDurations;
  savedCustomPresets: SavedCustomPreset[];
  disabled: boolean;

  handlePresetModeChange: (presetMode: FixedPresetMode) => void;

  onCustomPresetChange: (
    field: keyof TimerDurations,
    value: number
  ) => void;

  handleApplyCustomDurations: (customDurations: TimerDurations) => void;

  handleSaveCustomPreset: (customDurations: TimerDurations) => void;

  handleSelectCustomPreset: (preset: SavedCustomPreset) => void;

  handleDeleteCustomPreset: (presetId: string) => void;
};