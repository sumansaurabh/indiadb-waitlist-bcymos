/**
 * Cloudflare Pages Function Handler for Remix App
 * Forwards all requests to the Remix server build
 */

export const onRequest: PagesFunction = async (context) => {
  // Import the server build dynamically
  const { default: remixHandler } = await import("../build/server/index.js");

  // Convert Cloudflare request to standard Node.js Request
  const request = context.request.clone();

  // Handle the request with Remix
  const response = await remixHandler(request);

  return response;
};
