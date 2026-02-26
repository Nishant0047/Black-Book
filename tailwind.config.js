/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#030712",       // Main background (very dark blue/black)
          surface: "rgba(17, 24, 39, 0.7)",  // Translucent panel background
          border: "rgba(59, 130, 246, 0.3)",   // Glowing borders
          primary: "#00F0FF",  // Cyan / Cyberpunk Blue
          secondary: "#FF003C", // Neon Red
          success: "#39FF14",  // Neon Green
          warning: "#FFEA00",  // Neon Yellow
          critical: "#FF003C", // Neon Red
          textMain: "#E0F2FE", // Light cyan-tinted white
          textMuted: "#38BDF8" // Bright cyan for labels
        },
        light: {
          bg: "#F9FAFB",
          surface: "#FFFFFF",
          border: "#E5E7EB",
          primary: "#2563EB",
          success: "#059669",
          warning: "#D97706",
          critical: "#DC2626",
          textMain: "#111827",
          textMuted: "#6B7280"
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', "monospace"],
        sans: ['"Inter"', "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-spin": "radar-spin 4s linear infinite",
        "scan-line": "scan-line 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "matrix-scroll": "matrix-scroll 20s linear infinite",
      },
      keyframes: {
        "radar-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan-line": {
          "0%": { top: "0%", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { top: "100%", opacity: 0 },
        },
        "glow": {
          "0%": { boxShadow: "0 0 5px #00F0FF, 0 0 10px #00F0FF" },
          "100%": { boxShadow: "0 0 10px #00F0FF, 0 0 20px #00F0FF" },
        },
        "matrix-scroll": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        }
      }
    },
  },
  plugins: [],
};
