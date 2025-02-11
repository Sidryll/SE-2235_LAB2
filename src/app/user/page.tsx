"use client";

import { SignOutButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  createCupydCard,
  getCardByCreatorId,
  resetCupydCard,
  toggleCardRejectable,
} from "@/lib/actions";
import { useState, useEffect } from "react";
import type { CupydCard } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

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
      } catch (_error) {
        toast.error("Failed to fetch card");
        console.error(_error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [userId]);

  const handleCreateLink = async () => {
    if (!userId) {
      toast.error("You must be logged in");
      return;
    }
    try {
      const newCard = await createCupydCard(userId);
      setCard(newCard);
      toast.success("New card link created!");
    } catch (_error) {
      toast.error("Failed to create card");
      console.error(_error);
    }
  };

  const handleCopyLink = async () => {
    if (!card) return;
    const link = `${window.location.origin}/${card.id}`;
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      try {
        await navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!");
      } catch (_error) {
        // Fallback to execCommand in case of an error with clipboard.writeText
        fallbackCopy(link);

        console.error(_error);
      }
    } else {
      fallbackCopy(link);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    // Avoid scrolling to bottom
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        toast.success("Link copied to clipboard!");
      } else {
        toast.error("Failed to copy link");
      }
    } catch (_error) {
      toast.error("Failed to copy link");
      console.error(_error);
    }
    document.body.removeChild(textarea);
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-500 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6">
      <UserButton showName afterSwitchSessionUrl="/" />
      <div className="flex flex-col gap-2 w-full max-w-md">
        <div>
          <span className="font-semibold">Card Link:</span>{" "}
          {card ? (
            <code>{`${window.location.origin}/${card.id}`}</code>
          ) : (
            <span>None</span>
          )}
        </div>
        {card && (
          <div className="mt-4 w-full grid gap-4">
            <h3 className="text-lg font-semibold mb-3">Card Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-600">Status</span>
                <p>{card.isAnswered ? "Answered" : "Pending"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-600">Response</span>
                <p>{card.isAccepted ? "❤️ Yes" : "Waiting"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-600">Views</span>
                <p>{card.viewCount}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-600">Reject Count</span>
                <p>{card.rejectCount}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-600">Answered At</span>
                <p className="text-xs">
                  {card.answeredAt
                    ? new Date(card.answeredAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-600">Card ID</span>
                <p className="truncate text-xs">{card.id}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-600">
                  Make the &quot;NO&quot; button dodgy
                </span>
                <p className="text-xs">Yes is the only answer</p>
              </div>
              <Switch
                checked={card.isRejectable}
                onCheckedChange={() => {
                  setCard((prev) =>
                    prev ? { ...prev, isRejectable: !prev.isRejectable } : null
                  );

                  toggleCardRejectable(card.id, !card.isRejectable);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {card ? (
        <>
          <Button className="w-full" variant="default" onClick={handleCopyLink}>
            Copy Card Link
          </Button>
          {card.isAnswered && (
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleReset}
            >
              Reset Card
            </Button>
          )}
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
