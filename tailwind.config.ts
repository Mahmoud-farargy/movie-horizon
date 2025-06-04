import type { Config } from "tailwindcss";

export default {
  content: [
    // "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        mainText: "var(--main-text",
        mainBorder: "var(--main-border)",
        offGray: "#a3a3a3e6"
      },
    },
    screens: {
      xs: '30.938rem',
      '2xs': '20rem',
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
      '3xl': '150rem',
    },
  },
  plugins: [],
} satisfies Config;
