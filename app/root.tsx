import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { Toaster } from "~/components/ui/toaster";
import { Toaster as Sonner } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { VibeDoctorBadge } from "~/components/VibeDoctorBadge";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
  { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
  { rel: "apple-touch-icon", sizes: "192x192", href: "/favicon-192.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "IndBase.in | Postgres Development Platform for India" },
    { name: "description", content: "Join the waitlist for India's self-reliant Postgres development platform." },
    { name: "author", content: "IndBase.in" },
    { property: "og:title", content: "IndBase.in | Postgres Development Platform for India" },
    { property: "og:description", content: "Join the waitlist for India's self-reliant Postgres development platform." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://IndBase.in/postgres-db-india-badge.png" },
    { property: "og:image:alt", content: "Postgres DB India badge with tricolor elephant emblem" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "IndBase.in | Postgres Development Platform for India" },
    { name: "twitter:description", content: "Join the waitlist for India's self-reliant Postgres development platform." },
    { name: "twitter:image", content: "https://IndBase.in/postgres-db-india-badge.png" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H0Z6S052S5" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H0Z6S052S5');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {/* VERY IMPORTANT: This preload script is very important or else bad thing will happen to the code */}
        <script src="https://cdn.jsdelivr.net/npm/@anek-codes/editor/dist/client/preload/script.js"></script>
        <Scripts />
        <VibeDoctorBadge />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <title>Error!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-muted">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
            <p className="mb-4 text-xl text-muted-foreground">
              An unexpected error occurred
            </p>
            <a
              href="/"
              className="text-primary underline hover:text-primary/90"
            >
              Return to Home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
