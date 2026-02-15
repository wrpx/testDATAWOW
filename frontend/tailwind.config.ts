import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        app: {
          black: "#1E1E24",
          canvas: "#EDEDED",
          panel: "#FFFFFF",
          border: "#D2D2D2",
          text: "#222222",
          muted: "#6B6B6B",
          primary: "#2F80D9",
          info: "#3578AE",
          success: "#4BAE95",
          danger: "#DF6360",
          navActive: "#E5EDF5"
        }
      },
      boxShadow: {
        panel: "0 2px 8px rgba(0, 0, 0, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
