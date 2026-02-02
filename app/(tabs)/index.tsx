import Timer from "@/components/Timer";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [duration, setDuration] = useState({ work: 25, short: 5, long: 10 });
  const [mode, setMode] = useState("work");
  const [status, setStatus] = useState("idle");
  const [timeRemaining, setTimeRemaining] = useState(duration.work * 60);

  useEffect(() => {
    if (status === "running" && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (status === "running" && timeRemaining === 0) {
      setStatus("done");
    }
  }, [timeRemaining]);

  return (
    <View className="flex-1 justify-center items-center">
      <Timer timeRemaining={timeRemaining} />
    </View>
  );
}
