import Timer from "@/components/Timer";
import Controls from "@/components/ui/Controls";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [duration, setDuration] = useState({ work: 25, short: 5, long: 10 });
  const [mode, setMode] = useState("work");
  const [status, setStatus] = useState("idle");
  const [timeRemaining, setTimeRemaining] = useState(duration.work * 60);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (status === "running" && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (status === "running" && timeRemaining === 0) {
      setStatus("done");
    }

    // Cleanup function  - clears the timeout when component re-renders
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeRemaining, status]);

  const handleStatusChange = (status: string) => {
    setStatus(status);
  };

  const handleResetTimer = () => {
    setTimeRemaining(duration.work * 60);
  };
  return (
    <View className="flex-1 justify-center items-center gap-8">
      <Timer timeRemaining={timeRemaining} />
      <Controls
        status={status}
        handleStatusChange={handleStatusChange}
        handleResetTimer={handleResetTimer}
      />
    </View>
  );
}
