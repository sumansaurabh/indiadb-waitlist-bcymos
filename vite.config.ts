import path from "path";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig(({ command }) => ({
  server: {
    port: 5173,
  },
  // Bundle server deps only in production build artifacts.
  ...(command === "build"
    ? {
        ssr: {
          noExternal: true,
        },
        build: {
          rollupOptions: {
            external: [],
          },
        },
      }
    : {}),
  resolve: {
    alias: {
      db: path.resolve(__dirname, "./db"),
    },
  },
  plugins: [
    remix({
      serverModuleFormat: "esm",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
}));
