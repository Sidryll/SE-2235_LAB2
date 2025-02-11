"use client";

import { useRef, useEffect } from "react";
import { toast } from "sonner";

interface MusicPlayerProps {
  uri: string;
  volume?: number;
}

export default function MusicPlayer({ uri, volume = 1 }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const playAudio = async () => {
      try {
        await audio.load();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        audio.currentTime = 3;
        await audio.play();
      } catch (error: any) {
        if (error.name === "NotAllowedError") {
          toast.error(
            "Audio playback blocked. Please allow audio in your browser settings."
          );
        } else {
          toast.error("Error playing audio");
          console.error("Audio playback error:", error);
        }
      }
    };

    playAudio();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [uri, volume]);

  return (
    <audio ref={audioRef} src={uri} preload="auto" loop>
      Your browser does not support the audio element.
    </audio>
  );
}
