# Remix Full-Stack Application

A full-stack web application built with Remix, React, TypeScript, and shadcn/ui.

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm

### Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```sh
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Run production server
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript type checking
npm run test      # Run tests
```

## Project Structure

```
app/
├── routes/           # Remix routes (pages + API endpoints)
│   ├── _index.tsx    # Home page (/)
│   ├── $.tsx         # 404 catch-all page
│   └── api.health.tsx # Example API endpoint (/api/health)
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   └── ...           # Custom components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
├── root.tsx          # Root layout component
└── tailwind.css      # Global styles
```

## Technologies

- **Framework**: [Remix](https://remix.run/) - Full-stack React framework
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.dev/)
- **Build Tool**: Vite

## Backend API Routes

Create API routes by adding files to `app/routes/` with the `api.` prefix:

```tsx
// app/routes/api.example.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

// GET /api/example
export async function loader({ request }: LoaderFunctionArgs) {
  return json({ message: "Hello from API" });
}

// POST /api/example
export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  return json({ received: data });
}
```

## Adding UI Components

Use shadcn/ui CLI to add components:

```sh
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc.
```

## Deployment

Build and run the production server:

```sh
npm run build
npm run start
```

The app runs on `http://localhost:3000` in production mode.
