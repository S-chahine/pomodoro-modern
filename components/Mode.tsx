import { Button, ButtonText } from "@/components/ui/button";
import { View } from "react-native";
type Modes = "work" | "short" | "long";
type ModeProps ={
    mode: Modes;
    handleModeChange: (mode: Modes) => void;
}



const Mode = ({mode, handleModeChange}: ModeProps) => {

    const handleUpdateMode = (mode: Modes) => {
        handleModeChange(mode);
    }
    return (
        <View className="flex flex-row gap-4">
            <Button
            onPress={()=> handleUpdateMode("work")}
            variant="link"
            isDisabled= {mode === "work"}
            >
                <ButtonText>Work</ButtonText>
            </Button>

            <Button
            onPress={() => handleUpdateMode("short")}
            variant="link"
            isDisabled= {mode === "short"}
            >
                <ButtonText>Short</ButtonText>
            </Button>

            <Button
            onPress={() => handleUpdateMode("long")}
            variant="link"
            isDisabled= {mode === "long"}>
                <ButtonText>Long</ButtonText>
            </Button>
        </View>
    )
}

export default Mode;