import type { Config } from "tailwindcss";

// DESIGN.md + シェアハウス１/src/index.css (@theme) を Tailwind v3 形式に移植
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface / Background
        background: "#fbf9f6",
        surface: "#fbf9f6",
        "surface-bright": "#fbf9f6",
        "surface-dim": "#dbdad7",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f0",
        "surface-container": "#efeeeb",
        "surface-container-high": "#eae8e5",
        "surface-container-highest": "#e4e2df",
        "surface-variant": "#e4e2df",
        // Primary
        primary: "#9b3f2b",
        "primary-container": "#bb5640",
        "primary-fixed": "#ffdad3",
        "primary-fixed-dim": "#ffb4a4",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-primary-fixed": "#3e0500",
        "on-primary-fixed-variant": "#7f2a18",
        // Secondary
        secondary: "#7f5700",
        "secondary-container": "#febe4e",
        "secondary-fixed": "#ffdead",
        "secondary-fixed-dim": "#fbbb4c",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#724d00",
        "on-secondary-fixed": "#281900",
        "on-secondary-fixed-variant": "#604100",
        // Tertiary
        tertiary: "#8d4b00",
        "tertiary-container": "#b0600c",
        "tertiary-fixed": "#ffdcc3",
        "tertiary-fixed-dim": "#ffb77e",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fffbff",
        "on-tertiary-fixed": "#2f1500",
        "on-tertiary-fixed-variant": "#6e3900",
        // On Surface
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#56423e",
        "on-background": "#1b1c1a",
        // Inverse
        "inverse-surface": "#30312f",
        "inverse-on-surface": "#f2f0ed",
        "inverse-primary": "#ffb4a4",
        // Outline
        outline: "#89726d",
        "outline-variant": "#dcc0ba",
        // Surface tint
        "surface-tint": "#9e412d",
        // Error
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        headline: ["Epilogue", "sans-serif"],
        body: ["Be Vietnam Pro", "sans-serif"],
        label: ["Be Vietnam Pro", "sans-serif"],
        hand: ["Kalam", "cursive"],
      },
      boxShadow: {
        polaroid: "0 10px 30px rgba(86, 66, 62, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
