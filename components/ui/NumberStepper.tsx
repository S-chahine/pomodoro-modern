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
  const decrease = () => {
    onChange(Math.max(min, value - step));
  };

  const increase = () => {
    onChange(Math.min(max, value + step));
  };

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
            onPress={decrease}
            className="h-8 w-7 rounded-lg p-0"
          >
            <Minus size={16} color="#8C8C8C" />
          </Button>
        </InputSlot>

        <InputField
          value={`${value}`}
          editable={false}
          showSoftInputOnFocus={false}
          className="flex-1 w-14 text-center text-base font-semibold text-typography-900"
        />

        <InputSlot className="items-center justify-center">
          <Button
            variant="link"
            action="secondary"
            size="sm"
            disabled={value >= max}
            onPress={increase}
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