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
  const handleStartReset = () => {
    if (status !== "running") {
      handleStatusChange("running");
    } else if (status === "running") {
      handleResetTimer();
    }
  };

  const handlePause = () => {
    if (status === "running") {
      handleStatusChange("paused");
    } else if (status === "paused") {
      handleStatusChange("running");
    }
  };

  return (
    <View className="flex flex-row gap-4">
      <Button
        variant="solid"
        size="xl"
        onPress={handleStartReset}
        className="rounded-xl"
      >
        <ButtonText>{status === "running" ? "Reset" : "Start"}</ButtonText>
      </Button>
      {(status === "running" || status === "paused") && (
        <Button
          variant="solid"
          size="xl"
          onPress={handlePause}
          className="rounded-xl"
        >
          <ButtonText>{status === "paused" ? "Resume" : "Pause"}</ButtonText>
        </Button>
      )}
    </View>
  );
};

export default Controls;
