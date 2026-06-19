import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CLASSIC_DURATIONS } from "@/constants/timer";
import {
  type SavedCustomPreset,
  type TimerDurations,
} from "@/types/timer";

const CUSTOM_PRESETS_KEY = "customPresets";

type UseCustomPresetsProps = {
  applyCustomDurations: (durations: TimerDurations) => void;
  resetToClassic: () => void;
};

export const useCustomPresets = ({
  applyCustomDurations,
  resetToClassic,
}: UseCustomPresetsProps) => {
  const [customPreset, setCustomPreset] =
    useState<TimerDurations>(CLASSIC_DURATIONS);

  const [savedCustomPresets, setSavedCustomPresets] = useState<
    SavedCustomPreset[]
  >([]);

  const [activeCustomPresetId, setActiveCustomPresetId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadCustomPresets = async () => {
      try {
        const savedPresets = await AsyncStorage.getItem(CUSTOM_PRESETS_KEY);

        if (!savedPresets) return;

        const parsedPresets = JSON.parse(savedPresets) as SavedCustomPreset[];

        setSavedCustomPresets(parsedPresets);
      } catch (error) {
        console.log("Failed to load custom presets:", error);
      }
    };

    loadCustomPresets();
  }, []);

  const handleCustomPresetChange = (
    field: keyof TimerDurations,
    value: number
  ) => {
    setActiveCustomPresetId(null);

    setCustomPreset((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCustomPreset = async (
    customDurations: TimerDurations,
    presetName: string
  ) => {
    try {
      const newPreset: SavedCustomPreset = {
        id: Date.now().toString(),
        name: presetName,
        durations: customDurations,
      };

      const updatedPresets = [...savedCustomPresets, newPreset];

      setSavedCustomPresets(updatedPresets);

      await AsyncStorage.setItem(
        CUSTOM_PRESETS_KEY,
        JSON.stringify(updatedPresets)
      );
    } catch (error) {
      console.log("Failed to save custom preset:", error);
    }
  };

  const handleSelectCustomPreset = (preset: SavedCustomPreset) => {
    setCustomPreset(preset.durations);
    setActiveCustomPresetId(preset.id);
    applyCustomDurations(preset.durations);
  };

  const handleDeleteCustomPreset = async (presetId: string) => {
    try {
      const updatedPresets = savedCustomPresets.filter(
        (preset) => preset.id !== presetId
      );

      setSavedCustomPresets(updatedPresets);

      await AsyncStorage.setItem(
        CUSTOM_PRESETS_KEY,
        JSON.stringify(updatedPresets)
      );

      if (activeCustomPresetId === presetId) {
        setActiveCustomPresetId(null);
        setCustomPreset(CLASSIC_DURATIONS);
        resetToClassic();
      }
    } catch (error) {
      console.log("Failed to delete custom preset:", error);
    }
  };

  const clearActiveCustomPreset = () => {
    setActiveCustomPresetId(null);
  };

  return {
    customPreset,
    savedCustomPresets,
    activeCustomPresetId,

    handleCustomPresetChange,
    handleSaveCustomPreset,
    handleSelectCustomPreset,
    handleDeleteCustomPreset,
    clearActiveCustomPreset,
  };
};