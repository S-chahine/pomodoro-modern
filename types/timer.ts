export type TimerStatus = "idle" | "running" | "paused" | "done";

export type TimerMode = "work" | "shortBreak" | "longBreak";

export type TimerDurations = {
  work: number;
  shortBreak: number;
  longBreak: number;
};