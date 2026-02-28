# Package Management Guidelines

## Installation Commands
**ALWAYS use `bun` for package installation** - it's significantly faster than npm or bun:
```bash
bun install
bun add <package-name>
bun add -d <dev-package-name>
bun remove <package-name>
```

## Other Package Management Tasks
**Use `bun` for all other package management operations**:
```bash
bun run dev
bun run build
bun run test
bun run lint
bun run typecheck
```

## Why This Setup?
- **bun**: Fastest package installation (up to 25x faster than npm)
- **bun**: Efficient disk space usage and fast script execution for development tasks

## Available Scripts
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `typecheck` - Run TypeScript compiler
- `test` - Run tests with Vitest
- `test:watch` - Run tests in watch mode

## Architecture Documentation
Refer to `docs/architecture/` for detailed architecture diagrams and documentation.
