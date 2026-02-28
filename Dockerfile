# ============================================================
# Stage 1: Install dependencies
# ============================================================
FROM oven/bun:1-alpine AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ============================================================
# Stage 2: Build the application
# ============================================================
FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV VITE_CJS_IGNORE_WARNING=true

RUN bun run build

# Prune dev dependencies after build
RUN bun install --frozen-lockfile --production && \
    rm -rf /app/.cache

# ============================================================
# Stage 3: Production runtime
# ============================================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5173

# Add non-root user for security
RUN addgroup --system --gid 1001 remix && \
    adduser --system --uid 1001 remix

# Copy only what's needed for production
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

USER remix

EXPOSE 5173

CMD ["sh", "-c", "PORT=${PORT_IN:-$PORT} npm run start"]
