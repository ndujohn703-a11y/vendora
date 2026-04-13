import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4405", // Temu Orange
        secondary: "#fbbf24", // Vibrant Yellow
        accent: "#00b207", // Success Green
        background: "#f4f4f4",
      },
    },
  },
  plugins: [],
};
export default config;
