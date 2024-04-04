FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build --legacy-peer-deps

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
COPY .env


EXPOSE 8000
ENV PORT 8000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]
