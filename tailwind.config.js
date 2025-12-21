/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "translate-x-full",
    "-translate-x-full",
    "opacity-0",
    "opacity-100",
    "bg-neon-primary",
    "bg-white/20",
    "bg-neon-primary/50",
    "rotate-180",
    "text-neon-secondary",
    "animate-fade-in",
    "border-red-500",
    "text-red-500",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      colors: {
        neon: {
          primary: "#00f7ff",
          secondary: "#0066ff",
          dark: "#0a0a12",
          card: "#12121a",
        },
      },
      boxShadow: {
        "neon-glow":
          "0 0 20px -5px rgba(0, 247, 255, 0.4), 0 0 10px -2px rgba(0, 102, 255, 0.3)",
        "neon-strong":
          "0 0 30px -5px rgba(0, 247, 255, 0.6), 0 0 15px -3px rgba(0, 102, 255, 0.5)",
        "glass-inset":
          "inset 0 1px 1px rgba(255, 255, 255, 0.05), inset 0 0 20px rgba(0, 247, 255, 0.05)",
      },
      backgroundImage: {
        "noise-pattern":
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
        "hero-gradient":
          "radial-gradient(circle at 20% 30%, rgba(0, 102, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 247, 255, 0.15) 0%, transparent 50%)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "blob-float": "float 10s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-20px, 20px)" },
        },
      },
    },
  },
  plugins: [],
};
