import { useAudioPlayer } from "expo-audio";

export function useSound() {
  const clickPlayer = useAudioPlayer(require("@/assets/sounds/click.mp3"));
  const completePlayer = useAudioPlayer(
    require("@/assets/sounds/complete.mp3")
  );
  const celebratePlayer = useAudioPlayer(require("@/assets/sounds/celebrate.mp3"));


  const playClick = () => {
    clickPlayer.seekTo(0);
    clickPlayer.play();
  };

  const playComplete = () => {
    completePlayer.seekTo(0);
    completePlayer.play();
  };
   const playCelebrate = () => {
    celebratePlayer.seekTo(0);
    celebratePlayer.play();
  };

  return {
    playClick,
    playComplete,
    playCelebrate,
  };
}