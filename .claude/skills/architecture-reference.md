# Architecture Reference

## Overview
This is a Remix full-stack application with React, TypeScript, Vite, and Tailwind CSS. Comprehensive architecture diagrams are available in `docs/architecture/`.

## Architecture Diagrams

### Quick Reference
- **System Overview**: `docs/architecture/system-overview.mermaid` - Overall architecture
- **Components**: `docs/architecture/component-hierarchy.mermaid` - Component structure
- **Data Flow**: `docs/architecture/data-flow.mermaid` - How data flows through the app
- **Routing**: `docs/architecture/routing-structure.mermaid` - URL routing structure
- **Build Process**: `docs/architecture/build-deployment.mermaid` - Build and deployment
- **Tech Stack**: `docs/architecture/technology-stack.mermaid` - All technologies with versions

### When to Consult Diagrams

| Task | Diagram to Consult |
|------|-------------------|
| Understanding the project structure | `system-overview.mermaid` |
| Adding new components | `component-hierarchy.mermaid` |
| Implementing data fetching | `data-flow.mermaid` |
| Adding new routes | `routing-structure.mermaid` |
| Setting up CI/CD | `build-deployment.mermaid` |
| Checking library versions | `technology-stack.mermaid` |

## Technology Stack

### Core
- **Framework**: Remix 2.15.2 (React 18.3.1)
- **Build Tool**: Vite 5.4
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3.4

### State Management
- **Server State**: TanStack Query 5.83
- **Forms**: React Hook Form 7.61
- **Validation**: Zod 3.25

### UI Components
- **Component Library**: Radix UI (50+ accessible components)
- **Icons**: Lucide React
- **Styling Utilities**: clsx, tailwind-merge, class-variance-authority

### Key Libraries
- **Date Handling**: date-fns 3.6
- **Charts**: Recharts 2.15
- **Carousel**: Embla Carousel 8.6
- **Toasts**: Sonner 1.7
- **Theme**: next-themes 0.3

### Development Tools
- **Testing**: Vitest 3.2 + Testing Library
- **Linting**: ESLint 9.32
- **Runtime**: Node.js 20.0.0+

## Project Structure

```
app/
├── components/
│   ├── ui/           # 50+ Radix UI components
│   └── NavLink.tsx   # Navigation component
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts      # Utility functions (cn, etc.)
├── routes/
│   ├── _index.tsx    # Home page
│   ├── $.tsx         # 404 catch-all
│   └── api.health.tsx # Health check API
├── root.tsx          # Root component with providers
└── tailwind.css      # Global styles

docs/
└── architecture/     # Architecture diagrams (Mermaid)

public/               # Static assets
```

## Development Patterns

### Component Pattern
```tsx
import { cn } from "~/lib/utils";

export function MyComponent({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### Data Fetching Pattern
```tsx
import { useQuery } from "@tanstack/react-query";

export function DataComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["key"],
    queryFn: () => fetch("/api/data").then(r => r.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

### Form Pattern
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  field: z.string().min(1),
});

export function FormComponent() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

## Important Conventions

1. **File Naming**: Use lowercase with hyphens for routes (e.g., `my-route.tsx`)
2. **Component Naming**: Use PascalCase for components
3. **Import Alias**: Use `~/` for imports from `app/` directory
4. **Styling**: Use Tailwind utility classes, not CSS files
5. **Type Safety**: Always define TypeScript types for props and data

## Adding New Features

### Adding a New Route
1. Consult `docs/architecture/routing-structure.mermaid`
2. Create file in `app/routes/`
3. Follow Remix routing conventions
4. Export default component and optional `meta`, `loader`, `action`

### Adding a New UI Component
1. Consult `docs/architecture/component-hierarchy.mermaid`
2. Create in `~/components/ui/` if reusable
3. Use Radix UI primitives when possible
4. Apply Tailwind styling
5. Export from component file

### Adding API Endpoints
1. Create in `app/routes/` with `api.` prefix
2. Export `loader` for GET or `action` for POST/PUT/DELETE
3. Return JSON responses

## Common Commands

See `package-management.md` for detailed package management guidelines.

```bash
# Install packages (ALWAYS use bun)
bun install
bun add <package>

# Development (use bun)
bun run dev
bun run build
bun run test
bun run lint
bun run typecheck
```

## Additional Resources

- Detailed architecture documentation: `docs/architecture/README.md`
- Package management guide: `.claude/skills/package-management.md`
- Project README: `README.md`
