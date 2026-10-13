"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { IntroProvider } from "./IntroProvider";
import { MenuProvider } from "./MenuOverlay";
import { SoundProvider } from "./SoundProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SoundProvider>
        <IntroProvider>
          <MenuProvider>{children}</MenuProvider>
        </IntroProvider>
      </SoundProvider>
    </MotionProvider>
  );
}
