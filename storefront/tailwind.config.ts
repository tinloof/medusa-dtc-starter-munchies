import type {Config} from "tailwindcss";

import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-instrumentSans)",
        serif: "var(--font-instrumentSerif)",
        climate: "var(--font-climateCrisis)",
      },
      colors: {
        background: "var(--background)",
        accent: "var(--accent)",
        secondary: "var(--secondary)",
        error: "#FF0000",
      },
      fontSize: {
        // body
        "body-8xl": "calc(var(--base-font-size) + 32px)",
        "body-6xl": "calc(var(--base-font-size) + 24px)",
        "body-4xl": "calc(var(--base-font-size) + 16px)",
        "body-3xl": "calc(var(--base-font-size) + 12px)",
        "body-2xl": "calc(var(--base-font-size) + 8px)",
        "body-xl": "calc(var(--base-font-size) + 4px)",
        "body-lg": "calc(var(--base-font-size) + 2px)",
        "body-base": "var(--base-font-size)",
        "body-sm": "calc(var(--base-font-size) - 2px)",
        "body-xs": "calc(var(--base-font-size) - 4px)",

        // heading
        "heading-9xl": "calc(var(--base-font-size) + 112px)",
        "heading-8xl": "calc(var(--base-font-size) + 96px)",
        "heading-7xl": "calc(var(--base-font-size) + 80px)",
        "heading-6xl": "calc(var(--base-font-size) + 72px)",
        "heading-5xl": "calc(var(--base-font-size) + 64px)",
        "heading-4xl": "calc(var(--base-font-size) + 56px)",
        "heading-3xl": "calc(var(--base-font-size) + 48px)",
        "heading-2xl": "calc(var(--base-font-size) + 40px)",
        "heading-xl": "calc(var(--base-font-size) + 32px)",
        "heading-lg": "calc(var(--base-font-size) + 24px)",
        "heading-base": "calc(var(--base-font-size) + 16px)",
        "heading-sm": "calc(var(--base-font-size) + 12px)",
        "heading-xs": "calc(var(--base-font-size) + 8px)",
        "heading-2xs": "calc(var(--base-font-size) + 4px)",
      },
      spacing: {
        "max-screen": "var(--max-width)",
        "min-screen": "var(--min-width)",
        "6xl": "64px",
        "5xl": "50px",
        "4xl": "48px",
        "3xl": "44px",
        "2xl": "40px",
        xl: "32px",
        lg: "24px",
        m: "20px",
        s: "16px",
        xs: "8px",
      },
      animation: {
        "spin-loading": "spin 3s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "select-open": "selectOpen 0.2s ease-out forwards",
        "select-close": "selectClose 0.2s ease-in forwards",
      },
      keyframes: {
        marquee: {
          from: {transform: "translateX(0)"},
          to: {transform: "translateX(calc(-100% - var(--gap)))"},
        },
        selectOpen: {
          from: {
            opacity: "0",
            transform: "scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        selectClose: {
          from: {
            opacity: "1",
            transform: "scale(1)",
            filter: "blur(0px)",
            "-webkit-filter": "blur(0px)",
          },
          to: {
            opacity: "0",
            transform: "scale(0.95)",
            filter: "blur(4px)",
            "-webkit-filter": "blur(4px)",
          },
        },
      },
    },
  },
  plugins: [
    plugin(({addVariant}) => {
      // Target touch and non-touch devices
      addVariant("touch", "@media (pointer: coarse)");
      addVariant("notouch", "@media (hover: hover)");
    }),
  ],
};

export default config;
