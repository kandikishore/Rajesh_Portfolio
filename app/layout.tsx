import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { BRAND } from "@/lib/data";
import "./globals.css";

const fontVariables = {
  "--font-display": "Impact",
  "--font-sans": "system-ui",
} as CSSProperties;

export const metadata: Metadata = {
  title: `${BRAND.name} - ${BRAND.role}`,
  description: BRAND.headlineTop + " " + BRAND.headlineBottom,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: `${BRAND.name} - ${BRAND.role}`,
    description: BRAND.headlineTop + " " + BRAND.headlineBottom,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" style={fontVariables}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
