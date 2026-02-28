# Architecture Documentation

This directory contains comprehensive architecture diagrams for the 3D Waitlist Space application. All diagrams are in Mermaid format and can be rendered in GitHub, VS Code, or any Mermaid-compatible viewer.

## Available Diagrams

### 1. System Overview (`system-overview.mermaid`)
**Purpose:** High-level view of the entire application architecture

**Shows:**
- Client layer (Browser)
- Frontend application structure (Remix)
- State management layer (TanStack Query)
- UI framework components (Radix UI, Tailwind)
- Build tools (Vite, TypeScript, PostCSS)
- API layer

**Use this diagram to:**
- Understand the overall system architecture
- See how different layers interact
- Identify key technologies and their relationships

---

### 2. Component Hierarchy (`component-hierarchy.mermaid`)
**Purpose:** Visual representation of React component tree structure

**Shows:**
- Root component and layout structure
- Context providers (QueryClient, Tooltip, Toaster)
- Route components
- UI component library (50+ Radix UI components)
- Custom hooks
- Utility functions

**Use this diagram to:**
- Understand component composition
- Find where specific components are used
- See the provider structure and context flow

---

### 3. Data Flow (`data-flow.mermaid`)
**Purpose:** Sequence diagram showing how data flows through the application

**Shows:**
- Navigation flow
- Data fetching with TanStack Query
- State management and caching
- User interaction handling
- Mutation and API communication

**Use this diagram to:**
- Understand request/response cycles
- See how state is managed
- Debug data flow issues
- Plan new feature implementations

---

### 4. Routing Structure (`routing-structure.mermaid`)
**Purpose:** Application routing and navigation structure

**Shows:**
- Root layout and features
- All application routes
- Meta tags and SEO configuration
- Error boundary handling
- Route-specific functionality

**Use this diagram to:**
- Understand URL structure
- Add new routes
- Configure SEO and metadata
- Handle errors and edge cases

---

### 5. Build & Deployment (`build-deployment.mermaid`)
**Purpose:** Development workflow and build process

**Shows:**
- Development phase with HMR
- Build process (TypeScript, ESLint, Vite)
- Testing with Vitest
- Production deployment
- Package management (bun + bun)

**Use this diagram to:**
- Understand the build pipeline
- Configure CI/CD
- Optimize development workflow
- Debug build issues

---

### 6. Technology Stack (`technology-stack.mermaid`)
**Purpose:** Complete technology stack with versions

**Shows:**
- Frontend framework (React + Remix)
- State management (TanStack Query, React Hook Form, Zod)
- UI components (Radix UI, Tailwind CSS)
- Build tools (Vite, TypeScript, ESLint)
- Testing tools (Vitest, Testing Library)
- Additional libraries and their purposes
- Runtime environment (Node.js, Bun, PNPM)

**Use this diagram to:**
- Understand technology choices
- Plan upgrades and migrations
- Onboard new developers
- Make architectural decisions

---

## How to View Diagrams

### In GitHub
Simply open any `.mermaid` file in GitHub's web interface - diagrams will render automatically.

### In VS Code
1. Install the "Markdown Preview Mermaid Support" extension
2. Open a `.mermaid` file
3. Use the preview pane to view the rendered diagram

### Online
Copy the diagram content and paste it into:
- [Mermaid Live Editor](https://mermaid.live/)
- [Draw.io with Mermaid plugin](https://app.diagrams.net/)

### In Documentation
Reference diagrams in markdown files using:
```markdown
![System Overview](./architecture/system-overview.mermaid)
```

---

## Quick Reference

| Need to... | Use this diagram |
|------------|-----------------|
| Understand overall architecture | `system-overview.mermaid` |
| Find a component | `component-hierarchy.mermaid` |
| Debug data issues | `data-flow.mermaid` |
| Add a new route | `routing-structure.mermaid` |
| Set up CI/CD | `build-deployment.mermaid` |
| Check versions | `technology-stack.mermaid` |

---

## Keeping Diagrams Updated

When making architectural changes:

1. Update the relevant diagram(s)
2. Verify the changes in a Mermaid viewer
3. Commit the updated diagrams with your code changes
4. Reference the architectural change in your commit message

---

## Architecture Principles

This application follows these architectural principles:

1. **Component-Based Architecture**: UI is built from reusable, composable components
2. **Type Safety**: TypeScript ensures compile-time type checking
3. **Server State Management**: TanStack Query handles all server state and caching
4. **Accessibility First**: Radix UI provides accessible primitives
5. **Performance**: Vite for fast builds, React 18 for concurrent features
6. **Developer Experience**: Fast installs (bun), fast scripts (bun), HMR, and type safety

---

## Additional Resources

- [Remix Documentation](https://remix.run/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
