"use client";
import { SignOutButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  createCupydCard,
  getCardByCreatorId,
  resetCupydCard,
} from "@/lib/actions";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import type { CupydCard } from "@/lib/types";

export default function UserPage() {
  const { userId } = useAuth();
  const [card, setCard] = useState<CupydCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      if (!userId) return;

      try {
        const existingCard = await getCardByCreatorId(userId);
        if (existingCard) {
          setCard(existingCard);
        }
      } catch (error) {
        toast.error("Failed to fetch card");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [userId]);

  const handleCreateLink = async () => {
    try {
      if (!userId) {
        toast.error("You must be logged in");
        return;
      }

      const newCard = await createCupydCard(userId);
      setCard(newCard);
      toast.success("New card link created!");
    } catch (error) {
      toast.error("Failed to create card");
      console.error(error);
    }
  };

  const handleCopyLink = async () => {
    if (!card) return;

    try {
      const link = `${window.location.origin}/${card.id}`;
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleReset = async () => {
    if (!card) return;

    try {
      await resetCupydCard(card.id);
      setCard((prev) => (prev ? { ...prev, isAccepted: false } : null));
      toast.success("Card reset successfully!");
    } catch (error) {
      toast.error("Failed to reset card");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6">
      <UserButton showName afterSwitchSessionUrl="/" />
      <div className="flex gap-2 text-sm text-pink-600">
        <span className="font-semibold">Valentine Answered: </span>
        {card?.isAccepted ? (
          <Badge variant="outline" className="text-red-500">
            ❤️ Yes
          </Badge>
        ) : (
          <Badge variant="outline" className="text-gray-400">
            No
          </Badge>
        )}
      </div>
      <div className="flex gap-2 text-xs text-muted-foreground">
        <span>Card Link: </span>
        {card ? (
          <code>{`${window.location.origin}/${card.id}`}</code>
        ) : (
          <span>None</span>
        )}
      </div>

      {card ? (
        <>
          <Button className="w-full" variant="default" onClick={handleCopyLink}>
            Copy Card Link
          </Button>

          {card.isAnswered ? (
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleReset}
            >
              Reset Card
            </Button>
          ) : null}
        </>
      ) : (
        <Button
          className="w-full"
          variant="secondary"
          onClick={handleCreateLink}
        >
          Create Link
        </Button>
      )}

      <SignOutButton>
        <Button variant="secondary" className="w-full">
          Sign out
        </Button>
      </SignOutButton>
    </div>
  );
}
