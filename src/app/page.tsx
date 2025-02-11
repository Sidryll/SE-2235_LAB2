"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTotalCards } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      const totalCards = await getTotalCards();
      setCardCount(totalCards); // count
    };

    fetchCards();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-lg text-center px-4">
        <div className="flex justify-center mb-4">
          <Heart className="text-pink-500" size={48} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome to Cupyd!
        </h1>
        <p className="mb-4 text-base sm:text-lg">
          Shoot your shot this Valentine&apos;s Day
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Over <span className="font-semibold">{cardCount}</span> cards have
          been created!
        </p>
        <Button
          variant={"default"}
          className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-3 sm:py-4"
          onClick={() => router.push("/user")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
