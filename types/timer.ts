
export type TimerStatus = "idle" | "running" | "paused" | "done";

export type TimerMode = "work" | "shortBreak" | "longBreak";

export type PresetMode = "classic" | "deepWork" | "lightMode";

export type TimerDurations = {
  work: number;
  shortBreak: number;
  longBreak: number;
};

