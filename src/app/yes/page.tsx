"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MusicPlayer from "@/components/music-player";

export default function YesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex flex-col items-center justify-center p-4">
      {/* Music Player */}
      <MusicPlayer uri="https://r58v64hu5a.ufs.sh/f/tOS2QinshurwiZbOdJxM7vyNJUp9sQjSVfilBYwX4RkDer2g" />

      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center">
          {/* GIF display */}
          <div className="w-full flex justify-center">
            <iframe
              src="https://tenor.com/embed/22536058"
              title="Fish Kiss GIF"
              className="w-full h-64"
              style={{ backgroundColor: "transparent" }}
              allowFullScreen
            />
          </div>
        </CardHeader>
        <CardContent className="mt-4 text-center space-y-4">
          <p className="text-lg text-gray-700">
            You just made my day extra special! 🎉
          </p>
          <p className="text-sm text-gray-500">You and me 💝</p>

          {/* GIF display */}
          <div className="w-full flex justify-center">
            <iframe
              src="https://tenor.com/embed/15361948635174071348"
              title="Fish Kiss GIF"
              className="w-full h-64"
              style={{ backgroundColor: "transparent" }}
              allowFullScreen
            />
          </div>

          <Button variant="default" onClick={() => router.push("/")}>
            Go Back Home 🏠
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
