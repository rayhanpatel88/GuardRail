import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        guardrail: {
          midnight: "#050B14",
          navy: "#0A1128",
          ink: "#111827",
          white: "#F8FAFC",
          snow: "#FFFFFF",
          platinum: "#D7DCE2",
          silver: "#AEB7C2",
          slate: "#64748B",
          smoke: "#94A3B8",
          line: "rgb(255 255 255 / 0.10)",
          lineStrong: "rgb(255 255 255 / 0.18)",
          veil: "rgb(248 250 252 / 0.72)",
        },
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Cormorant Garamond",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-sans)", "Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "display-xl": [
          "clamp(4.5rem, 10vw, 10rem)",
          { lineHeight: "0.84", letterSpacing: "-0.055em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(3.75rem, 7vw, 7.5rem)",
          { lineHeight: "0.88", letterSpacing: "-0.05em", fontWeight: "500" },
        ],
        "display-md": [
          "clamp(2.75rem, 5vw, 5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.045em", fontWeight: "500" },
        ],
        "heading-lg": [
          "clamp(2rem, 3.6vw, 3.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.04em", fontWeight: "500" },
        ],
        "heading-md": [
          "clamp(1.5rem, 2.4vw, 2.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.032em", fontWeight: "500" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.78", letterSpacing: "0" }],
        body: ["1rem", { lineHeight: "1.72", letterSpacing: "0" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
      spacing: {
        18: "4.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
        42: "10.5rem",
      },
      maxWidth: {
        measure: "68ch",
        editorial: "82rem",
        vault: "96rem",
      },
      borderColor: {
        hairline: "rgb(255 255 255 / 0.10)",
      },
      boxShadow: {
        "vault-soft": "0 24px 80px rgb(0 0 0 / 0.32)",
        "inset-hairline": "inset 0 0 0 1px rgb(255 255 255 / 0.10)",
      },
      backgroundImage: {
        "vault-radial":
          "radial-gradient(circle at 20% 0%, rgb(255 255 255 / 0.08), transparent 32rem)",
        "navy-depth":
          "linear-gradient(180deg, #0A1128 0%, #050B14 52%, #02060D 100%)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
