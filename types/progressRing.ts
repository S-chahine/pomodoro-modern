import { TimerMode } from "@/types/timer";

export type ProgressRingProps = {
  progress: number;
  mode: TimerMode;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
};