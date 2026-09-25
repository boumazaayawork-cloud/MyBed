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
        brand: {
          50: '#f6f5f3',
          100: '#ede9e3',
          200: '#ded5c7',
          300: '#cbbba6',
          400: '#b59e84',
          500: '#9e8165',
          600: '#866a50',
          700: '#6d533f',
          800: '#584335',
          900: '#48372e',
        },
        navy: {
          900: '#0c1a30',
          800: '#14274e',
          700: '#1f3c73',
        },
        gold: {
          400: '#e5b869',
          500: '#d4a34b',
          600: '#b8862d',
        }
      },
      fontFamily: {
        arabic: ['var(--font-cairo)', 'sans-serif'],
        latin: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
