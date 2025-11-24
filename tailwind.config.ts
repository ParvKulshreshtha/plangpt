import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightteal: "#A0F5D3",
        // neon-pink: "#FF0080",
        // electricblue: "#00C6FF",
        limegreen: "#00FF00",
        neon: {
          pink: "#ff007f", // Neon Pink
          blue: "#00bcd4", // Electric Blue
          green: "#00e676", // Lime Green
          purple: "#9c27b0", // Deep Purple
          coral: "#ff5722", // Vivid Coral
        },
        pastel: {
          pink: "#f48fb1", // Pastel Pink
          purple: "#ce93d8", // Pastel Purple
          blue: "#81d4fa", // Pastel Blue
          green: "#b2fab4", // Mint Green
        },
        accent: {
          yellow: "#ffeb3b", // Bright Yellow
          orange: "#ff9800", // Bright Orange
        },
        neutral: {
          white: "#ffffff", // White for backgrounds
          black: "#212121", // Charcoal Black for text and contrast
          gray: "#9e9e9e", // Medium gray for softer text
        },
        
      },
    },
  },
  plugins: [scrollbarHide]
} satisfies Config;
