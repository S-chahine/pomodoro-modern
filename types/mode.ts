import { TimerMode, TimerDurations } from "@/types/timer";


export type ModeProps = {
  mode: TimerMode;
  durations: TimerDurations;
  disabled: boolean;
  handleModeChange: (mode: TimerMode) => void;
};