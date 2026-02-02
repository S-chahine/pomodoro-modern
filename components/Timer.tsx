import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const Timer = ({ timeRemaining }: { timeRemaining: number }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formattedTimeRemaining = formatTime(timeRemaining);

  return (
    <Box className="bg-primary-500 p-5 rounded-3xl">
      <Text className="text-typography-0 text-5xl">
        {formattedTimeRemaining}
      </Text>
    </Box>
  );
};

export default Timer;
