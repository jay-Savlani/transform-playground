import { useRef, useState, useEffect } from "react";

export const useAudio = () => {
  const audioRef = useRef(null);
  const [audioSetting, setAudioSetting] = useState(false);

  useEffect(() => {
    if (audioSetting) {
      // wait for DOM to update
      setTimeout(() => {
        audioRef.current.volume = 0.4;
      }, [300]);
    }
  }, [audioSetting]);

  return {
    audioRef,
    audioSetting,
    setAudioSetting,
  };
};
