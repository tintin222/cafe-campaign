import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Starbucks-inspired colors
        'starbucks': {
          'green': '#00704A',
          'light-green': '#008248',
          'dark-green': '#005A3C',
          'gold': '#CBA258',
          'cream': '#F2F0EB',
          'tan': '#D4C5B0',
        },
      },
    },
  },
  plugins: [],
};
export default config;
