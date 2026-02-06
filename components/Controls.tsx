import { Button, ButtonText } from "@/components/ui/button";
import { View } from "react-native";

type ControlsProps = {
  status: string;
  handleStatusChange: (newStatus: string) => void;
  handleResetTimer: () => void;
};

const Controls = ({
  status,
  handleStatusChange,
  handleResetTimer,
}: ControlsProps) => {

  const handleStartPause = () => {
      if (status !== "running") {
      handleStatusChange("running");
    } else if (status === "running") {
      handleStatusChange("Paused");
    }
    };

  const handleReset = () => {
      handleStatusChange("idle");
      handleResetTimer();
  }
    
  return (
    <View className="flex flex-row gap-4">
      <Button
        variant="solid"
        size="xl"
        onPress={handleStartPause}
        className="rounded-xl"
      >
        <ButtonText>{status === "running" ? "Pause" : "Start"}</ButtonText>
      </Button>
      <Button
          variant="solid"
          size="xl"
          onPress={handleReset}
          className="rounded-xl"
        >
          <ButtonText>Reset</ButtonText>
        </Button>
    </View>
  );
};

export default Controls;
