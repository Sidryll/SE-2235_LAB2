import React, { useState } from "react";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DodgyButtonsProps {
  id?: string;
  onYesClick: () => void;
  onNoClick: () => void;
}

export default function DodgyButtons({
  id,
  onYesClick,
  onNoClick,
}: DodgyButtonsProps) {
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [noButtonRotation, setNoButtonRotation] = useState(0);
  const [noButtonOpacity, setNoButtonOpacity] = useState(1);
  const [noCount, setNoCount] = useState(0);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const handleNoClick = () => {
    onNoClick();

    // Randomize toast message for extra fun
    const messages = [
      "Try again!",
      "Nope, not that!",
      "Almost... try again!",
      "Keep trying!",
      "Not this time!",
      "So close!",
      "Nice try, but no!",
      "That's not the right button! 😉",
      "The other button looks better!",
      "Maybe reconsider? 🤔",
      "Are you sure about that?",
      "Oopsie! Wrong choice!",
      "The pink button is prettier!",
      "Error 404: Correct choice not found",
      "Task failed successfully!",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    toast.warning(randomMessage);

    // Increase the Yes button scale (for contrast)
    if (Math.random() < 0.5) {
      setYesScale((prev) => prev + 0.5);
    } else {
      // Calculate a new offset with a multiplier so the button moves further with each press.
      const multiplier = noCount + 1;
      const rawX = (Math.floor(Math.random() * 200) - 100) * multiplier;
      const rawY = (Math.floor(Math.random() * 200) - 100) * multiplier;
      // Clamp the offset so it doesn't run offscreen.
      const limitedX = clamp(rawX, -300, 300);
      const limitedY = clamp(rawY, -300, 300);
      setNoButtonOffset({ x: limitedX, y: limitedY });
    }

    // Make the No button shrink further, rotate, and fade (opposite of the Yes button)
    setNoButtonScale((prev) => prev * 0.75);
    setNoButtonRotation((prev) => prev + 90);
    setNoButtonOpacity(0.75);

    // Increment noCount
    setNoCount((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Button
          id={id}
          variant="default"
          className="flex items-center justify-center rounded-full min-w-[180px] px-10 py-6 text-xl bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 transition-colors transform text-white"
          style={{ transform: `scale(${yesScale})` }}
          onClick={onYesClick}
        >
          <Heart className="mr-2 h-6 w-6" />
          Yes
        </Button>
        <Button
          variant="outline"
          onClick={handleNoClick}
          className="flex items-center justify-center rounded-full min-w-[180px] px-10 py-6 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
          style={{
            transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px) scale(${noButtonScale}) rotate(${noButtonRotation}deg)`,
            opacity: noButtonOpacity,
            transition: "transform 0.3s, opacity 0.3s",
          }}
        >
          <X className="mr-2 h-6 w-6" />
          No
        </Button>
      </div>
    </div>
  );
}
