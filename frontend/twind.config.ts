import { Options } from "$fresh/plugins/twind.ts";
import { aspectRatio } from "@twind/aspect-ratio/";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  plugins: {
    aspect: aspectRatio,
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        "accent": "#9c0",
      },
      transitionProperty: {
        "padding": "padding",
      },
    },
  },
  variants: {
    link: "text-cyan-500",
  },
} as Options;
