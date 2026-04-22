import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores oficiais da marca Dive Lovers
        "azul-profundo": "#102e48",
        tangerina: "#f28a33",
        "off-white": "#f3f2ee",
        "azul-pastel": "#8eccff",
        // Extensões para o conceito "descida ao mar"
        "azul-superficie": "#8eccff",
        "azul-meio": "#2a5878",
        "azul-fundo": "#051a2e",
      },
      fontFamily: {
        // Substitutos open-source: Quicksand (títulos) e Afacad (corpo)
        titulo: ["var(--font-quicksand)", "sans-serif"],
        corpo: ["var(--font-afacad)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "bubble-up": "bubbleUp 8s linear infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bubbleUp: {
          "0%": { transform: "translateY(100vh)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-10vh)", opacity: "0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(242, 138, 51, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(242, 138, 51, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
