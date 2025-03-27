FROM oven/bun:canary-alpine
WORKDIR /app

# Copy package files separately for better caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .


ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Run the Next.js application
CMD ["bun", "run", "dev"]

