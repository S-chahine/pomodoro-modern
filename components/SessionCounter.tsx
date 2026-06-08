import { Text, View } from "react-native";

type SessionCounterProps = {
  completed: number;
  target?: number;
};

const SessionCounter = ({ completed, target = 4 }: SessionCounterProps) => {
  return (
    <View className="items-center gap-3">
      <Text className="text-xs uppercase tracking-widest text-typography-500">
        Sessions Completed
      </Text>

      <View className="flex-row gap-2">
        {Array.from({ length: target }).map((_, index) => {
          const isCompleted = index < completed;

          return (
            <View
              key={index}
              className={`h-3 w-3 rounded-full ${
                isCompleted ? "bg-primary-500" : "bg-background-200"
              }`}
            />
          );
        })}
      </View>

      <Text className="text-sm font-medium text-typography-600">
        {completed} / {target}
      </Text>
    </View>
  );
};

export default SessionCounter;