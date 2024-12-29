// this is for instructing Vinxi to start TanStack Start's "minimal" behavior
import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // tsr: {
  //   routesDirectory: "app/routes",
  // },
  // react: {
  //   include: [new RegExp("app/.*/*.tsx")],
  // },
  vite: {
    plugins: [
      // tailwindcss(),
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
