/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        poker: {
          green: "#0d4f3c",
          "green-dark": "#0a3a2d",
          "green-light": "#166b52",
          gold: "#d4af37",
          "gold-light": "#f0d060",
          felt: "#0e5d42",
          "felt-dark": "#09402d",
        },
        card: {
          red: "#d63434",
          black: "#1a1a1a",
          back: "#1e3a8a",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        suit: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      animation: {
        "flip-card": "flipCard 0.6s ease-in-out forwards",
        "shake": "shake 0.5s ease-in-out",
        "glow-gold": "glowGold 1.5s ease-in-out infinite alternate",
        "bounce-in": "bounceIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        flipCard: {
          "0%": { transform: "rotateY(0deg) scale(1)" },
          "50%": { transform: "rotateY(90deg) scale(1.1)" },
          "100%": { transform: "rotateY(180deg) scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        glowGold: {
          "0%": {
            boxShadow:
              "0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)",
          },
          "100%": {
            boxShadow:
              "0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.5)",
          },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 25px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.15)",
          },
        },
      },
    },
  },
  plugins: [],
};
