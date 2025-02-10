import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4 md:p-8 space-y-8">
      <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white text-center">
        Will you be my valentine?
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Button
          variant="outline"
          className="flex items-center justify-center rounded-full min-w-[180px] px-10 py-6 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="mr-2 h-6 w-6" />
          No
        </Button>
        <Button
          variant="default"
          className="flex items-center justify-center rounded-full min-w-[180px] px-10 py-6 text-xl bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 transition-colors"
        >
          <Heart className="mr-2 h-6 w-6" />
          Yes
        </Button>
      </div>
    </div>
  );
}
