import type { TimerDurations, TimerMode } from "@/types/timer";

export const DEFAULT_DURATIONS: TimerDurations = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

export const TIMER_LABELS: Record<TimerMode, string> = {
  work: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

export const TIMER_SUBTITLES: Record<TimerMode, string> = {
  work: "Focus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};