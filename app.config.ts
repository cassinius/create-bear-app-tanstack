// this is for instructing Vinxi to start TanStack Start's "minimal" behavior
import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // react: {
  //   include: [new RegExp("app/.*/*.tsx")],
  // },
  vite: {
    plugins: [
      tsConfigPaths({
        root: "./",
        // projects: ["./tsconfig.json"],
      }),
    ],
  },
  server: {
    preset: "node-server",
  },
});
