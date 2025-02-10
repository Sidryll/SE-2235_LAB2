import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center space-y-8">
        <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Will you be my valentine?
        </h1>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Button
            variant="outline"
            className="flex items-center rounded-full px-8 py-4 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="mr-2 h-6 w-6" />
            No
          </Button>
          <Button
            variant="default"
            className="flex items-center rounded-full px-8 py-4 text-xl bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 transition-colors"
          >
            <Heart className="mr-2 h-6 w-6" />
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
