import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";

type NumberStepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const NumberStepper = ({
  label,
  value,
  onChange,
  min = 1,
  max = 120,
  step = 1,
}: NumberStepperProps) => {
  const [inputValue, setInputValue] = useState(String(value));

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
    setInputValue(String(value));
  }, [value]);

  const clampValue = (nextValue: number) => {
    return Math.min(max, Math.max(min, nextValue));
  };

  const commitValue = () => {
    if (inputValue.trim() === "") {
      setInputValue(String(value));
      return;
    }

    const parsedValue = Number(inputValue);

    if (Number.isNaN(parsedValue)) {
      setInputValue(String(value));
      return;
    }

    const clampedValue = clampValue(parsedValue);

    valueRef.current = clampedValue;
    setInputValue(String(clampedValue));
    onChange(clampedValue);
  };

  const changeValue = (direction: "increase" | "decrease") => {
    const currentValue = valueRef.current;

    const nextValue =
      direction === "increase"
        ? clampValue(currentValue + step)
        : clampValue(currentValue - step);

    valueRef.current = nextValue;
    setInputValue(String(nextValue));
    onChange(nextValue);
  };

  const startHolding = (direction: "increase" | "decrease") => {
    changeValue(direction);

    intervalRef.current = setInterval(() => {
      changeValue(direction);
    }, 250);

    speedTimeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        changeValue(direction);
      }, 75);
    }, 800);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current);
      speedTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopHolding();
  }, []);

  return (
    <View className="mt-6 gap-4 justify-center items-center">
      <Text className="text-sm font-semibold text-typography-700">
        {label}
      </Text>

      <Input
        variant="outline"
        size="lg"
        className="h-12 w-28 flex-row items-center rounded-xl border border-background-300 bg-background-0"
      >
        <InputSlot className="items-center justify-center">
          <Button
            variant="link"
            action="secondary"
            size="sm"
            disabled={value <= min}
            onPressIn={() => startHolding("decrease")}
            onPressOut={stopHolding}
            className="h-8 w-7 rounded-lg p-0"
          >
            <Minus size={16} color="#8C8C8C" />
          </Button>
        </InputSlot>

        <InputField
          value={inputValue}
          keyboardType="numeric"
          onChangeText={(text) => {
            const numbersOnly = text.replace(/[^0-9]/g, "");
            setInputValue(numbersOnly);
          }}
          onBlur={commitValue}
          onSubmitEditing={commitValue}
          className="flex-1 w-14 text-center text-base font-semibold text-typography-900"
        />

        <InputSlot className="items-center justify-center">
          <Button
            variant="link"
            action="secondary"
            size="sm"
            disabled={value >= max}
            onPressIn={() => startHolding("increase")}
            onPressOut={stopHolding}
            className="h-8 w-7 rounded-lg p-0"
          >
            <Plus size={16} color="#8C8C8C" />
          </Button>
        </InputSlot>
      </Input>
    </View>
  );
};

export default NumberStepper;