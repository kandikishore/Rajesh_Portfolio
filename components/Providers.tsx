"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { Skiper10 } from "./ui/skiper10";
import { BRAND } from "@/lib/data";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Skiper10 wordmark={BRAND.name} />
      {children}
    </SmoothScrollProvider>
  );
}
