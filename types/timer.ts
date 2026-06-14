
export type TimerStatus = "idle" | "running" | "paused" | "done";

export type TimerMode = "work" | "shortBreak" | "longBreak";

export type FixedPresetMode = "classic" | "deepWork" | "lightMode";

export type PresetMode = FixedPresetMode | "custom";

export type TimerDurations = {
  work: number;
  shortBreak: number;
  longBreak: number;
};

export type SavedCustomPreset = {
  id: string;
  name: string;
  durations: TimerDurations;
};

