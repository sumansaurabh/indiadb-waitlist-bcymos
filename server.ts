import { createRequestHandler } from "@remix-run/node";
import { join } from "node:path";
// @ts-ignore
import * as build from "./build/server/index.js";

const remixHandler = createRequestHandler(build, process.env.NODE_ENV);

const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(request) {
    const url = new URL(request.url);
    const path = join(process.cwd(), "public", url.pathname);

    // 1. Serve Static Assets (Frontend)
    if (url.pathname !== "/") {
      const file = Bun.file(path);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    // 2. Serve Remix App (Backend/SSR)
    return remixHandler(request);
  },
});

console.log(`🚀 Server started on port ${server.port}`);
