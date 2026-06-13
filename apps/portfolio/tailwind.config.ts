import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navBlue: "#1d4ed8",
        timelineRed: "#dc2626",
        footerGreen: "#14532d",
      },
    },
  },
  plugins: [],
};

export default config;
