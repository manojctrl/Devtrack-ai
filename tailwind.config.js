// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F172A",
        card: "#1E293B",
        card2: "#162032",
        indigo: "#6366F1",
        "indigo-dim": "rgba(99, 102, 241, 0.15)",
        "indigo-glow": "rgba(99, 102, 241, 0.35)",
        emerald: "#10B981",
        "emerald-dim": "rgba(16, 185, 129, 0.12)",
        purple: "#A855F7",
        "purple-dim": "rgba(168, 85, 247, 0.12)",
        "purple-glow": "rgba(168, 85, 247, 0.3)",
        text1: "#F1F5F9",
        text2: "#94A3B8",
        text3: "#475569",
        border: "rgba(255, 255, 255, 0.07)",
        "border-glow": "rgba(99, 102, 241, 0.4)",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        r: "12px",
        rlg: "20px",
        rxl: "28px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(30px,20px) scale(1.05)" },
        },
        pulse: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease forwards",
        drift: "drift 6s ease-in-out infinite alternate",
        pulse: "pulse 2s infinite",
      },
    },
  },
  plugins: [],
}
