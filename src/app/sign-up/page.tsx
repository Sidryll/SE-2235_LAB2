import { GalleryVerticalEnd, Heart } from "lucide-react";
import { SignUpForm } from "@/components/sign-up-form"; // updated from LoginForm

export default function SignUpPage() {
  // renamed from LoginPage
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Heart className="size-4 text-pink-500" />
          Cupyd
        </a>
        <SignUpForm /> {/* updated component usage */}
      </div>
    </div>
  );
}
