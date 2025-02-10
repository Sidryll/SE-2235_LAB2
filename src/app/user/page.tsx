"use client";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UserPage() {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6">
      <UserButton showName afterSwitchSessionUrl="/" />
      <div className="flex gap-2 text-xs text-muted-foreground">
        <span>Card Link: </span>
        <code>{window.location.href}</code>
      </div>
      <Button className="w-full" variant="default" onClick={handleCopyLink}>
        Copy Card Link
      </Button>
      <SignOutButton>
        <Button variant={"outline"} className="w-full">
          Sign out
        </Button>
      </SignOutButton>
    </div>
  );
}
