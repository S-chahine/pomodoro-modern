import { useEffect, useState } from "react";
import { CLASSIC_DURATIONS, presetDurations } from "@/constants/timer";
import {
  type FixedPresetMode,
  type PresetMode,
  type TimerDurations,
  type TimerMode,
  type TimerStatus,
} from "@/types/timer";
import { useSound } from "@/hooks/useSound";

const POMODORO_CYCLE_LENGTH = 4;
const CELEBRATION_DURATION_MS = 2500;

export const usePomodoroTimer = () => {
  const [durations, setDurations] =
    useState<TimerDurations>(CLASSIC_DURATIONS);

  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeRemaining, setTimeRemaining] = useState(
    CLASSIC_DURATIONS.work * 60
  );
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [presetMode, setPresetMode] = useState<PresetMode>("classic");

  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrateTrigger, setCelebrateTrigger] = useState(false);

  const { playClick, playComplete, playCelebrate } = useSound();

  const totalTime = durations[mode] * 60;

  const progress =
    totalTime === 0 ? 0 : ((totalTime - timeRemaining) / totalTime) * 100;

  const triggerCelebration = () => {
    setShowCelebration(true);
    setCelebrateTrigger((prev) => !prev);

    setTimeout(() => {
      setShowCelebration(false);
    }, CELEBRATION_DURATION_MS);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (status === "running" && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

    if (status === "running" && timeRemaining === 0) {
      if (mode === "work") {
        const nextCompletedSessions = completedSessions + 1;

        if (soundEnabled) {
          if (nextCompletedSessions >= POMODORO_CYCLE_LENGTH) {
            playCelebrate();
            triggerCelebration();
          } else {
            playComplete();
          }
        }

        if (nextCompletedSessions >= POMODORO_CYCLE_LENGTH) {
          setCompletedSessions(POMODORO_CYCLE_LENGTH);
          setMode("longBreak");
          setTimeRemaining(durations.longBreak * 60);
          setStatus("idle");
          return;
        }

        setCompletedSessions(nextCompletedSessions);
        setMode("shortBreak");
        setTimeRemaining(durations.shortBreak * 60);
        setStatus("idle");
        return;
      }

      if (soundEnabled) {
        playComplete();
      }

      if (mode === "shortBreak") {
        setMode("work");
        setTimeRemaining(durations.work * 60);
        setStatus("idle");
        return;
      }

      if (mode === "longBreak") {
        setCompletedSessions(0);
        setMode("work");
        setTimeRemaining(durations.work * 60);
        setStatus("idle");
        return;
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    timeRemaining,
    status,
    mode,
    durations,
    completedSessions,
    soundEnabled,
    playComplete,
    playCelebrate,
  ]);

  const handleStart = () => {
    if (timeRemaining === 0) return;

    if (soundEnabled) {
      playClick();
    }

    setStatus("running");
  };

  const handlePause = () => {
    if (soundEnabled) {
      playClick();
    }

    setStatus("paused");
  };

  const handleResetTimer = () => {
    if (soundEnabled) {
      playClick();
    }

    setStatus("idle");
    setTimeRemaining(durations[mode] * 60);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setStatus("idle");
    setTimeRemaining(durations[newMode] * 60);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handlePresetModeChange = (newPresetMode: FixedPresetMode) => {
    const newDurations = presetDurations[newPresetMode];

    setPresetMode(newPresetMode);
    setDurations(newDurations);
    setStatus("idle");
    setTimeRemaining(newDurations[mode] * 60);
  };

  const applyCustomDurations = (customDurations: TimerDurations) => {
    setDurations(customDurations);
    setPresetMode("custom");
    setStatus("idle");
    setTimeRemaining(customDurations[mode] * 60);
  };

  const resetToClassic = () => {
    setDurations(CLASSIC_DURATIONS);
    setPresetMode("classic");
    setMode("work");
    setStatus("idle");
    setTimeRemaining(CLASSIC_DURATIONS.work * 60);
  };

  return {
    durations,
    mode,
    status,
    timeRemaining,
    completedSessions,
    soundEnabled,
    presetMode,
    progress,
    showCelebration,
    celebrateTrigger,

    handleStart,
    handlePause,
    handleResetTimer,
    handleModeChange,
    handleToggleSound,
    handlePresetModeChange,
    applyCustomDurations,
    resetToClassic,
  };
};