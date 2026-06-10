import type { TimerDurations, TimerMode, PresetMode } from "@/types/timer";

export const CLASSIC_DURATIONS: TimerDurations = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

export const DEEP_WORK_DURATIONS: TimerDurations = {
  work: 50,
  shortBreak: 10,
  longBreak: 20,
};

export const LIGHT_MODE_DURATIONS: TimerDurations = {
  work: 15,
  shortBreak: 3,
  longBreak: 10,
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

export const PRESETS_LABELS: Record<PresetMode, string> = {
  classic : "🔹 Classic",
  deepWork: "🎯 Deep Work",
  lightMode: "⚡ Light Mode",
};

export const PRESETS_SUBTITLES: Record<PresetMode, string> = {
  classic: "25/5/15",
  deepWork: "80/10/20",
  lightMode: "15/3/10",
};

export const tabs: TimerMode[] = ["work", "shortBreak", "longBreak"];
export const PresetTabs: PresetMode[] = ["classic", "deepWork", "lightMode"];

export const presetDurations: Record<PresetMode, TimerDurations> = {
  classic: CLASSIC_DURATIONS,
  deepWork: DEEP_WORK_DURATIONS,
  lightMode: LIGHT_MODE_DURATIONS,
};