# Environment Variables Management

## Overview
This project uses `.env` files for environment-specific configuration. All server-side API keys and secrets MUST be stored in `.env` and NEVER hardcoded in source code.

## Environment Files

### `.env` (Primary)
- Contains actual environment variables
- **NEVER commit to version control**
- Copy from `.env.example` and fill in real values
- Used by all environments (development, staging, production)

### `.env.example` (Template)
- Template file with placeholder values
- **MUST commit to version control**
- Documents all required environment variables
- Copy to `.env` to start development

## Setup

### Initial Setup
```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit .env with your actual values
nano .env  # or use your preferred editor

# 3. Never commit .env
# (Already in .gitignore)
```

## Environment Variable Categories

### 1. Application Configuration
```env
NODE_ENV=development          # development | production | test
PORT=5173                     # Application port
PUBLIC_URL=http://localhost:5173  # Public-facing URL
```

**PUBLIC_URL Usage**:
- Absolute URLs in emails
- Social media sharing (OG tags)
- Redirect URLs for OAuth
- Webhook callbacks
- API base URLs

### 2. Database Configuration
```env
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host:port/database

# Optional: Direct connection (for connection pooling)
DIRECT_DATABASE_URL=postgresql://user:password@host:port/database
```

### 3. API Keys & Secrets (Server-Side Only)
**⚠️ CRITICAL**: All API keys MUST be stored here, not in code

```env
# Session/Authentication
SESSION_SECRET=your-secret-key-change-in-production

# Third-party APIs (Examples)
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
RESEND_API_KEY=re_...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
CLOUDFLARE_API_KEY=...
GITHUB_CLIENT_SECRET=...
```

### 4. Client-Side Variables (Optional)
Variables with `VITE_` prefix are exposed to the browser:

```env
# ⚠️ Only use for non-sensitive configuration
VITE_API_BASE_URL=http://localhost:5173
VITE_ENABLE_ANALYTICS=true
VITE_PUBLIC_KEY=pk_...  # Public keys only
```

## Using Environment Variables

### Server-Side (Remix Loaders/Actions)
```typescript
// app/lib/env.server.ts - Type-safe access
import { env } from "~/lib/env.server";

export async function loader() {
  const apiKey = env.OPENAI_API_KEY;
  const dbUrl = env.DATABASE_URL;
  
  // Use environment variables
  const response = await fetch("https://api.openai.com/v1/...", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  
  return Response.json({ data });
}
```

### Direct Access (Server-Side)
```typescript
// Only when not using env.server.ts
export async function action() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  
  if (!apiKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  
  // Use apiKey
}
```

### Client-Side (React Components)
```typescript
// Only for VITE_ prefixed variables
export function Component() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
  
  return <div>API URL: {apiUrl}</div>;
}
```

## Public URL Configuration

### What is PUBLIC_URL?
The base URL where your application is publicly accessible. Used for generating absolute URLs.

### Setting PUBLIC_URL

#### Development
```env
PUBLIC_URL=http://localhost:5173
```

#### Staging
```env
PUBLIC_URL=https://staging.yourdomain.com
```

#### Production
```env
PUBLIC_URL=https://yourdomain.com
```

### Using PUBLIC_URL in Code
```typescript
import { env } from "~/lib/env.server";

export async function loader() {
  // Generate absolute URLs
  const callbackUrl = `${env.PUBLIC_URL}/api/callback`;
  const shareUrl = `${env.PUBLIC_URL}/share/${id}`;
  
  // Email with absolute link
  const resetUrl = `${env.PUBLIC_URL}/reset-password?token=${token}`;
  
  return Response.json({ callbackUrl, shareUrl });
}
```

### Meta Tags with PUBLIC_URL
```typescript
// app/root.tsx
import { env } from "~/lib/env.server";

export function loader() {
  const publicUrl = env.PUBLIC_URL;
  
  return Response.json({
    meta: {
      ogUrl: `${publicUrl}/`,
      ogImage: `${publicUrl}/og-image.png`,
    },
  });
}

// In component
<meta property="og:url" content={data.meta.ogUrl} />
<meta property="og:image" content={data.meta.ogImage} />
```

## Updating Environment Variables

