"use client";

import DodgyButtons from "@/components/dodgy-button";
import HeartParticlesText from "@/components/heart-particles-text";
import { Button } from "@/components/ui/button";
import {
  acceptCard,
  answerCard,
  getCardById,
  incrementCardReject,
  incrementCardView,
} from "@/lib/actions";
import { CupydCard } from "@/lib/types";
import { Heart, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { id } = useParams();
  const router = useRouter();

  const [card, setCard] = useState<CupydCard | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await incrementCardView(id as string);
        const card = await getCardById(id as string);
        if (card) {
          setCard(card);
        } else {
          router.push("/");
        }
      } catch (error) {
        toast.error("Failed to send response");
        console.error(error);
      }
    }
    fetchData();
  }, [id, router]);

  async function handleAnswer(accepted: boolean) {
    try {
      await acceptCard(id as string, accepted);
      await answerCard(id as string);
      router.push(accepted ? "/yes" : "/no");
      toast.success("Response sent!");
    } catch (error) {
      toast.error("Failed to send response");
      console.error(error);
    }
  }

  async function handleNo() {
    try {
      await incrementCardReject(id as string);
      await answerCard(id as string);
    } catch (error) {
      toast.error("Failed to send response");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#2B2D42] flex flex-col items-center justify-center p-4 md:p-8 space-y-8 relative">
      {/* GIF display */}
      <div className="w-full flex justify-center">
        <iframe
          src="https://tenor.com/embed/21630577"
          title="dudu"
          className="w-full h-48 -translate-y-8"
          style={{ backgroundColor: "transparent" }}
          allowFullScreen
        />
      </div>
      <div className="w-full max-w-lg text-center px-4 py-16">
        <HeartParticlesText />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {card?.isRejectable ? (
          <>
            <Button
              variant="default"
              className="flex items-center justify-center rounded-full min-w-[180px] px-10 py-6 text-xl bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 transition-colors"
              onClick={() => handleAnswer(true)}
            >
              <Heart className="mr-2 h-6 w-6" />
              Yes
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center rounded-full min-w-[180px] px-10 py-6 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => handleAnswer(false)}
            >
              <X className="mr-2 h-6 w-6" />
              No
            </Button>
          </>
        ) : (
          <DodgyButtons
            id={id as string}
            onYesClick={() => handleAnswer(true)}
            onNoClick={handleNo}
          />
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t py-2 text-center text-xs text-muted-foreground bg-background flex items-center justify-between p-4">
        <div>Card ID: {id}</div>
        <Button
          variant="link"
          onClick={() => router.push("/user")}
          className="text-xs text-muted-foreground hover:underline"
        >
          Create Your Own Card
        </Button>
      </footer>
    </div>
  );
}
