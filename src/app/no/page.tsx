"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-red-100 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <X className="h-16 w-16 text-red-500 animate-pulse" />
          <CardTitle className="mt-4 text-3xl font-bold text-center">
            You Said No! 💔
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4 text-center space-y-4">
          <p className="text-lg text-gray-700">
            That's okay. Not everyone can be the perfect valentine. 🌹
          </p>
          <p className="text-sm text-gray-500">I appreciate your honesty! 🙏</p>
          <Button variant="default" onClick={() => router.push("/")}>
            Go Back Home 🏠
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
