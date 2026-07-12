import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F2EA",
        cream: "#FBF7F0",
        beige: "#EFE6D8",
        forest: {
          DEFAULT: "#2C3B2E",
          light: "#3E5240",
          dark: "#1B2619",
        },
        coffee: {
          DEFAULT: "#4A3327",
          light: "#6B4C3A",
          dark: "#2E1F17",
        },
        honey: {
          DEFAULT: "#D9A441",
          light: "#F0C674",
          dark: "#B0812A",
        },
        espresso: "#241812",
        warmblack: "#14100C",
        latte: "#E4CBA8",
        mocha: "#7A5B47",
        caramel: "#C68B4F",
        olive: "#6B6A4F",
      },
      fontFamily: {
        serif: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-24px) translateX(10px)" },
        },
        drift: {
          "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-140px) translateX(20px) rotate(40deg)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.015)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-6deg) translateY(0px)" },
          "50%": { transform: "rotate(6deg) translateY(-4px)" },
        },
        fall: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(40px)", opacity: "0" },
        },
        pour: {
          "0%, 100%": { transform: "scaleY(0.6)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        drift: "drift 8s ease-in infinite",
        breathe: "breathe 5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 18s ease infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        sway: "sway 3s ease-in-out infinite",
        fall: "fall 1.6s ease-in infinite",
        pour: "pour 2s ease-in-out infinite",
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
