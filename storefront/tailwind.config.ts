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
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-instrumentSans)",
        serif: "var(--font-instrumentSerif)",
        display: "var(--font-climateCrisis)",
      },
      colors: {
        background: "var(--background)",
        accent: "var(--accent)",
        "accent-40": "var(--accent-40)",
        secondary: "var(--secondary)",
        error: "#FF0000",
      },
      fontSize: {
        // body
        "body-8xl": "calc(var(--base-font-size) + 32px)",
        "body-6xl": "calc(var(--base-font-size) + 24px)",
        "body-5xl": "calc(var(--base-font-size) + 20px)",
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

        // label
        "label-9xl": "calc(var(--base-font-size) + 36px)",
        "label-8xl": "calc(var(--base-font-size) + 32px)",
        "label-7xl": "calc(var(--base-font-size) + 28px)",
        "label-6xl": "calc(var(--base-font-size) + 24px)",
        "label-5xl": "calc(var(--base-font-size) + 20px)",
        "label-4xl": "calc(var(--base-font-size) + 16px)",
        "label-3xl": "calc(var(--base-font-size) + 12px)",
        "label-2xl": "calc(var(--base-font-size) + 8px)",
        "label-xl": "calc(var(--base-font-size) + 4px)",
        "label-lg": "calc(var(--base-font-size) + 2px)",
        "label-base": "var(--base-font-size)",
        "label-sm": "calc(var(--base-font-size) - 2px)",
        "label-xs": "calc(var(--base-font-size) - 4px)",
        "label-2xs": "calc(var(--base-font-size) - 6px)",
      },
      spacing: {
        "max-screen": "var(--max-width)",
        "min-screen": "var(--min-width)",
        "8xl": "80px",
        "7xl": "72px",
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
        "spin-loading": "spin 1.5s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "select-open": "selectOpen 0.2s ease-out forwards",
        "select-close": "selectClose 0.2s ease-in forwards",
        enterFromTop: "enterFromTop 300ms ease",
        enterFromLeft: "enterFromLeft 450ms ease",
        enterFromRight: "enterFromRight 450ms ease",
        exitToTop: "exitToTop 300ms ease",
        exitToRight: "exitToRight 450ms ease",
        exitToLeft: "exitToLeft 450ms ease",
        fadeInUp: "fadeInUp 450ms ease",
        fadeOutLeft: "fadeOutLeft var(--duration) ease-in-out",
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
        enterFromTop: {
          from: {
            opacity: "0.5",
            transform: "translateY(-50px)",
          },
          to: {opacity: "1", transform: "translateY(0)"},
        },
        enterFromRight: {
          from: {transform: "translateX(100%)"},
          to: {transform: "translateX(0)"},
        },
        enterFromLeft: {
          from: {transform: "translateX(-100%)"},
          to: {transform: "translateX(0)"},
        },
        exitToTop: {
          from: {opacity: "1", transform: "translateY(0)"},
          to: {opacity: "0", transform: "translateY(-50px)"},
        },
        exitToRight: {
          from: {transform: "translateX(0)"},
          to: {transform: "translateX(100%)"},
        },
        exitToLeft: {
          from: {transform: "translateX(0)"},
          to: {transform: "translateX(-100%)"},
        },
        fadeInUp: {
          from: {opacity: "0", transform: "translateY(40px)"},
          to: {opacity: "1", transform: "translateY(0)"},
        },
        fadeOutLeft: {
          from: {opacity: "1", transform: "translateX(0)"},
          to: {opacity: "0", transform: "translateX(-40px)"},
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
