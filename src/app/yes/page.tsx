"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function YesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
          <CardTitle className="mt-4 text-3xl font-bold text-center">
            You Said Yes! ❤️
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4 text-center space-y-4">
          <p className="text-lg text-gray-700">
            Thank you for your sweet response. You just made my day extra
            special! 🎉
          </p>
          <p className="text-sm text-gray-500">See you soon!! 💝</p>
          <Button variant="default" onClick={() => router.push("/")}>
            Go Back Home 🏠
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
