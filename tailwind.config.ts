import type { Config } from "tailwindcss";

/**
 * Design tokens extracted verbatim from the Nakula Framer export.
 * Colour hexes map 1:1 to the source --token-* custom properties.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Three breakpoints only — matches the source exactly.
    screens: {
      sm: "640px",
      md: "810px",
      lg: "1200px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: "#0A0A0A", // base background
        surface: "#181818", // raised panels / cards
        line: "#333333", // hairline borders
        "line-soft": "#555555", // secondary borders
        accent: "#FF4925", // primary accent
        "accent-dark": "#BD2608", // pressed / deep accent
        "accent-tint": "#220F0D", // accent-tinted background wash
        "accent-ring": "#FF492540", // accent @ 25% — glow + focus rings
        scrim: "#0A0A0ACC", // 80% overlay over media
        paper: "#FFFFFF",
        muted: "#8F8F8F", // secondary text
        "muted-light": "#CACACA", // tertiary text
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale for the Anton poster headlines.
        "display-sm": ["clamp(2.5rem, 7vw, 4.5rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(3.5rem, 10vw, 8rem)", { lineHeight: "0.92" }],
        "display-lg": ["clamp(4rem, 13vw, 12rem)", { lineHeight: "0.88" }],
        "display-xl": ["clamp(5rem, 18vw, 20rem)", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        display: "0.02em",
        wide: "0.08em",
        wider: "0.14em",
        widest: "0.24em",
      },
      maxWidth: {
        shell: "1400px", // the source content container
      },
      boxShadow: {
        glow: "0 0 60px -12px #FF492540",
        "glow-strong": "0 0 90px -10px #FF4925",
      },
      transitionTimingFunction: {
        // Framer's default spring-ish ease, approximated as a bezier.
        framer: "cubic-bezier(0.44, 0, 0.14, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-50%, 0, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
