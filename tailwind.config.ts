import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import daisyUi from "daisyui";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.tsx"],
  plugins: [tailwindcssAnimate, daisyUi],
  daisyui: {
    themes: ["dim", "cupcake"]
  }
} satisfies Config;