### When Prompted to Update PUBLIC_URL
```bash
# User prompt: "Update PUBLIC_URL to https://example.com"

# 1. Open .env file
nano .env

# 2. Update the value
PUBLIC_URL=https://example.com

# 3. Restart development server
bun run dev
```

### Automated Update Script
```bash
# If you need to update programmatically
sed -i '' 's|PUBLIC_URL=.*|PUBLIC_URL=https://example.com|g' .env
```

### After Updating
```bash
# Restart server to pick up changes
# Development
bun run dev

# Production
# Rebuild and restart
bun run build
bun start
```

## Security Best Practices

### ✅ DO
- **Store all API keys in .env**
- **Use different keys per environment** (dev, staging, prod)
- **Generate strong SESSION_SECRET** (min 32 characters)
- **Rotate secrets regularly** in production
- **Use VITE_ prefix only for public data**
- **Validate required env vars on startup**
- **Document all variables in .env.example**
- **Use environment variable management** (Vercel, Railway, etc.)

### ❌ DON'T
- **Never commit .env to Git**
- **Never expose secrets to client**
- **Never use production keys in development**
- **Never log environment variables**
- **Never share .env file**
- **Don't use VITE_ prefix for secrets**
- **Don't hardcode any credentials**

## Environment Variable Validation

### Validating on Startup
```typescript
// app/lib/env.server.ts
export function validateEnv() {
  const required = [
    "DATABASE_URL",
    "SESSION_SECRET",
    "PUBLIC_URL",
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

// Call in app entry
validateEnv();
```

## Platform-Specific Configuration

### Vercel
```bash
# Set via Vercel dashboard or CLI
vercel env add DATABASE_URL
vercel env add SESSION_SECRET

# Or in vercel.json
{
  "env": {
    "PUBLIC_URL": "https://yourapp.vercel.app"
  }
}
```

### Railway
```bash
# Set via Railway dashboard or CLI
railway variables set DATABASE_URL="postgresql://..."
railway variables set SESSION_SECRET="..."
```

### Docker
```yaml
# docker-compose.yml
services:
  app:
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - PUBLIC_URL=https://example.com
```

### Fly.io
```bash
# Set secrets
fly secrets set DATABASE_URL="postgresql://..."
fly secrets set SESSION_SECRET="..."

# Or in fly.toml
[env]
  PUBLIC_URL = "https://yourapp.fly.dev"
```

## Development Workflow

### New Developer Setup
```bash
# 1. Clone repository
git clone <repo-url>

# 2. Copy environment file
cp .env.example .env

# 3. Fill in required values
# - Get DATABASE_URL (local or hosted)
# - Generate SESSION_SECRET
# - Set PUBLIC_URL to http://localhost:5173
# - Add any API keys needed

# 4. Setup database
bun run db:migrate

# 5. Start development
bun run dev
```

### Adding New Environment Variable

#### 1. Update .env.example
```env
# Add documentation
# New service API key
NEW_SERVICE_API_KEY=your-key-here
```

#### 2. Update env.server.ts
```typescript
export const env = {
  // ... existing vars
  NEW_SERVICE_API_KEY: getEnv("NEW_SERVICE_API_KEY"),
} as const;
```

#### 3. Update .env Locally
```env
NEW_SERVICE_API_KEY=actual-key-value
```

#### 4. Document in README
Update README.md with setup instructions

#### 5. Update Production
Add to hosting platform's environment variables

## Troubleshooting

### Variable Not Loading
```bash
# 1. Check .env exists
ls -la .env

# 2. Verify format (no spaces around =)
# ✅ Correct
DATABASE_URL=postgresql://...

# ❌ Wrong
DATABASE_URL = postgresql://...

# 3. Restart dev server
bun run dev
```

### Client-Side Access Issues
```typescript
// ❌ Wrong - Server-only variable
const secret = import.meta.env.SESSION_SECRET;  // undefined

// ✅ Correct - Use VITE_ prefix for client
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// ✅ Or pass via loader
export function loader() {
  return Response.json({
    apiUrl: env.PUBLIC_URL,  // Safe to pass
  });
}
```

### Missing in Production
1. Check hosting platform environment variables
2. Verify variable names match exactly
3. Restart application after adding
4. Check build logs for missing variable errors

## References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Remix Environment Variables](https://remix.run/docs/en/main/guides/envvars)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
