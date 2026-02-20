/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          accent: "#38bdf8", // Cyber Blue
          neon: "#22d3ee", // Neon Cyan
          success: "#4ade80",
          warning: "#facc15",
          error: "#f87171",
        },
        light: {
          bg: "#f8fafc", // Ivory-ish
          surface: "#ffffff",
          accent: "#fbbf24", // Soft Gold
          secondary: "#881337", // Muted Maroon
        },
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(15, 23, 42, 0.6)",
        },
      },
      boxShadow: {
        "neu-light":
          "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)",
        "neu-dark": "5px 5px 10px #0b1120, -5px -5px 10px #1e293b",
        "neu-pressed-light":
          "inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)",
        "neu-pressed-dark":
          "inset 4px 4px 8px #0b1120, inset -4px -4px 8px #1e293b",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        neon: "0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3)",
      },
      fontFamily: {
        mono: ['"Fira Code"', "monospace"],
        sans: ['"Inter"', "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
