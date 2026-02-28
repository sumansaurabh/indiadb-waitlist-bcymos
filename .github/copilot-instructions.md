# GitHub Copilot Instructions

## Package Management Guidelines

### Installation Commands
**ALWAYS use `bun` for package installation** - it's significantly faster than npm or bun:
```bash
bun install
bun add <package-name>
bun add -d <dev-package-name>
bun remove <package-name>
```

### Other Package Management Tasks
**Use `bun` for all other package management operations**:
```bash
bun run dev
bun run build
bun run test
bun run lint
bun run typecheck
```

### Why This Setup?
- **bun**: Fastest package installation (up to 25x faster than npm)
- **bun**: Efficient disk space usage and fast script execution for development tasks

## Architecture Documentation

### Architecture Diagrams
Comprehensive architecture diagrams are available in `docs/architecture/`:

- **system-overview.mermaid** - Complete system architecture
- **component-hierarchy.mermaid** - React component tree structure
- **data-flow.mermaid** - Data flow and state management
- **routing-structure.mermaid** - Application routing
- **build-deployment.mermaid** - Build pipeline and deployment
- **technology-stack.mermaid** - Complete tech stack with versions

See `docs/architecture/README.md` for detailed documentation on each diagram.

### When to Consult Diagrams

| Task | Diagram to Consult |
|------|-------------------|
| Understanding the project structure | `system-overview.mermaid` |
| Adding new components | `component-hierarchy.mermaid` |
| Implementing data fetching | `data-flow.mermaid` |
| Adding new routes | `routing-structure.mermaid` |
| Setting up CI/CD | `build-deployment.mermaid` |
| Checking library versions | `technology-stack.mermaid` |

## Project Structure
- **Framework**: Remix 2.15.2 with React 18.3.1
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI (50+ accessible components)
- **Type Safety**: TypeScript 5.8
- **State Management**: TanStack Query 5.83
- **Forms**: React Hook Form 7.61 with Zod validation

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

## Environment Variables & Configuration

### Environment Variable Management
- **ALL server-side API keys MUST be stored in `.env` file**
- Never hardcode credentials in source code
- Use `app/lib/env.server.ts` for type-safe access
- Copy `.env.example` to `.env` for initial setup

### Public URL Configuration
```typescript
import { env } from "~/lib/env.server";

// Use PUBLIC_URL for absolute URLs
const url = `${env.PUBLIC_URL}/api/callback`;
```

**When prompted to update PUBLIC_URL**:
1. Open `.env` file
2. Update: `PUBLIC_URL=https://new-url.com`
3. Restart development server

### Required Environment Variables
```env
DATABASE_URL=postgresql://user:password@host:port/database
PUBLIC_URL=http://localhost:5173
SESSION_SECRET=your-secret-key-here
```

## Database Management

### Database: PostgreSQL with Drizzle ORM
- **ORM**: Drizzle ORM for type-safe database access
- **Schema**: `db/schema/index.ts`
- **Client**: Pre-configured in `app/lib/db.server.ts`
- **Migrations**: `db/migrations/` (SQL files)

### Common Database Commands
```bash
# Generate migrations
bun run db:generate

# Apply migrations
bun run db:migrate

# Push schema (dev only - no migrations)
bun run db:push

# Open Drizzle Studio (GUI)
bun run db:studio

# Seed database
bun run db:seed

# Test connection
bun run db:test
```

### Migration Workflow
1. **Development**: Edit `db/schema/index.ts`
2. **Generate**: `bun run db:generate` (creates SQL migration)
3. **Review**: Check generated files in `db/migrations/`
4. **Apply**: `bun run db:migrate`
5. **Commit**: Add migration files to version control

### Using Drizzle in Code
```typescript
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq } from "drizzle-orm";

export async function loader() {
  const allUsers = await db.select().from(users);
  return Response.json({ users: allUsers });
}

export async function action({ request }) {
  const body = await request.json();
  
  const newUser = await db.insert(users).values({
    email: body.email,
    name: body.name,
  }).returning();
  
  return Response.json({ user: newUser[0] }, { status: 201 });
}
```

**See Skills Documentation**:
- `.cursor/skills/database-management.md` - Complete Drizzle ORM guide
- `.cursor/skills/environment-management.md` - Environment variable guide
- `.cursor/skills/api-guidelines.md` - API development patterns

