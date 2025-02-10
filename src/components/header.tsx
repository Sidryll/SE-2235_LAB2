"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-white shadow absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-start items-center">
        <Button
          variant={"ghost"}
          onClick={() => router.back()}
          className="p-4" // Increased padding for a larger touch area
        >
          <ChevronLeft height={32} width={32} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
