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
    container: {
      center: true,
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
