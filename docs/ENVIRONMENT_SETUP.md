# Environment Setup Guide

Complete guide for setting up environment variables and configuration.

## Initial Setup

### 1. Create `.env` File
```bash
# Copy the example file
cp .env.example .env
```

### 2. Configure Required Variables
Edit `.env` and set the following:

```env
# Application
NODE_ENV=development
PORT=5173
PUBLIC_URL=http://localhost:5173

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/database_name?schema=public

# Security
SESSION_SECRET=generate-a-random-32-character-string
```

### 3. Generate Session Secret
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy output to SESSION_SECRET in .env
```

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `PUBLIC_URL` | Public-facing application URL | `http://localhost:5173` |
| `SESSION_SECRET` | Secret for session encryption | `random-32-char-string` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development`, `production` |
| `PORT` | Server port | `5173` |
| `DIRECT_DATABASE_URL` | Direct DB connection (pooling) | `postgresql://...` |

### Adding API Keys

Add your third-party API keys to `.env`:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# SendGrid
SENDGRID_API_KEY=SG...

# AWS
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# etc.
```

## Environment-Specific Configuration

### Development
```env
NODE_ENV=development
PUBLIC_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:password@localhost:5432/app_dev
```

### Staging
```env
NODE_ENV=production
PUBLIC_URL=https://staging.yourdomain.com
DATABASE_URL=postgresql://user:pass@db.staging.com:5432/app_staging
```

### Production
```env
NODE_ENV=production
PUBLIC_URL=https://yourdomain.com
DATABASE_URL=postgresql://user:pass@db.prod.com:5432/app_prod?sslmode=require
SESSION_SECRET=strong-random-secret-key
```

## Using Environment Variables

### Server-Side (Loaders/Actions)
```typescript
// Type-safe access
import { env } from "~/lib/env.server";

export async function loader() {
  const apiKey = env.OPENAI_API_KEY;
  const publicUrl = env.PUBLIC_URL;
  
  // Use variables...
  return Response.json({ status: "ok" });
}
```

### Adding New Variables

#### 1. Update `.env.example`
```env
# New API Service
NEW_SERVICE_API_KEY=your-key-here
```

#### 2. Update `app/lib/env.server.ts`
```typescript
export const env = {
  // ... existing
  NEW_SERVICE_API_KEY: getEnv("NEW_SERVICE_API_KEY"),
} as const;
```

#### 3. Update Local `.env`
```env
NEW_SERVICE_API_KEY=actual-value
```

## Platform Deployment

### Vercel
```bash
# Via CLI
vercel env add DATABASE_URL
vercel env add SESSION_SECRET

# Or via dashboard: Settings > Environment Variables
```

### Railway
```bash
# Via CLI
railway variables set DATABASE_URL="postgresql://..."
railway variables set SESSION_SECRET="..."

# Or via dashboard: Variables tab
```

### Fly.io
```bash
# Set secrets
fly secrets set DATABASE_URL="postgresql://..."
fly secrets set SESSION_SECRET="..."

# View secrets
fly secrets list
```

### Docker
```yaml
# docker-compose.yml
services:
  app:
    env_file:
      - .env
    environment:
      NODE_ENV: production
```

## Updating PUBLIC_URL

When deploying to a new domain or changing URLs:

### Manual Update
```bash
# 1. Edit .env
nano .env

# 2. Change the value
PUBLIC_URL=https://new-domain.com

# 3. Restart server
bun run dev
```

### Automated Update
```bash
# Using sed (macOS/Linux)
sed -i '' 's|PUBLIC_URL=.*|PUBLIC_URL=https://new-domain.com|g' .env

# Restart server
bun run dev
```

### AI Assistant Prompt
```
Update PUBLIC_URL to https://example.com
```
The AI will automatically update `.env` file.

## Security Checklist

- [ ] `.env` is in `.gitignore` (already configured)
- [ ] `.env.example` has no real secrets
- [ ] `SESSION_SECRET` is random and strong (32+ chars)
- [ ] Different secrets per environment (dev/staging/prod)
- [ ] API keys are server-side only (not exposed to client)
- [ ] Production secrets are rotated regularly
- [ ] Team members don't share `.env` files

## Troubleshooting

### Variable Not Loading
```bash
# Check file exists
ls -la .env

# Check format (no spaces)
# ✅ Correct: KEY=value
# ❌ Wrong: KEY = value

# Restart server
bun run dev
```

### Client-Side Access Error
```typescript
// ❌ Server-only variable on client
const secret = import.meta.env.SESSION_SECRET; // undefined

// ✅ Use VITE_ prefix for client variables
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// ✅ Or pass via loader
export function loader() {
  return Response.json({ publicUrl: env.PUBLIC_URL });
}
```

### Missing in Production
1. Verify platform has all variables set
2. Check variable names match exactly (case-sensitive)
3. Restart application after adding
4. Check deployment logs for errors

## Best Practices

### DO ✅
- Store ALL secrets in `.env`
- Use different keys per environment
- Document new variables in `.env.example`
- Validate required variables on startup
- Use type-safe access via `env.server.ts`

### DON'T ❌
- Commit `.env` to Git
- Hardcode credentials in code
- Share `.env` files
- Use production keys in development
- Expose secrets to client-side

## Resources

- [Environment Management Guide](../.cursor/skills/environment-management.md)
- [API Guidelines](../.cursor/skills/api-guidelines.md)
