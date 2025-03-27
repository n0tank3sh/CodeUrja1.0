FROM oven/bun:canary-alpine AS builder
WORKDIR /app

# Copy package files separately for better caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN bun run build

# ---- Production Image ----
FROM oven/bun:canary-alpine AS runner
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./

# Set environment variable for production
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Run the Next.js application
CMD ["bun", "run", "start"]

